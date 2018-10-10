Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}
//console.log("mouse")
function Mouse(){
  //console.log("new mouse");
  this.dom = document.getElementById("logo");
  //console.log("mouse")
  window.addEventListener("mousemove",this.onMouseMove.bind(this))
  this.x = 0;
  this.y = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  this.speed = {x:0,y:0};

  this.point = Matter.Bodies.circle(0,0,10,{
    isSensor:true,
    isStatic:true
  });
  Matter.World.add(world,this.point);

  for(var i = 0;i<letters.length;i++){
    //var letter = letters[i];

    /*
    var constraint = Matter.Constraint.create({
      bodyA : letters[i],
      bodyB : this.point,
      pointA : {x:0,y:0},
      pointB : {x:0 ,y:0},
      length:400,
      stiffness:0.05+Math.random()*0.03,
      damping:0.2
    });
    constraints.push(constraint);
    Matter.World.add(world,constraint);
    */
  }
  // add constraints to each letter //



}

Mouse.prototype.onMouseMove = function(e){

  var x = e.clientX - this.dom.offsetLeft;
  var y = e.clientY - this.dom.offsetTop;
  this.deltaX = x - this.x;
  this.deltaY = y - this.y;
  this.x = x;
  this.y = y;

  Matter.Body.setPosition(this.point,this);
  //console.log("delta",this.deltaX)

}
