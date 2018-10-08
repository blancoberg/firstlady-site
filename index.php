<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

    <script src="js/decomp.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.js"></script>
    <script src="js/pathseg.js"></script>

    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
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
    <script>

      var engine;
      var letter;
      var world;
      var renderer;

      // use this to get cordinates for each letter
      var ltr = document.getElementById("f");
      var cords = [];
      document.body.addEventListener("mousedown",function(e){
        var x = ((e.clientX - ltr.offsetLeft)/ltr.offsetWidth) * 2 - 1;
        var y = ((e.clientY - ltr.offsetTop)/ltr.offsetHeight) * 2 - 1;
        cords.push({x:x,y:y});

        // print cords

        var str = "[";
        for(var i = 0;i<cords.length;i++){
          str+="{x:" + cords[i].x*100 + ",y:"+cords[i].y*100+"},"
        };
        str = str.substr(0,str.length-1) + "]";
        console.log(str);
      })

      function render(){

        window.requestAnimationFrame(render);
        Matter.Engine.update(engine);
        Matter.Render.run(renderer);
        //console.log("render")
      }
      (function(){
        window.addEventListener("load",function(){
          engine = Matter.Engine.create();
          var cords = [{x:-76.27118644067797,y:97.59036144578313},{x:-100,y:-85.54216867469879},{x:96.61016949152543,y:83.13253012048192},{x:-25.423728813559322,y:97.59036144578313},{x:-32.20338983050848,y:22.891566265060238},{x:42.3728813559322,y:13.25301204819278},{x:42.3728813559322,y:-18.07228915662651},{x:-38.983050847457626,y:-10.843373493975905},{x:-42.3728813559322,y:-46.98795180722891},{x:100,y:-59.036144578313255}]

          var s = document.getElementById("f").children[0];
          console.log(s)
          var po = Matter.Svg.pathToVertices(s,500)


          world = engine.world;
          console.log(world.gravity)
          //world.gravity.scale = 1;
          // Matter.Bodies.polygon(x, y, sides, radius, [options]) → Body
          letter = Matter.Bodies.fromVertices(100,100,po,{
            isStatic:true
          })
          /*letter = Matter.Bodies.rectangle(770, 490, 220, 380, {
            isStatic: false,
            chamfer: { radius: 20 }
        })*/
          Matter.World.add(world, letter)

          renderer = Matter.Render.create({
          element: document.body,
          engine: engine,
          options: {
            width: 800,
            height: 600,
            showAngleIndicator: true
        }
    });
          //renderer.run();

          render();
        })
      })()
    </script>
  </body>
</html>
