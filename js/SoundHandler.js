function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function SoundHandler(){
  this.sound = new Howl({
    src: ['sound/collision.wav'],
    sprite: {
      collision0: [0, 4000],
      collision1: [4000, 4000],
      //collision2: [8000, 4000],
      //collision3: [8000, 4000],
      collision2: [12000, 2000],
      collision3: [14000, 4000],
      collision4: [18000, 2000],
      collision5: [20000, 4000],
      collision6: [24000, 2000],
      collision7: [26000, 2000]
    }
  });
  this.collisionValues = [0,1,2,3,4,5,6,7];
  shuffleArray(this.collisionValues);
  this.collisionId = Math.round(Math.random()*7);
}

SoundHandler.prototype.playCollision = function(strength){
  strength = strength > 1 ? 1 : strength;

  var id = "collision" + this.collisionValues[this.collisionId] ; //"collision" + Math.round(Math.random()*10);
  this.collisionId = this.collisionId == 7 ? 0 : this.collisionId+1;
  //this.sound.stop();

  var s = this.sound.play(id);
  this.sound.volume(strength, s);
  console.log("play sound",id)
}
