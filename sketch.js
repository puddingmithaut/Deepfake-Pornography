let test;
let headline;
let fließtext;
let arrows;
let arrow2;
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

// Status für Diagramm 1 (Deepfake Videos)
let diagram1_2_percent_clicked = false;
let diagram1_98_percent_clicked = false;

// Status für Diagramm 2 (Konsens - 2% consensual, 98% non-consensual)
let diagram2_2_percent_clicked = false;
let diagram2_98_percent_clicked = false;

// Status für Diagramm 3 (Geschlecht - 1% male, 99% female)
let diagram3_1_percent_clicked = false;
let diagram3_99_percent_clicked = false;

// Status für Sichtbarkeit der Diagramme
let showDiagram1 = false;
let showDiagram2 = false;
let showDiagram3 = false;

// Opacity-Werte für Fade-In
let diagram1Opacity = 0;
let diagram2Opacity = 0;
let diagram3Opacity = 0;

// Startzeit
let startTime;

// Status für Arrows
let arrow2Appeared = false;
let arrow1Appeared = false;
let diagram1BothClicked = false;
let diagram3BothClicked = false;
let arrowDelay = 3;

// Zeitpunkte für Klicks
let diagram1_98_clickTime = 0;
let diagram3_99_clickTime = 0;

function preload() {
  test = loadImage('assets/hintergrundskizze.jpg');
  headline = loadFont("assets/Avenir Heavy.ttf");
  fließtext = loadFont("assets/Avenir Regular.ttf");
  arrows = loadImage("assets/arrows1.png");
  arrow2 = loadImage("assets/arrows2.png");
  pfeil = loadImage("assets/3.png");
  pfeil1 = loadImage("assets/4.png");
  pfeil2 = loadImage("assets/1.png");
  pfeil3 = loadImage("assets/2.png");
  pfeil4 = loadImage("assets/5.png");
  pfeil5 = loadImage("assets/6.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight * 6);
  startTime = millis();
  
  bildBreite = test.width;
  bildHoehe = test.height;
  scaleFaktor = windowWidth / bildBreite;
  neueHoehe = bildHoehe * scaleFaktor;
}

function draw() {
  background(47, 45, 45);
  
  let elapsed = (millis() - startTime) / 1000;
  
  // Diagramm 1 nach 2 Sekunden einblenden
  if (elapsed >= 2 && !showDiagram1) {
    showDiagram1 = true;
  }
  
  // Prüfen ob beide Segmente in Diagramm 1 geklickt wurden
  if (diagram1_2_percent_clicked && diagram1_98_percent_clicked && !diagram1BothClicked) {
    diagram1BothClicked = true;
  }
  
  // Arrow2 erscheint 3 Sekunden nachdem beide Segmente in Diagramm 1 geklickt wurden
  if (diagram1BothClicked && !arrow2Appeared) {
    let timeSinceBothClicked = (millis() - diagram1_98_clickTime) / 1000;
    if (timeSinceBothClicked >= arrowDelay) {
      arrow2Appeared = true;
    }
  }
  
  // Diagramm 3 erscheint NACH Arrow2
  if (arrow2Appeared && !showDiagram3) {
    showDiagram3 = true;
  }
  
  // Prüfen ob beide Segmente in Diagramm 3 geklickt wurden
  if (diagram3_1_percent_clicked && diagram3_99_percent_clicked && !diagram3BothClicked) {
    diagram3BothClicked = true;
  }
  
  // Arrow1 erscheint 3 Sekunden nachdem beide Segmente in Diagramm 3 geklickt wurden
  if (diagram3BothClicked && !arrow1Appeared) {
    let timeSinceDiagram3Both = (millis() - diagram3_99_clickTime) / 1000;
    if (timeSinceDiagram3Both >= arrowDelay) {
      arrow1Appeared = true;
    }
  }
  
  // Diagramm 2 erscheint NACH Arrow1
  if (arrow1Appeared && !showDiagram2) {
    showDiagram2 = true;
  }
  
  // Opacity für Fade-In
  if (showDiagram1 && diagram1Opacity < 255) {
    diagram1Opacity = min(255, diagram1Opacity + 15);
  }
  if (showDiagram2 && diagram2Opacity < 255) {
    diagram2Opacity = min(255, diagram2Opacity + 15);
  }
  if (showDiagram3 && diagram3Opacity < 255) {
    diagram3Opacity = min(255, diagram3Opacity + 15);
  }
  
  if (showDiagram1) {
    drawPiechartoneWithOpacity(diagram1Opacity);
  }
  
  if (showDiagram2) {
    drawPiecharttwoWithOpacity(diagram2Opacity);
  }
  
  if (showDiagram3) {
    drawPiechartthreeWithOpacity(diagram3Opacity);
  }
  
  drawStaticElements();
}

function drawStaticElements() {
  // Arrow2 erscheint nachdem beide Segmente in Diagramm 1 geklickt wurden
  if (showDiagram1 && arrow2Appeared) {
    push();
    scale(0.93);
    image(arrow2, windowWidth/41.833333, 0, windowWidth, neueHoehe);
    pop();
  }
  
  // Arrow1 erscheint nachdem beide Segmente in Diagramm 3 geklickt wurden
  if (showDiagram3 && arrow1Appeared) {
    push();
    scale(0.93);
    image(arrows, windowWidth/41.833333, 0, windowWidth, neueHoehe);
    pop();
  }

  // Diagramm 1 - Bedingte Pfeile basierend auf Klicks
  if(showDiagram1 && diagram1_2_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil, windowWidth/40.48387, 0, windowWidth, neueHoehe);
    pop();
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil1, windowWidth/38, windowWidth/53.404255, windowWidth, neueHoehe);
    pop();
  }

  // Diagramm 2 (Konsens) - Bedingte Pfeile
  if(showDiagram2 && diagram2_2_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil4, windowWidth/39.841269, 0, windowWidth, neueHoehe);
    pop();
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil5, windowWidth/39.841269, 0, windowWidth, neueHoehe);
    pop();
  }

  // Diagramm 3 (Geschlecht) - Bedingte Pfeile
  if(showDiagram3 && diagram3_1_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil2, windowWidth/39.841269, 0, windowWidth, neueHoehe);
    pop();
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
    push();
    scale(0.93);
    image(pfeil3, windowWidth/39.841269, 0, windowWidth, neueHoehe);
    pop();
  }

  drawTexts();
}

function drawTexts() {
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
  
  // Diagramm 1 Titel
  if(showDiagram1) {
    textFont(headline);
    textSize(windowWidth/68.5);
    text('Deepfake Videos', windowWidth/31, windowWidth/4.399);
  }
  
  // Diagramm 1 Texte
  if(showDiagram1 && diagram1_2_percent_clicked) {
    textFont(fließtext);
    textSize(windowWidth/28.8);
    text('2%', windowWidth/2.985, windowWidth/3.93);
    textSize(windowWidth/66.755319);
    text('non pornographic', windowWidth/2.985, windowWidth/3.689);
    textSize(windowWidth/112);
    text('Political, entertainment,\nfraud and scams, fake news\nand false information.', windowWidth/2.982, windowWidth/3.515);
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    textFont(headline);
    textSize(windowWidth/17.310344);
    text('98%', windowWidth/2.97, windowWidth/2.37);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are pornographic', windowWidth/2.97, windowWidth/2.275);
  }
  
  // Diagramm 2 Texte (Konsens)
  if(showDiagram2 && diagram2_2_percent_clicked) {
    textFont(fließtext);
    textSize(windowWidth/28.8);
    text('1%', windowWidth/1.2378, windowWidth/3.1631386);
    textSize(windowWidth/69);
    text('are male', windowWidth/1.2375, windowWidth/3.009);
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
  
    textFont(headline);
    textSize(windowWidth/17.310344);
    text('99%', windowWidth/1.238, windowWidth/2.37);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are female', windowWidth/1.239, windowWidth/2.274);
  }
  
  // Diagramm 3 Texte (Geschlecht)
  if(showDiagram3 && diagram3_1_percent_clicked) {

     textFont(fließtext);
    textSize(windowWidth/28.8);
    text('2%', windowWidth/1.4014517, windowWidth/12.364532);
    textSize(windowWidth/66.985319);
    text('are consensual', windowWidth/1.4014517, windowWidth/10.25);
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
  textFont(headline);
    textSize(windowWidth/17.310344);
    text('98%', windowWidth/1.404, windowWidth/4.9882816);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are non consensual', windowWidth/1.405, windowWidth/4.58);


  }
}

function drawPiechartoneWithOpacity(opacity) {
  push();
  drawingContext.globalAlpha = opacity / 255;
  drawPiechartone();
  pop();
}

function drawPiecharttwoWithOpacity(opacity) {
  push();
  drawingContext.globalAlpha = opacity / 255;
  drawPiecharttwo();
  pop();
}

function drawPiechartthreeWithOpacity(opacity) {
  push();
  drawingContext.globalAlpha = opacity / 255;
  drawPiechartthree();
  pop();
}

// Diagramm 1 (Deepfake Videos: 2% non-porn, 98% porn)
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

// Diagramm 2 (Konsens: 2% consensual, 98% non-consensual)
function drawPiecharttwo() {
  let segmente = [];
  let farben = [color(255, 0, 0, 100), color(0, 255, 0, 150)];
  let werte = [0.02, 0.98];

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

// Diagramm 3 (Geschlecht: 1% male, 99% female)
function drawPiechartthree() {
  let segmente = [];
  let farben = [color(255, 0, 0, 100), color(0, 255, 0, 150)];
  let werte = [0.01, 0.99];

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
  // Diagramm 1 (Deepfake Videos)
  if(showDiagram1) {
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
    
    if (hoverSegment1 === 0 && !diagram1_2_percent_clicked) {
      diagram1_2_percent_clicked = true;
    }
    
    if (hoverSegment1 === 1 && !diagram1_98_percent_clicked) {
      diagram1_98_percent_clicked = true;
      diagram1_98_clickTime = millis();
    }
  }
  
  // Diagramm 3 
  if(showDiagram3) {
    let segmente3 = [];
    let werte3 = [0.01, 0.99];
    let arcX3 = windowWidth/1.69;
    let arcY3 = windowWidth/6.6;
    let arcS3 = windowWidth/4.8;
    let rotation3 = HALF_PI/1.24;
    let startwinkel3 = -rotation3;
    
    for (let i = 0; i < werte3.length; i++) {
      let winkel = werte3[i] * TWO_PI;
      segmente3.push({
        start: startwinkel3,
        ende: startwinkel3 + winkel,
        wert: werte3[i],
      });
      startwinkel3 += winkel;
    }
    
    let hoverSegment3 = getHoverSegment(arcX3, arcY3, arcS3, segmente3, rotation3);
    
    if (hoverSegment3 === 0 && !diagram3_1_percent_clicked) {
      diagram3_1_percent_clicked = true;
    }
    
    if (hoverSegment3 === 1 && !diagram3_99_percent_clicked) {
      diagram3_99_percent_clicked = true;
      diagram3_99_clickTime = millis();
    }
  }
  
  // Diagramm 2
  if(showDiagram2) {
    let segmente2 = [];
    let werte2 = [0.02, 0.98];
    let arcX2 = windowWidth/1.46;
    let arcY2 = windowWidth/2.73;
    let arcS2 = windowWidth/4.8;
    let rotation2 = HALF_PI/2.1;
    let startwinkel2 = -rotation2;
    
    for (let i = 0; i < werte2.length; i++) {
      let winkel = werte2[i] * TWO_PI;
      segmente2.push({
        start: startwinkel2,
        ende: startwinkel2 + winkel,
        wert: werte2[i],
      });
      startwinkel2 += winkel;
    }
    
    let hoverSegment2 = getHoverSegment(arcX2, arcY2, arcS2, segmente2, rotation2);
    
    if (hoverSegment2 === 0 && !diagram2_2_percent_clicked) {
      diagram2_2_percent_clicked = true;
    }
    
    if (hoverSegment2 === 1 && !diagram2_98_percent_clicked) {
      diagram2_98_percent_clicked = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 6);
  
  bildBreite = test.width;
  bildHoehe = test.height;
  scaleFaktor = windowWidth / bildBreite;
  neueHoehe = bildHoehe * scaleFaktor;
}