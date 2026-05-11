let test;
let headline;
let fließtext;
let arrows;
let pfeil;
let pfeil1;
let pfeil2;
let pfeil3;
let pfeil4;
let pfeil5;

// Cache für skalierte Werte
let scaleFaktor;
let neueHoehe;
let bildBreite;
let bildHoehe;

// Status für Diagramm 1
let diagram1_2_percent_clicked = false;
let diagram1_98_percent_clicked = false;

function preload() {
  test = loadImage('assets/hintergrundskizze.jpg');
  headline = loadFont("assets/Avenir Heavy.ttf");
  fließtext = loadFont("assets/Avenir Regular.ttf");
  arrows = loadImage("assets/arrows.png");
  pfeil = loadImage("assets/3.png");
  pfeil1 = loadImage("assets/4.png");
  pfeil2 = loadImage("assets/1.png");
  pfeil3 = loadImage("assets/2.png");
  pfeil4 = loadImage("assets/5.png");
  pfeil5 = loadImage("assets/6.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight * 6);
  
  // Skalierungsfaktoren einmal berechnen
  bildBreite = test.width;
  bildHoehe = test.height;
  scaleFaktor = windowWidth / bildBreite;
  neueHoehe = bildHoehe * scaleFaktor;
}

function draw() {
  background(47, 45, 45);
  
  // ALLES jeden Frame neu zeichnen
  drawPiechartone();
  drawPiecharttwo();
  drawPiechartthree();
  drawStaticElements();
}

function drawStaticElements() {
  // Hintergrund Sketch
  push();
  scale(0.93);
  //image(test, windowWidth/40, 0, windowWidth, neueHoehe);
  pop();

  // Images - Standardmäßig sichtbare Pfeile (arrows)
  push();
  scale(0.93);
  image(arrows, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  pop();

  // Diagramm 1 - Bedingte Pfeile basierend auf Klicks
  if(diagram1_2_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil, windowWidth/40.48387, 0, windowWidth, neueHoehe);
    pop();
  }
  
  if(diagram1_98_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil1, windowWidth/38, windowWidth/53.404255, windowWidth, neueHoehe);
    pop();
  }

  // Diese Pfeile bleiben immer sichtbar (für Diagramm 2 und 3)
  push();
  scale(0.93);
  image(pfeil2, windowWidth/39.841269, 0, windowWidth, neueHoehe);
  pop();

  push();
  scale(0.93);
  image(pfeil3, windowWidth/39.841269, 0, windowWidth, neueHoehe);
  pop();

  push();
  scale(0.93);
  image(pfeil4, windowWidth/39.841269, 0, windowWidth, neueHoehe);
  pop();

  push();
  scale(0.93);
  image(pfeil5, windowWidth/39.841269, 0, windowWidth, neueHoehe);
  pop();

  // Texte
  drawTexts();
}

function drawTexts() {
  let fontmittel = windowWidth/28.8;
  let fontbig = windowWidth/17.310344;
  let fontmittelklein = windowWidth/66.755319;
  let fontklein = windowWidth/114.89675;
  
  // Deepfake Titel
  fill(255, 80, 255);
  textFont(headline);
  textSize(windowWidth/22.979);
  text('Deepfake', windowWidth/33, windowWidth/19.160305);
  
  // Definition
  textFont(fließtext);
  textSize(windowWidth/114.89675);
  textLeading(windowWidth/96);
  text('A deepfake is a piece of media - such as a photo,\naudio or video, that has been altered, generated\nor falsified using artificial intelligence (AI) \ntechniques, to convincingly replace one person’s \nface or voice. As a result, it creates people and \nevents that´do not exist or that did not actually \noccur.',
  windowWidth/29.8, windowWidth/10.9);
  
  // Diagramm Eins Titel (immer sichtbar)
  textFont(headline);
  textSize(windowWidth/68.5);
  text('Deepfake Videos', windowWidth/31, windowWidth/4.399);
  
  // Diagramm Eins - 2% Informationen (nur wenn auf 2% geklickt wurde)
  if(diagram1_2_percent_clicked) {
    textFont(fließtext);
    textSize(windowWidth/28.8);
    text('2%', windowWidth/2.985, windowWidth/3.93);
    textSize(windowWidth/66.755319);
    text('non pornographic', windowWidth/2.985, windowWidth/3.689);
    textSize(windowWidth/112);
    text('Political, entertainment,\nfraud and scams, fake news\nand false information.', windowWidth/2.982, windowWidth/3.515);
  }
  
  // Diagramm Eins - 98% Informationen (nur wenn auf 98% geklickt wurde)
  if(diagram1_98_percent_clicked) {
    textFont(headline);
    textSize(windowWidth/17.310344);
    text('98%', windowWidth/2.97, windowWidth/2.37);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are pornographic', windowWidth/2.97, windowWidth/2.275);
  }
  
  // Diagramm Zwei (immer sichtbar)
  textFont(fließtext);
  textSize(windowWidth/28.8);
  text('2%', windowWidth/1.4014517, windowWidth/12.364532);
  textSize(windowWidth/66.985319);
  text('are consensual', windowWidth/1.4014517, windowWidth/10.25);
  
  textFont(headline);
  textSize(windowWidth/17.310344);
  text('98%', windowWidth/1.404, windowWidth/4.9882816);
  textFont(fließtext);
  textSize(windowWidth/69);
  text('are non consensual', windowWidth/1.405, windowWidth/4.58);
  
  // Diagramm Drei (immer sichtbar)
  textFont(fließtext);
  textSize(windowWidth/28.8);
  text('1%', windowWidth/1.2378, windowWidth/3.1631386);
  textSize(windowWidth/69);
  text('are male', windowWidth/1.2375, windowWidth/3.009);
  
  textFont(headline);
  textSize(windowWidth/17.310344);
  text('99%', windowWidth/1.238, windowWidth/2.37);
  textFont(fließtext);
  textSize(windowWidth/69);
  text('are female', windowWidth/1.239, windowWidth/2.274);
}

function drawPiechartone() {
  let segmente = [];
  let farben = [color(255, 0, 0, 100), color(0, 255, 0, 150)];
  let werte = [0.02, 0.98];

  let arcX = windowWidth/7;
  let arcY = windowWidth/2.4;
  let arcS = windowWidth/2.886044;
  let rotation = HALF_PI/1.57;
  let startwinkel = -rotation;
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
  
  for (let i = 0; i < segmente.length; i++) {
    if (i === getHoverSegment(arcX, arcY, arcS, segmente, rotation)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(arcX, arcY, arcS, arcS, segmente[i].start, segmente[i].ende, PIE);
  }
}

function drawPiecharttwo() {
  let segmente = [];
  let farben = [color(255, 0, 0, 50), color(0, 255, 0, 50)];
  let werte = [0.01, 0.99];

  let arcX = windowWidth/1.46;
  let arcY = windowWidth/2.73;
  let arcS = windowWidth/4.8;
  let rotation = HALF_PI/2.1;
  let startwinkel = -rotation;
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
  
  for (let i = 0; i < segmente.length; i++) {
    if (i === getHoverSegment(arcX, arcY, arcS, segmente, rotation)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(arcX, arcY, arcS, arcS, segmente[i].start, segmente[i].ende, PIE);
  }
}

function drawPiechartthree() {
  let segmente = [];
  let farben = [color(255, 0, 0, 50), color(0, 255, 0, 50)];
  let werte = [0.02, 0.98];

  let arcX = windowWidth/1.69;
  let arcY = windowWidth/6.6;
  let arcS = windowWidth/4.8;
  let rotation = HALF_PI/1.24;
  let startwinkel = -rotation;
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
  
  for (let i = 0; i < segmente.length; i++) {
    if (i === getHoverSegment(arcX, arcY, arcS, segmente, rotation)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(arcX, arcY, arcS, arcS, segmente[i].start, segmente[i].ende, PIE);
  }
}

function getHoverSegment(arcX, arcY, arcS, segmente, rotation) {
  let abstand = dist(mouseX, mouseY, arcX, arcY);
  if (abstand > arcS / 2) {
    return -1;
  }
  
  let mausWinkel = atan2(mouseY - arcY, mouseX - arcX);
  if (mausWinkel < 0) {
    mausWinkel += TWO_PI;
  }
  
  let angepassterMausWinkel = (mausWinkel + rotation) % TWO_PI;
  
  for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + rotation;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + rotation;
    if (ende < 0) ende += TWO_PI;
    
    if (start < ende) {
      if (angepassterMausWinkel >= start && angepassterMausWinkel < ende) {
        return i;
      }
    } else {
      if (angepassterMausWinkel >= start || angepassterMausWinkel < ende) {
        return i;
      }
    }
  }
  return -1;
}

function mousePressed() {
  console.log("Mouse clicked"); // Debug-Ausgabe
  
  // Nur Diagramm 1 prüfen
  let segmente1 = [];
  let werte1 = [0.02, 0.98];
  let arcX1 = windowWidth/7;
  let arcY1 = windowWidth/2.4;
  let arcS1 = windowWidth/2.886044;
  let rotation1 = HALF_PI/1.57;
  let startwinkel1 = -rotation1;
  
  for (let i = 0; i < werte1.length; i++) {
    let winkel = werte1[i] * TWO_PI;
    segmente1.push({
      start: startwinkel1,
      ende: startwinkel1 + winkel,
      wert: werte1[i],
    });
    startwinkel1 += winkel;
  }
  
  let hoverSegment1 = getHoverSegment(arcX1, arcY1, arcS1, segmente1, rotation1);
  console.log("Hover segment:", hoverSegment1); // Debug-Ausgabe
  
  // 2% Segment (non-pornographic)
  if (hoverSegment1 === 0 && !diagram1_2_percent_clicked) {
    console.log("2% clicked"); // Debug-Ausgabe
    diagram1_2_percent_clicked = true;
  }
  
  // 98% Segment (pornographic)
  if (hoverSegment1 === 1 && !diagram1_98_percent_clicked) {
    console.log("98% clicked"); // Debug-Ausgabe
    diagram1_98_percent_clicked = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 6);
  
  // Skalierung neu berechnen
  bildBreite = test.width;
  bildHoehe = test.height;
  scaleFaktor = windowWidth / bildBreite;
  neueHoehe = bildHoehe * scaleFaktor;
}