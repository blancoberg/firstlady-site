<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenLite.min.js"></script>
    <script src="js/Shaker.js"></script>
    <script src="js/decomp.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.js"></script>
    <script src="js/pathseg.js"></script>

    <meta charset="utf-8">
    <title></title>

    <style media="screen">

    a{
      color:#000000;
    }
    body{
      background-color:#fcb2ae;
      overflow:hidden;
    }
      svg{
        position:absolute;
        left:0px;
        top:0px;


      }

    #logo{
      position:absolute;
      left:50%;
      top:100px;
      width:330px;
      height:280px;


    }

    #content{
      font-weight:bold;
      font-family:verdana;
      position:absolute;
      top:300px;


    }
    </style>
  </head>
  <body>

    <div id="logo">
    <?php

      $letters = array("f","i","r","s","t","l","a","d","y");
      for($i = 0;$i<count($letters);$i++){
        $letter = $letters[$i];
        $svg = file_get_contents("svgs/".$letter.".svg");
        #mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int &$count ] )
        $svg = str_replace("Layer_1",$letter,$svg);
    ?>

      <?=$svg?>
      <!--<img style="background-color:rgba(255,0,0,0.5)" id="<?=$letter?>" src="svgs/<?=$letter?>.svg">-->

    <?php
      }
    ?>

    <div id="content">
      <a href="mailto:hej@first-lady.se">Contact</a>
    </div>
    </div>
    <!--<img style="opacity:0.2" src="svgs/logo.svg">-->
    <script>

      var engine;

      var letters = [];
      var world;
      var renderer;
      var floor;
      var roof;
      var positions = [];
      var position = 2;
      var text;
      var chars = ["f","i","r","s","t","l","a","d","y"];
      var constraints = [];
      var shaker;


      function rotateVector(vec,angle){
        var x = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
        var y = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
        vec.x = x;
        vec.y = y;
        return vec;
      }


      function positionSvgs(){
        var bodies = Matter.Composite.allBodies(world);
        for(var i = 0;i<bodies.length;i++){
          var body = bodies[i];
          var svg = document.getElementById(body.label);
          if(svg){
            //console.log("position",body.label)
            var bb = svg.getBBox();

            var pos = body.data.topLeft;//Matter.Vector.sub(body.bounds.min, body.position);
            var pos = {x:pos.x,y:pos.y}; // duplicate //
            rotateVector(pos,body.angle);
            //console.log(pos);
            var x = body.position.x + pos.x;
            var y = body.position.y + pos.y;
            svg.style.transformOrigin = "0% 0%"
            svg.style.transform = "translate("+x+"px," + y + "px) rotateZ(" + (body.angle * 180/Math.PI) +"deg)"
          }

        }
        //console.log(bodies);
      }

      function onResize(){
        console.log("resize")
        Matter.Body.setPosition(floor,{x:-100,y:window.innerHeight+10 - 100})

        var logo = document.getElementById("logo");
        logo.style.left = window.innerWidth*0.5 - logo.offsetWidth*0.5 + "px"




        //Matter.body.setPosition(text,{x:logo.offsetWidth*0.5 - t.offsetWidth*0.5,y:t.offsetTop})
        if(renderer){
          renderer.canvas.style.left=window.innerWidth*0.5 - logo.offsetWidth*0.5 + "px"
          renderer.canvas.style.top="100px"
        }

        //floor.position.y = 100;//window.innerHeight;
      }

      function render(){

        window.requestAnimationFrame(render);

        // collision //


        for(var i = 3;i<letters.length;i++){

          var collision = Matter.SAT.collides(letters[i], floor);

          if (collision.collided && letters[i].collidedWith != floor) {
              // do something
              letters[i].collidedWith = floor;
              shaker.shake(2 * Math.min(3,letters[i].velocity.y),6,1);
              console.log("collision!",collision,letters[i].velocity.y)
          }

        }


        Matter.Engine.update(engine);

        positionSvgs();

        //console.log("render")
      }
      (function(){
        window.addEventListener("load",function(){
          engine = Matter.Engine.create();
          world = engine.world;
          

          roof = Matter.Bodies.rectangle(0,-200,1400,20,{
            isStatic:true,
            isNonColliding :true

          });
          roof.isNonColliding = true;
          Matter.World.add(world,roof);

          floor = Matter.Bodies.rectangle(0,400,1400,20,{
            isStatic:true
          });
          Matter.World.add(world,floor);

          var logo = document.getElementById("logo");
          var textContent = document.getElementById("content");
          textContent.style.left = logo.offsetWidth*0.5 - textContent.offsetWidth*0.5 + "px";
          text = Matter.Bodies.rectangle(textContent.offsetLeft+textContent.offsetWidth*0.5,textContent.offsetTop+textContent.offsetHeight*0.5,textContent.offsetWidth,textContent.offsetHeight,{
            isStatic:true
          });


          Matter.World.add(world,text);

          // create all letter bodies //



          var bodyPositions = [{x:26,y:51},{x:90,y:65},{x:153,y:38},{x:217,y:68},{x:277,y:30},{x:28,y:179},{x:106,y:170},{x:190,y:196},{x:269,y:163}]
          for(var i = 0;i<chars.length;i++){
            var dom = document.getElementById(chars[i]).children[0];

            var vertices = Matter.Svg.pathToVertices(dom,20);

            var letter = Matter.Bodies.fromVertices(i*70,100,vertices,{
              isStatic:false,
              frictionAir : 0.03
            });
            letter.label = chars[i];
            Matter.Body.setPosition(letter,bodyPositions[i]);
            letter.data = {
              topLeft : Matter.Vector.sub(letter.bounds.min, letter.position)
            }

            Matter.Events.on(letter,"collide",function(){
              console.log("collide")
            })
            letters.push(letter);

            Matter.World.add(world, letter)


            var constraint = Matter.Constraint.create({
              bodyA : letters[i],
              bodyB : roof,
              pointA : {x:0,y:-1},
              pointB : {x:letters[i].position.x ,y:0},
              stiffness:0.03+Math.random()*0.03
            });
            constraints.push(constraint);

            Matter.Body.setPosition(letter,{x:letter.position.x+20,y:letter.position.y-100})
            Matter.Body.setVelocity(letter,{x:0,y:0})
            Matter.World.add(world,constraint);


          }




          // create ropes attached to each letter

          window.addEventListener("click",function(){
            for(var i = 0;i<constraints.length;i++){
              Matter.World.remove(world,constraints[i])
            }
            var bodies = Matter.Composite.allBodies(world);
            for(i = 3;i<bodies.length;i++){
              bodies[i].frictionAir = 0;
            }

            //shaker.shake(5,3,0.5);
          })


          window.addEventListener("resize",onResize)

          shaker = new Shaker();



          /*
          renderer = Matter.Render.create({
          element: document.body,
          engine: engine,
          options: {
            width: 800,
            height: 600,
            background:"transparent",
            showAngleIndicator: true
        }
          });

          renderer.options.wireframeBackground = 'transparent';
          console.log("render",renderer.canvas)
          renderer.canvas.style.position="absolute";
          renderer.canvas.style.left="0px";
          renderer.canvas.style.top="0px";
          renderer.options.background = 'transparent';
          */



      // add click evnets to record positions //
      /*
      window.addEventListener("mousedown",function(e){

        window.isDragging = true;
        var bodies = Matter.Composite.allBodies(world);
        var body = bodies[position];
        body.position.x = e.clientX;
        body.position.y = e.clientY;


      })

      window.addEventListener("mousemove",function(e){

        if(window.isDragging){
          var bodies = Matter.Composite.allBodies(world);
          var body = bodies[position];
          body.position.x = e.clientX;
          body.position.y = e.clientY;
        }


      })

      window.addEventListener("mouseup",function(e){


          var bodies = Matter.Composite.allBodies(world);
          window.isDragging=false;

          var bodyPositions = "["
          for(var i = 2;i<bodies.length;i++){
            bodyPositions+="{x:"+bodies[i].position.x + ",y:" + bodies[i].position.y+"},";
          }
          bodyPositions = bodyPositions.substr(0,bodyPositions.length-1);
          bodyPositions+="]";
          console.log(bodyPositions);
          position++;


      })
      */





        onResize();


          //renderer.run();
          //Matter.Render.run(renderer);
          render();
        })
      })()
    </script>
  </body>
</html>
