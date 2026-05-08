//hallo test

//Hintergrund
let backgroundsketch

//Fonts
let headline;
let fließtext;



function preload(){

backgroundsketch= loadImage('assets/backgroundsketch.jpeg')
headline= loadFont("assets/Avenir Heavy.ttf")
fließtext= loadFont("assets/Avenir Regular.ttf")


}


function setup() {
  createCanvas(windowWidth,windowHeight);
  background(47, 45, 45);
  image(backgroundsketch,0,0,windowWidth,windowHeight);

}

function draw() {

//text

fill(255,80,255);
textFont(headline);
textSize(windowHeight/10.8);
text('Deepfake', windowWidth/23, windowHeight/6.5);


fill(255,80,255);
textFont(fließtext);
textSize(windowWidth/79);
textLeading(windowWidth/70);
text('Deepfake is a form of artificial intelligence (AI)\nthat can be used to create compelling images,\nsounds and video.\nAs a result, it creates people and events that\ndo not exist or that did not actually occur',
windowWidth/23, windowHeight/ 4.2); 

textFont(headline);
text("Deepfake Videos", windowWidth/23, windowHeight/2);

drawPiechartone();
drawPiecharttwo();
drawPiechartthree();


}


function drawPiechartone() {

  let segmente = []; 
  let farben = ["#F44336", "#673AB7", "#03A9F4"];
  let werte = [0.02, 0.98];

  let arcX = windowWidth/5.8;
  let arcY = windowHeight/1.41;
  let arcS = windowWidth/4.5;
  
  let startwinkel = -HALF_PI/1.6;
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
    let angepassterMausWinkel = (mausWinkel + HALF_PI/1.6) % TWO_PI;
  
    for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + HALF_PI/1.6;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + HALF_PI/1.6;
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













}

function drawPiecharttwo(){
  let segmente = []; 
  let farben = ["#F44336", "#673AB7", "#03A9F4"];
  let werte = [0.01, 0.99];

  let arcX = windowWidth/1.64;
  let arcY = windowHeight/3.4;
  let arcS = windowWidth/5;
  
  let startwinkel = -HALF_PI/1.6;
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
  let angepassterMausWinkel = (mausWinkel + HALF_PI/1.6) % TWO_PI;
  
  for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + HALF_PI/1.6;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + HALF_PI/1.6;
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
}

function drawPiechartthree(){
let segmente = []; 
  let farben = ["#F44336", "#673AB7", "#03A9F4"];
  let werte = [0.02, 0.98];

  let arcX = windowWidth/1.408 ;
  let arcY = windowHeight/1.33;
  let arcS = windowWidth/5;
  
  let startwinkel = -HALF_PI/1.6;
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
    let angepassterMausWinkel = (mausWinkel + HALF_PI/1.6) % TWO_PI;
  
    for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + HALF_PI/1.6;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + HALF_PI/1.6;
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

}