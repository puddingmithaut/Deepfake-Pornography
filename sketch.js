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

let segmente = []; 
let farben = ["#F44336", "#673AB7", "#03A9F4"];
let werte = [0.02, 0.98];

function drawPiechartone() {
  let arcX = windowWidth/5.8;
  let arcY = windowHeight/1.41;
  let arcS = windowWidth/4.5;
  
  let startwinkel = -HALF_PI;
  segmente = []; 
  
  for (let i = 0; i < werte.length; i++) {
    let winkel = werte[i] * TWO_PI;
    segmente.push({
      start: startwinkel,
      ende: startwinkel + winkel,
      wert: werte[i],
    });
    startwinkel += winkel;
  }
  
  // Segmente zeichnen
  for (let i = 0; i < segmente.length; i++) {
    if (i === getHoverSegment(arcX, arcY, arcS)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(arcX, arcY, arcS, arcS, segmente[i].start, segmente[i].ende, PIE);
  }
  
  let hoverSegment = getHoverSegment(arcX, arcY, arcS);
  if (hoverSegment !== -1 && werte[hoverSegment] !== undefined) {
    drawInfobox(werte[hoverSegment] * 100 + "%");
  }
}

function getHoverSegment(arcX, arcY, arcS) {
  let abstand = dist(mouseX, mouseY, arcX, arcY);
  if (abstand > arcS / 2) {
    return -1;
  }
  
  let mausWinkel = atan2(mouseY - arcY, mouseX - arcX);
  // Umwandeln in Bereich 0 bis TWO_PI
  if (mausWinkel < 0) {
    mausWinkel += TWO_PI;
  }
  
  // Wichtig: Startwinkel von -HALF_PI (oben) auf 0 bis TWO_PI umrechnen
  let angepassterMausWinkel = (mausWinkel + HALF_PI) % TWO_PI;
  
  for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + HALF_PI;
    if (start < 0) start += TWO_PI;
    
    let ende = segmente[i].ende + HALF_PI;
    if (ende < 0) ende += TWO_PI;
    
    // Prüfen ob Mauswinkel im Segment liegt
    if (start < ende) {
      if (angepassterMausWinkel >= start && angepassterMausWinkel < ende) {
        return i;
      }
    } else {
      // Über den 2π-Grenzfall
      if (angepassterMausWinkel >= start || angepassterMausWinkel < ende) {
        return i;
      }
    }
  }
  return -1;
}

function drawInfobox(label) {
  fill(50);
  rect(mouseX + 10, mouseY - 30, 70, 25);
  fill(255);
  textSize(12);
  text(label, mouseX + 15, mouseY - 13);
}


function drawPiecharttwo(){


}

function drawPiechartthree(){


}