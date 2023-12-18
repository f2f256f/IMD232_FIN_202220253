class Particle {
  constructor(x, y, cols) {
    //초기 위치 설정
    this.x = x;
    this.y = y;

    //입자의 초기 속도(랜덤)
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);

    //입자의 그리드 사이즈 조절
    this.size = gridSize - 2;

    //새로운 위치
    this.newX = x;
    this.newY = y;

    //입자 색상
    this.col = cols;

    //입자의 과거 위치 기록 > 이어지는 꼬리 만들기 위해(입자의 이동경로 시각적으로 보이게)
    //입자가 이동할 때마다 현재 위치를 배열에 추가하고,
    //배열의 길이가 특정 값 이상이 되면 가장 오래된 위치를 제거하여 입자의 꼬리를 형성
    this.xHistory = [];
    this.yHistory = [];

    //입자 투명도
    this.fade = 255;

    // 특정 프레임에 도달할 때마다 새로운 위치로 이동하는 트리거 역할
    let frameNumber = [60, 120, 180, 240, 300, 360, 420, 560];
    this.framer = frameNumber[int(random(frameNumber.length))];

    //입자가 이동할 때 사용될 무작위로 선택된 인덱스(points 배열에서 무작위 선택)
    this.num = int(random(points.length));
  }

  display() {
    noStroke();
    fill(255, 255); //입자 색상 흰색
    rect(this.x, this.y, this.size, this.size);
  }

  //입자 위치 부드럽게 이동
  move() {
    this.x = lerp(this.x, this.newX, 0.05);
    this.y = lerp(this.y, this.newY, 0.05);
  }

  //과거 위치를 기반으로 입자의 꼬리 생성
  trail() {
    this.xHistory.push(this.x);
    this.yHistory.push(this.y);

    //꼬리 길이 제한
    if (this.xHistory.length > 8) {
      this.xHistory.splice(0, 1); // 배열의 첫 번째 요소(인덱스 0)를 제거
      this.yHistory.splice(0, 1); // > 새로운 위치 추가할 때 가장 오래된 위치를 제거
    }

    //꼬리 그리기
    for (var i = 0; i < this.xHistory.length; i++) {
      //배열에 저장된 입자의 이동경로 개수만큼 반복해서 그리기
      var posX = this.xHistory[i];
      var posY = this.yHistory[i];

      fill(255, this.fade); //투명도 페이드 아웃
      rect(posX, posY, this.size, this.size);
    }
  }
}
