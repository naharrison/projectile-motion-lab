// units of time are frames
// units of distance are px

var isRunning = false;
var runningFrameCount = 0;
var margin = 150;

var ag = -0.3; // gravitational acceleration
var theta = 80.0;
var vi = 15.5;
var decrementTheta, incrementTheta;
var decrementVi, incrementVi;

var ax = -0.06;
var vix = 8.0;
var decrementAx, incrementAx;
var decrementVix, incrementVix;

var ay = -0.12;
var viy = 9.0;
var decrementAy, incrementAy;
var decrementViy, incrementViy;

var randx = 700 + 10*Math.floor(Math.random()*41);
var randy = 370 - 10*Math.floor(Math.random()*31);


function setup() {
  if(windowWidth < 1220 || windowHeight < 600) alert("Please enlarge your window to view the entire canvas.");
  var myCanvas = createCanvas(1220, 600);
  myCanvas.parent("labDiv");

  decrementTheta = new CircleButton(2*margin-65, height-0.5*margin, 10, "-");
  incrementTheta = new CircleButton(2*margin+65, height-0.5*margin, 10, "+");
  decrementVi = new CircleButton(2*margin-65, height-0.25*margin, 10, "-");
  incrementVi = new CircleButton(2*margin+65, height-0.25*margin, 10, "+");

  decrementAx = new CircleButton(0.75*width-65, height-0.5*margin, 10, "-");
  incrementAx = new CircleButton(0.75*width+65, height-0.5*margin, 10, "+");
  decrementVix = new CircleButton(0.75*width-65, height-0.25*margin, 10, "-");
  incrementVix = new CircleButton(0.75*width+65, height-0.25*margin, 10, "+");

  decrementAy = new CircleButton(margin/2-65, 20+0.25*margin, 10, "-");
  incrementAy = new CircleButton(margin/2+65, 20+0.25*margin, 10, "+");
  decrementViy = new CircleButton(margin/2-65, 20+0.5*margin, 10, "-");
  incrementViy = new CircleButton(margin/2+65, 20+0.5*margin, 10, "+");

  textAlign(CENTER, CENTER);
  textSize(16);
  frameRate(30);
}


function draw() {
  background(220);

  if(isRunning) runningFrameCount++;

  drawControlButtons();
  drawGrid();
  makePhysicsButtons();

  strokeWeight(2);
  stroke(0);
  line(margin, height-margin, margin + 3.5*vi*Math.cos(theta*Math.PI/180.0), height - (margin + 3.5*vi*Math.sin(theta*Math.PI/180.0)));

  noStroke();
  fill(0);
  projx = margin + vi*Math.cos(theta*Math.PI/180.0)*runningFrameCount;
  projy = height - margin - (vi*Math.sin(theta*Math.PI/180.0)*runningFrameCount + 0.5*(ag)*runningFrameCount*runningFrameCount);
  ellipse(projx, projy, 11, 11); // projectile
  text("("+(projx-margin).toFixed(0)+", "+(height-margin-projy).toFixed(0)+")", projx+45, projy); // projectile coords
  fill(255, 255, 153);
  ellipse(margin + vix*runningFrameCount + 0.5*ax*runningFrameCount*runningFrameCount, height-margin+20, 11, 11); // horizontal mover
  fill(255, 153, 0);
  ellipse(margin-20, height - (margin + viy*runningFrameCount + 0.5*ay*runningFrameCount*runningFrameCount), 11, 11); // vertical mover

  // tracking points:
  fill(0);
  for(var k = 0; k < runningFrameCount; k++) {
    ellipse(margin + vi*Math.cos(theta*Math.PI/180.0)*k, height - margin - (vi*Math.sin(theta*Math.PI/180.0)*k + 0.5*(ag)*k*k), 3, 3);
  }

  noStroke();
  fill(0);
  text("t="+runningFrameCount, width/2, 20);

  fill(200, 50, 50);
  text("X ("+(randx-margin)+", "+(height-margin-randy)+")", randx, randy);
}


function drawGrid() {
  stroke(255);
  strokeWeight(1);
  for(var k = 0; k < width/10; k++) {
    line(margin+k*10, 0, margin+k*10, height-margin);
  }
  for(var k = 0; k < height/10; k++) {
    line(margin, height-k*10-margin, width, height-k*10-margin);
  }
}


function makePhysicsButtons() {
  decrementTheta.drawButton();
  incrementTheta.drawButton();
  decrementVi.drawButton();
  incrementVi.drawButton();

  decrementAx.drawButton();
  incrementAx.drawButton();
  decrementVix.drawButton();
  incrementVix.drawButton();

  decrementAy.drawButton();
  incrementAy.drawButton();
  decrementViy.drawButton();
  incrementViy.drawButton();

  noStroke();
  fill(0);
  fill(255, 153, 0);
  text("vertical 1D:", margin/2, 20);
  text("ay="+ay.toFixed(2)+" p/f^2", margin/2, 20+0.25*margin);
  text("viy="+viy.toFixed(1)+" p/f", margin/2, 20+0.5*margin);

  fill(255, 255, 153);
  text("horizontal 1D:", 0.75*width, height-0.75*margin);
  text("ax="+ax.toFixed(2)+" p/f^2", 0.75*width, height-0.5*margin);
  text("vix="+vix.toFixed(1)+" p/f", 0.75*width, height-0.25*margin);

  fill(0);
  text("projectile (2D):", 2*margin, height-0.75*margin);
  text("θ="+theta.toFixed(1)+" deg", 2*margin, height-0.5*margin);
  text("vi="+vi.toFixed(1)+" p/f", 2*margin, height-0.25*margin);
}


function drawControlButtons() {
  stroke(255);
  strokeWeight(1);
  fill(70, 220, 70);
  rect(0, height-30, 30, 30);
  fill(220, 70, 70);
  rect(30, height-30, 30, 30);
  fill(70, 70, 220);
  rect(60, height-30, 30, 30);

  fill(178, 97, 208);
  rect(width/2 - 34, height-30, 30, 30);
  rect(width/2 + 4, height-30, 30, 30);
}


function mouseClicked() {
  if(mouseX < 30 && mouseY > height-30) isRunning = true; // green go button

  else if(mouseX > 30 && mouseX < 60 && mouseY > height-30) { // red reset button
    isRunning = false;
    runningFrameCount = 0;
  }

  else if(mouseX > 60 && mouseX < 90 && mouseY > height-30) isRunning = false; // blue pause button

  else if(mouseX > width/2 - 34 && mouseX < width/2 - 4 && mouseY > height-30) runningFrameCount--; // frame forward button
  else if(mouseX > width/2 + 4 && mouseX < width/2 + 34 && mouseY > height-30) runningFrameCount++; // frame back button

  else if(runningFrameCount == 0 && decrementTheta.getDistance(mouseX, mouseY) < decrementTheta.r) theta -= 0.2;
  else if(runningFrameCount == 0 && incrementTheta.getDistance(mouseX, mouseY) < incrementTheta.r) theta += 0.2;
  else if(runningFrameCount == 0 && decrementVi.getDistance(mouseX, mouseY) < decrementVi.r) vi -= 0.1;
  else if(runningFrameCount == 0 && incrementVi.getDistance(mouseX, mouseY) < incrementVi.r) vi += 0.1;

  else if(runningFrameCount == 0 && decrementAx.getDistance(mouseX, mouseY) < decrementAx.r) ax -= 0.01;
  else if(runningFrameCount == 0 && incrementAx.getDistance(mouseX, mouseY) < incrementAx.r) ax += 0.01;
  else if(runningFrameCount == 0 && decrementVix.getDistance(mouseX, mouseY) < decrementVix.r) vix -= 0.1;
  else if(runningFrameCount == 0 && incrementVix.getDistance(mouseX, mouseY) < incrementVix.r) vix += 0.1;

  else if(runningFrameCount == 0 && decrementAy.getDistance(mouseX, mouseY) < decrementAy.r) ay -= 0.01;
  else if(runningFrameCount == 0 && incrementAy.getDistance(mouseX, mouseY) < incrementAy.r) ay += 0.01;
  else if(runningFrameCount == 0 && decrementViy.getDistance(mouseX, mouseY) < decrementViy.r) viy -= 0.1;
  else if(runningFrameCount == 0 && incrementViy.getDistance(mouseX, mouseY) < incrementViy.r) viy += 0.1;
}



class CircleButton {
  constructor(x, y, r, label) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.label = label
  }
  drawButton() {
    fill(255);
    ellipse(this.x, this.y, 2*this.r, 2*this.r);
    fill(0);
    text(this.label, this.x, this.y);
  }
  getDistance(x, y) {
    return sqrt(pow(this.x - x, 2) + pow(this.y - y, 2));
  }
}
