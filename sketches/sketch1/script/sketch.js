var particles = [];

//그리드 크기 설정
let gridSize = 6;

// 점과 점의 x,y 좌표를 저장
let points = [];
let xP = [];
let yP = [];

//색상 팔레트 > 입자들의 색상 무작위로 선택
let colorPalette = ['#FF4136', '#0074D9', '#2ECC40', '#FFDC00', '#FF851B'];

function preload() {
  font = loadFont('./assets/NotoSerifKR-Regular.otf');
}

let textColor = 0;
let bgColor = 255;

function setup() {
  createCanvas(800, 800);
  background(bgColor);

  textSize(280);
  textFont(font);
  fill(textColor);
  noStroke();

  textWrap(WORD);
  textLeading(230);
  text('전轉   移이', 120, 280, width - 180);

  loadPixels();

  // 그리드 크기를 기반으로 이미지에서 점을 찾아 배열에 추가
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      //현재 위치의 픽셀 색상 가져오기
      let px = get(x, y);
      let r = px[0];

      // 픽셀의 빨간 색 성분이 127 미만이면 (검은색 또는 어두운 색)
      // 해당 좌표를 포인트 배열에 추가
      if (r < 127) {
        points.push(createVector(x, y));
      }
    }
  }

  // 점 배열을 반복하면서 각 점에서 입자를 생성 및 배열에 추가
  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    particles.push(new Particle(x, y, color(random(colorPalette))));
  }
}

function draw() {
  background(0);

  // 입자 배열 반복하면서 각 입자를 업데이트
  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].trail();
    particles[i].display();
  }

  //무작위로 점과 입자를 선택하고, 선택한 점으로 입자의 위치를 설정
  var pointNum = [int(random(points.length))];
  var particleSelector = [int(random(particles.length))];
  particles[particleSelector].newX = points[pointNum].x;
  particles[particleSelector].newY = points[pointNum].y;
}
