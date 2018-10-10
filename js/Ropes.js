function Ropes(){

  this.canvas = document.createElement("canvas");
  var style = this.canvas.style;
  style.position="absolute";
  style.left = "0px";
  style.top = "0px";
//  style.backgroundColor="rgba(255,0,0,0.1)";


  this.context = this.canvas.getContext("2d");

  document.body.appendChild(this.canvas);
  document.body.appendChild(document.getElementById("logo"))
  //window.addEventListener("resize",this.onResize.bind(this));
  this.onResize();
  //console.log(constraints[0])
}

Ropes.prototype.render = function(){
  //console.log("rope.render",constraints);
  //console.log(constraints[0]);
  //console.log("ropes cut",ropesCut)

  this.canvas.width = this.canvas.width;
  if(ropesCut == false){

    var diff = {
      x:window.innerWidth*0.5 - 350*0.5,
      y:100
    }
    for(var i = 0;i<constraints.length;i++){
      var constraint = constraints[i];
      //console.log(constraint);
      this.context.beginPath();
      this.context.strokeStyle="rgba(0,0,0,0.2)"
      this.context.moveTo(constraint.bodyA.position.x +diff.x+ constraint.pointA.x,constraint.bodyA.position.y + diff.y+constraint.pointA.y)
      this.context.lineTo(constraint.bodyB.position.x +diff.x+ constraint.pointB.x,constraint.bodyB.position.y + diff.y+constraint.pointB.y)
      this.context.stroke();
    }
  }



}

Ropes.prototype.onResize = function(e){
  this.canvas.width = window.innerWidth;
  this.canvas.height = 350;
  this.canvas.style.left = window.innerWidth*0.5 - this.canvas.width*0.5 + "px";
}
