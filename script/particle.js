class Particle {
  constructor(x, y, cols) {
    //초기 위치
    this.x = x;
    this.y = y;

    //랜덤한 속도
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);

    //입자의 크기
    this.size = gridSize - 2;

    //새로운 위치 초기화
    this.newX = x;
    this.newY = y;

    //입자의 색상
    this.col = cols;

    //입자의 과거 위치 기록 > 이어지는 꼬리 만들기 위해(입자의 이동 경로 시각적으로 보이게)
    //입자가 이동할 때마다 현재 위치를 배열에 추가하고,
    //배열의 길이가 특정 값 이상이 되면 가장 오래된 위치를 제거하여 입자의 꼬리를 형성
    this.xHistory = [];
    this.yHistory = [];

    //페이드 효과 초기화
    this.fade = 255;

    // 특정 프레임에 트리거할 때마다 새로운 위치로 이동
    let frameNumber = [60, 120, 180, 240, 300, 360, 420, 560];
    this.framer = frameNumber[int(random(frameNumber.length))];

    // 무작위로 선택된 포인트 인덱스
    this.num = int(random(points.length));
  }

  display() {
    noStroke();
    fill(255, 255); //픽셀 색상 흰색으로 설정
    rect(this.x, this.y, this.size, this.size);
  }

  //입자 위치 부드럽게 이동
  move() {
    this.x = lerp(this.x, this.newX, 0.04);
    this.y = lerp(this.y, this.newY, 0.04);
  }

  // 과거 위치를 기반으로 입자의 꼬리 그리기
  trail() {
    this.xHistory.push(this.x);
    this.yHistory.push(this.y);

    //꼬리 길이 제한
    if (this.xHistory.length > 8) {
      this.xHistory.splice(0, 1);
      this.yHistory.splice(0, 1);
    }
    //꼬리 그리기
    for (var i = 0; i < this.xHistory.length; i++) {
      var posX = this.xHistory[i];
      var posY = this.yHistory[i];

      //페이드 효과를 준 흰색 잔상
      fill(255, this.fade);
      rect(posX, posY, this.size, this.size);
    }
  }
}
