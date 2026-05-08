//hallo test

let backgroundsketch


function preload(){

backgroundsketch= loadImage('assets/backgroundsketch.jpeg')

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  background(119, 89, 91);
  image(backgroundsketch,0,0,windowWidth,windowHeight);

}

function draw() {

drawPiechartone();

}


function drawPiechartone(){
let farben = ["#F44336", "#673AB7", "#03A9F4"];
let werte = [0.02,0.98];

let arcX = windowWidth/5.8;
let arcY = windowHeight/1.41;
let arcS = windowWidth/4.5;

let startwinkel = -HALF_PI;
let segmente = [];

  for (let i = 0; i < werte.length; i++) {
    let winkel = werte[i] * TWO_PI;
    segmente.push({
      start: startwinkel,
      ende: startwinkel + winkel,
      wert: werte[i],
    });
    startwinkel += winkel;
  }

  for (let i = 0; i < segmente.length; i++) {
    if (i === getHoverSegment()) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(arcX, arcY, arcS, arcS, segmente[i].start, segmente[i].ende, PIE);
  }

  if (getHoverSegment() !== -1) {
    drawInfobox(werte[getHoverSegment()] * 100 + "%");
  }


function getHoverSegment() {
  let abstand = dist(mouseX, mouseY, arcX, arcY);
  if (abstand > arcS / 2) {
    return -1;
  }

  let mausWinkel = atan2(mouseY - arcY, mouseX - arcX);
  //print(mausWinkel);
  if (mausWinkel < 0) {
    mausWinkel += TWO_PI;
  }

  for (let i = 0; i < segmente.length; i++) {
    if (mausWinkel > segmente[i].start && mausWinkel < segmente[i].ende) {
      return i;
    }
  }
}

function drawInfobox(label) {
  fill(50);
  rect(mouseX + 10, mouseY - 30, 70, 25);
  fill(255);
  textSize(12);
  text(label, mouseX + 15, mouseY - 13);
}
}


function drawPiecharttwo(){


}

function drawPiechartthree(){


}