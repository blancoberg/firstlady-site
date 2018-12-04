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
var sound;
var mouse;
var mouseBall;
var ropes;
var ropesCut = false;
var texts = [];
var bodyPositions = [{x:26,y:51},{x:90,y:65},{x:153,y:38},{x:217,y:68},{x:277,y:30},{x:28,y:179},{x:106,y:170},{x:190,y:196},{x:269,y:163}]

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

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

function getBodyByDom(dom){
  for(var i = 0;i<letters.length;i++){
    if(letters[i].data.dom == dom){
      return letters[i];
    }
  }
}

function onMouseOver(e){

  var time = new Date().getTime();

  var body = getBodyByDom(e.currentTarget);

  if(time - body.data.lastTime > 500){
    var max = 10;
    var min = -max;
    //Matter.Body.applyForce(body, {x:-body.data.topLeft.x,y:-body.data.topLeft.y}, {x:0.05,y:0})
    Matter.Body.setVelocity(body,{x:mouse.deltaX.clamp(min,max),y:mouse.deltaY.clamp(min,max)})
    body.data.lastTime = time;
  }

}

function onResize(){
  //console.log("resize")
  var textContent = document.getElementById("content");
  Matter.Body.setPosition(floor,{x:-100,y:window.innerHeight+10})

  var logo = document.getElementById("logo");
  logo.style.left = window.innerWidth*0.5 - logo.offsetWidth*0.5 + "px"




  //Matter.body.setPosition(text,{x:logo.offsetWidth*0.5 - t.offsetWidth*0.5,y:t.offsetTop})
  if(renderer){
    renderer.canvas.style.left=window.innerWidth*0.5 - logo.offsetWidth*0.5 + "px"
    //renderer.canvas.style.top="100px"
  }

  for(var i = 0;i<texts.length;i++){
    var textData = texts[i].data;
    var textElem = textData.dom;
    var bb = offset(textElem);
    Matter.Body.setPosition(textData.body,{x:bb.left - logo.offsetLeft + textElem.offsetWidth*0.5,y:bb.top + textElem.offsetHeight*0.5})
  }

  if(ropes)
    ropes.onResize();
  //floor.position.y = 100;//window.innerHeight;
}

function render(){

  window.requestAnimationFrame(render);

  // collision //
  //Matter.Body.setPosition(mouseBall,mouse);
  //mouseBall.position.x = mouse.x;
  //mouseBall.position.y = mouse.y;

  for(var i = 0;i<letters.length;i++){

    var collisionElems = [floor].concat(texts);
    if(ropesCut==false)
    {
      //collisionElems = collisionElems.concat(texts);
    }
    //var volumes = [1,0.4]


    for(var a = 0;a<collisionElems.length;a++){

      if(letters[i] != collisionElems[a]){

        var collision = Matter.SAT.collides(letters[i], collisionElems[a]);

        if (collision.collided && letters[i].data.collidedWith != collisionElems[a]) {


            letters[i].data.collidedWith = collisionElems[a];//.push(collisionElems[a]);
            //shaker.shake(1 * Math.min(1,letters[i].velocity.y),6,1);
            //sound.playCollision(a == 0 ? 1 : 0.2);

        }


        if(collision.collided== false && letters[i].data.collidedWith == collisionElems[a]){
            //console.log("no more collision outside")

        }


      }


    }


  }


  Matter.Engine.update(engine);

  if(ropes)
    ropes.render();
  positionSvgs();

  //console.log("render")
}
(function(){
  window.addEventListener("load",function(){
    engine = Matter.Engine.create();
    world = engine.world;


    roof = Matter.Bodies.rectangle(0,-200,1400,20,{
      isStatic:true,
      isNonColliding :true,
      isSensor:true

    });
    roof.isNonColliding = true;
    Matter.World.add(world,roof);

    floor = Matter.Bodies.rectangle(0,400,1400,20,{
      isStatic:true,
      isSensor:false
    });
    Matter.World.add(world,floor);





    var logo = document.getElementById("logo");
    var textContent = document.getElementById("content");

    var textElems = textContent.children[0].children;

    for(var i = 0;i<textElems.length;i++){
      var textElem = textElems[i];
      var bb = textElem.getBoundingClientRect();
      var textBody = Matter.Bodies.rectangle(bb.left,bb.top,textElem.offsetWidth,textElem.offsetHeight,{
        isStatic:true
      });
      Matter.World.add(world,textBody);
      textBody.data = {dom:textElem,body:textBody}
      texts.push(textBody);
    }
    //textContent.style.left = logo.offsetWidth*0.5 - textContent.offsetWidth*0.5 + "px";

    /*
    text = Matter.Bodies.rectangle(textContent.offsetLeft+textContent.offsetWidth*0.5,textContent.offsetTop+textContent.offsetHeight*0.5,textContent.offsetWidth,textContent.offsetHeight,{
      isStatic:true
    });


    Matter.World.add(world,text);
*/
    // create all letter bodies //



    for(var i = 0;i<chars.length;i++){

      var dom = document.getElementById(chars[i]).children[0];

      var vertices = Matter.Svg.pathToVertices(dom,20);

      var letter = Matter.Bodies.fromVertices(i*70,100,vertices,{
        isStatic:false,
        frictionAir : 0.03
      });

      letter.label = chars[i];
      bodyPositions[i].y+=50;
      Matter.Body.setPosition(letter,bodyPositions[i]);
      letter.data = {
        topLeft : Matter.Vector.sub(letter.bounds.min, letter.position),
        dom : document.getElementById(chars[i]),
        lastTime : new Date().getTime(),
        collidedWith:[]
      }

      letter.data.dom.addEventListener("mouseover",onMouseOver);


      letters.push(letter);

      Matter.World.add(world, letter)


      var constraint = Matter.Constraint.create({
        bodyA : letters[i],
        bodyB : roof,
        pointA : {x:0,y:-2},
        pointB : {x:letters[i].position.x ,y:0},
        stiffness:0.05+Math.random()*0.03,
        damping:0.2
      });
      constraints.push(constraint);

      Matter.Body.setPosition(letter,{x:letter.position.x+20,y:letter.position.y-150})
      Matter.Body.setVelocity(letter,{x:0,y:0})
      Matter.World.add(world,constraint);


    }







    // create ropes attached to each letter

    window.addEventListener("click",function(){

      if(!ropesCut){
        for(var i = 0;i<constraints.length;i++){
          Matter.World.remove(world,constraints[i])
        }
        //var bodies = Matter.Composite.allBodies(world);
        for(i = 0;i<letters.length;i++){
          letters[i].frictionAir = 0;
        }
        ropesCut = true;
      }else{

        for(var i = 0;i<texts.length;i++){
          texts[i].isSensor=false;
        }

        for(var i = 0;i<constraints.length;i++){
          Matter.World.add(world,constraints[i])
        }
        for(var i = 0;i<letters.length;i++){
          //letters[i].isStatic=false;
          letters[i].frictionAir = 0.03;
          Matter.Body.setAngle(letters[i],0);
          Matter.Body.setAngularVelocity(letters[i],0);

          Matter.Body.setPosition(letters[i],{x:bodyPositions[i].x+20,y:bodyPositions[i].y-150});

          /*
          var complete = i != letters.length -1 ? null : function(){

            for(var i = 0;i<constraints.length;i++){
              Matter.World.add(world,constraints[i])
            }

            for(var i = 0;i<texts.length;i++){
              texts[i].isSensor=false;
            }

            for(i = 0;i<letters.length;i++){
              letters[i].frictionAir = 0.02;
              letters[i].isStatic=false;
              Matter.Body.setVelocity(letters[i],{x:0,y:0})
              Matter.Body.setAngularVelocity(letters[i],0)

            }

          }*/

          //TweenLite.to(letters[i].position,1,{x:bodyPositions[i].x,y:bodyPositions[i].y});
          //TweenLite.to(letters[i],1,{angle:0,onComplete:complete})
        }

        ropesCut = false;
      }


      //shaker.shake(5,3,0.5);
    })


    window.addEventListener("resize",onResize)

    shaker = new Shaker();
    sound = new SoundHandler();
    mouse = new Mouse();
    //new Snow("snow")
    //ropes = new Ropes();
    //console.log("after mouse",Mouse)
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
    //renderer.canvas.style.backgroundColor="#ff0000"
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


    if(renderer)
      Matter.Render.run(renderer);
    //render();
    TweenLite.to(document.getElementById("cover"),0.3,{opacity:0,onComplete:function(){
      document.getElementById("cover").style.display="none";
      render();
      document.getElementById("logo").style.opacity=1;
    }})
    onResize();

  })
})()
