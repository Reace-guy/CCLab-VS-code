

let fortuneIndex = 0;
let fortunes = [
  "Trust the timing of your life",
  "What good are wings without the courage to fly",
  "The road to riches is paved with homework",
  "You never know what worse luck your bad luck has saved you from",
  "The only thing that overcomes hard luck is hard work",
  "Grow through what you go through",
  "Turn your wounds into wisdom.",
];

let wingsColor = "LightCoral";
let centralColor = "DeepPink";
let faceColor = "RosyBrown";

let NUM_OF_PARTICLES = 300;
let particles = [];
let seq = 0;

var r = 0;
var g = 0;
var b = 0;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasContainer");
}

function draw() {
  background(0, 200, 255);

  // draw scenes
  if (seq == 0) {
    drawIntro();
  } else if (seq == 1) {
    drawScene1();
  } else if (seq == 2) {
    drawEnding();
  }
}

function mousePressed() {
  //console.log(mouseX, mouseY);

  fortuneIndex = floor(random(fortunes.length));
  //console.log(fortuneIndex);

  proceedSequence();
}

function proceedSequence() {
  seq++;
  if (seq == 5) {
    // if sequence reached the last phase,
    // we reset the sequence.
    seq = 0;
  }
}

function drawIntro() {
  background(252, 238, 180);
  ellipse(300, 300, 350);
  noStroke();
  textFont("monospace", 12);
  text("Click the Mouse to continue your journey" + seq, 150, 280);
  text("Click the Space bar for your lucky dragonflies" + seq, 140, 300);
}

function drawScene1() {
  background(0, 200, 255);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    //p.move();
    p.display();
  }
  // limit
  while (particles.length > NUM_OF_PARTICLES) {
    particles.splice(0, 1);
  }
  angleMode(DEGREES);

  //background (clouds)
  push();
  noStroke();
  ellipse(210, 45, 85, 30);
  ellipse(200, 40, 80, 50);
  pop();

  //drawDragonfly(width / 2, height / 2);
}

function keyPressed() {
  if (key == " ") {
    particles.push(new DragonFly(random(width), random(height)));
  }
}

//

class DragonFly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-0.1, 0.1);
    this.ySpd = random(-0.1, 0.1);
    this.scl = random(-0.1, 0.5);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x, this.y);
    //rotate(frameCount);
    scale(this.scl);

    drawDragonfly(-300, -300);

    //fill(0, 255, 0);
    //circle(0, 0, 10);
    pop();
  }
}

function drawDragonfly(x, y) {
  push();
  translate(x, y);
  drawLeftwings(300, 230);
  drawRightwings(300, 230);
  drawCentral();
  drawFace();
  pop();
}

function drawLeftwings(x, y, speed) {
  //body (wings)
  let angle = map(sin(frameCount * 200), -1, 1, -20, 20);
  push();
  translate(x, y);
  rotate(angle);

  fill(wingsColor);
  triangle(0, 0, -242, -210, -214, -155);
  triangle(0, 30, -242, -170, -214, -140);
  fill(255, 0, 0);
  circle(0, 0, 30);
  pop();
}
function drawRightwings(x, y, speed) {
  let angle = map(sin(frameCount * 200), -1, 1, -20, 20);

  push();
  translate(x, y);
  rotate(angle);

  fill(wingsColor);
  triangle(0, 0, 548 - 300, 20 - 230, 520 - 300, 75 - 230);
  triangle(0, 30, 548 - 300, 60 - 230, 520 - 300, 90 - 230);

  fill(255, 0, 0);
  circle(0, 0, 30);
  pop();
}

function drawCentral() {
  //body (central)
  push();
  fill(centralColor);
  ellipse(300, 350, 30, 50);
  ellipse(300, 320, 45, 60);
  ellipse(300, 280, 65, 80);
  ellipse(300, 230, 75, 100);

  pop();
}

function drawFace() {
  //body(face)
  push();
  fill(faceColor);
  ellipse(275, 225, 25, 25, 15, 15);
  ellipse(325, 225, 25, 25, 15, 15);
  pop();
}

function drawEnding() {
  r = map(mouseX, 0, 600, 0, 255);
  g = map(mouseX, 0, 600, 255, 0);
  b = map(mouseY, 0, 600, 255, 0);

  background(r, g, b);
  fill(0);

  drawDragonfly(mouseX, mouseY, 0, 0);

  push();
  noStroke();
  fill(255, 255, 255);
  ellipse(300, 300, 405, 220);
  ellipse(280, 300, 400, 200);
  pop();

  push();
  translate(width / 2, height / 2);
  textAlign(CENTER);
  fill(0, 0, 0);
  text(fortunes[fortuneIndex], 0, 0);
  pop();
}