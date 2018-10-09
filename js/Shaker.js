function Shaker(){

  this.shakes = [];

  this.body = document.getElementById("logo");
  this.update();
}

Shaker.prototype.update = function(){

  window.requestAnimationFrame(this.update.bind(this));
  var x = 0;
  var y = 0;

  for(var i = 0;i<this.shakes.length;i++){

    var shake = this.shakes[i];
    x+= Math.sin(Math.PI*shake.speed * shake.time) * (shake.amplitude)* (1-shake.time);
    y+= Math.sin(1+Math.PI*shake.speed * shake.time) * (shake.amplitude)* (1-shake.time);
  }
  this.body.style.transform = "translate(" + x+"px,"+ y + "px)";
//  console.log(x,y);
}

Shaker.prototype.shake = function(amplitude,speed,time){
  //console.log("shake",amplitude,speed,time)
  var shake = {
    amplitude : amplitude,
    speed : speed,
    time: 0
  }
  this.shakes.push(shake);
  TweenLite.to(shake,time,{time:1})
}
