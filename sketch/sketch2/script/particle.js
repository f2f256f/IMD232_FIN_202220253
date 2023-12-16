class Particle {
  constructor(x, y, cols) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
    this.size = gridSize - 1;
    this.newX = x;
    this.newY = y;
    this.col = cols;
    this.xHistory = [];
    this.yHistory = [];
    this.fade = 180;
    let frameNumber = [60, 120, 180, 240, 300, 360, 420, 560];
    this.framer = frameNumber[int(random(frameNumber.length))];

    this.num = int(random(points.length));
  }

  display() {
    noStroke();
    fill(0, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x = lerp(this.x, this.newX, 0.05);
    this.y = lerp(this.y, this.newY, 0.05);
  }

  trail() {
    this.xHistory.push(this.x);
    this.yHistory.push(this.y);

    if (this.xHistory.length > 6) {
      this.xHistory.splice(0, 1);
      this.yHistory.splice(0, 1);
    }
    for (var i = 0; i < this.xHistory.length; i++) {
      var posX = this.xHistory[i];
      var posY = this.yHistory[i];

      fill(20, this.fade);
      rect(posX, posY, this.size, this.size);
    }
  }
}
