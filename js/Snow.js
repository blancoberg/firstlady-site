function Snow(el){
  this.el = document.getElementById(el);
  this.el.style.position="absolute";
  this.el.style.left="0px";
  this.el.style.top="0px";
  this.flakes = [];
  this.amount = 20;
  this.create();
  this.render();
}

Snow.prototype.create = function(){

  for(var i = 0;i<this.amount;i++){

    var flake = {
      x:window.innerWidth*Math.random(),
      y:window.innerHeight*Math.random(),
      scale:0.2+ 0.8 * Math.random(),
      width : 30,
      swing : 0.5 + 0.5 * Math.random(),
      counter : Math.random()*Math.PI*2
    }

    var domBall = document.createElement("div");
    domBall.style.position="absolute";
    domBall.style.left="0px";
    domBall.style.top = "0px";

    domBall.style.width=flake.scale * flake.width + "px";
    domBall.style.height=flake.scale * flake.width + "px";
    domBall.style.background="white"
    domBall.style.borderRadius=flake.scale * flake.width + "px" ;
    domBall.style.opacity=0.5 * flake.scale;
    flake.el = domBall;
    this.el.appendChild(domBall);

    this.flakes.push(flake);
    //console.log("create snowball")

  }


}

Snow.prototype.render = function(){

  requestAnimationFrame(this.render.bind(this))
  for(var i = 0;i<this.flakes.length;i++){
    var flake = this.flakes[i];
    flake.y+= (3 * flake.scale);
    if(flake.y > window.innerHeight){
      flake.y = - 50 * flake.scale;
      flake.x = Math.random() * window.innerWidth;
    }

    flake.counter+=flake.swing*0.03;
    var swing = Math.sin(flake.counter) * 50 * flake.scale;
    flake.el.style.transform = "translate(" + (flake.x + swing) + "px," + flake.y +"px)";
  }
}
