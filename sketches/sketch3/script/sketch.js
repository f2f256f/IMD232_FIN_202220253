var particles = [];

let gridSize = 6;

let points = [];
let xP = [];
let yP = [];

let colorPalette = ['#FF4136', '#0074D9', '#2ECC40', '#FFDC00', '#FF851B'];

function preload() {
  // font = loadFont('./assets/NotoSerifKR-Regular.otf');
  font = loadFont('./assets/Diphylleia-Regular.ttf');
}

let textColor = 255;
let bgColor = 0;

function setup() {
  // setCanvasContainer('canvas', 1, 1, true);
  createCanvas(800, 800);
  background(bgColor);

  textSize(280);
  textFont(font);
  fill(textColor);
  noStroke();

  textWrap(WORD);
  textLeading(230);
  text('반짝  반짝', 120, 260, width - 180);

  loadPixels();

  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      let px = get(x, y);
      let r = px[0];
      if (r < 127) {
        points.push(createVector(x, y));
      }
    }
  }

  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    particles.push(new Particle(x, y, color(random(colorPalette))));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].trail();
    particles[i].display();
  }

  var pointNum = [int(random(points.length))];
  var particleSelector = [int(random(particles.length))];
  particles[particleSelector].newX = points[pointNum].x;
  particles[particleSelector].newY = points[pointNum].y;
}
