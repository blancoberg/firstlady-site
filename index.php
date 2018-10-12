<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.15/howler.core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenLite.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/easing/EasePack.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/CSSPlugin.min.js"></script>




    <script src="js/Ropes.js"></script>
    <script src="js/Mouse.js"></script>
    <script src="js/Shaker.js"></script>
    <script src="js/SoundHandler.js"></script>
    <script src="js/decomp.min.js"></script>
    <script src="js/index.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.js"></script>
    <script src="js/pathseg.js"></script>

    <meta charset="utf-8">

    <!-- FAVICONS -->
    <link rel="icon" type="image/png" href="/images/favicon32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/images/favicon64.png" sizes="64x64">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">


    <!-- Place this data between the <head> tags of your website -->
    <title>First Lady Agency</title>
    <meta name="description" content="First lady is a Creative & Innovation Agency based in Stockholm" />

    <!-- Twitter Card data -->
    <meta name="twitter:card" value="First lady is a Creative & Innovation Agency based in Stockholm">

    <!-- Open Graph data -->
    <meta property="og:title" content="First Lady Agency" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="http://www.first-lady.se/" />
    <meta property="og:image" content="http://www.first-lady.se/images/facebook.png" /> <!-- 1200 x 630  -->
    <meta property="og:description" content="First lady is a Creative & Innovation Agency based in Stockholm" />


  </head>
  <body>


    <!--<img style="position:absolute;left:0px;top:0px;opacity:1" src="images/screen.png">-->
    <div id="content">

      <div id="copy-all">

        <div id="copy-at">
          <a href="mailto:hej@first-lady.se">Get in touch</a>
        </div>

        <div id="copy-where">
          First Lady Agency<br/>
          Telegrafgränd 1B<br/>
          111 30 Stockholm<br/>
          Sweden
        </div>

        <div id="copy-what">
          First lady is a Creative<br/>
          & Innovation Agency<br/>
          Based in Stockholm
        </div>

      </div>

    </div>

    <div id="logo" style="opacity:0">
    <?php

      $letters = array("f","i","r","s","t","l","a","d","y");
      for($i = 0;$i<count($letters);$i++){
        $letter = $letters[$i];
        $svg = file_get_contents("svgs/".$letter.".svg");
        #mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int &$count ] )
        $svg = str_replace("Layer_1",$letter,$svg);
    ?>


      <?=$svg?>


    <?php
      }
    ?>


    </div>

    <div id="cover" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:white"></div>





  </body>
</html>
