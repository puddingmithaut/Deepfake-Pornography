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

// Fade-In Status
let diagram1Fading = false;
let diagram2Fading = false;
let diagram3Fading = false;

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

// Cache für berechnete Werte
let cachedValues = {};

// Cache für Diagramm-Pfade (für Performance)
let diagram1Path;
let diagram2Path;
let diagram3Path;
let needRedrawPaths = true;

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
  updateCachedValues();
  
  // Kein Fade-In mehr, sondern direkt anzeigen
  diagram1Opacity = 255;
  diagram2Opacity = 255;
  diagram3Opacity = 255;
}

function updateCachedValues() {
  bildBreite = test.width;
  bildHoehe = test.height;
  scaleFaktor = windowWidth / bildBreite;
  neueHoehe = bildHoehe * scaleFaktor;
  
  // Cache alle häufig verwendeten Berechnungen
  cachedValues = {
    textSizeHeadline: windowWidth / 22.979,
    textSizeFließtext: windowWidth / 114.89675,
    textLeading: windowWidth / 96,
    titelDeepfakeX: windowWidth / 33,
    titelDeepfakeY: windowWidth / 19.160305,
    definitionX: windowWidth / 29.8,
    definitionY: windowWidth / 10.9,
    diagramTitelSize: windowWidth / 68.5,
    diagram1TitelY: windowWidth / 4.399,
    percentSize: windowWidth / 28.8,
    labelSize: windowWidth / 66.755319,
    smallTextSize: windowWidth / 112,
    headlinePercentSize: windowWidth / 17.310344,
    diagram1: {
      arcX: windowWidth / 7,
      arcY: windowWidth / 2.4,
      arcS: windowWidth / 2.886044,
      rotation: HALF_PI / 1.57
    },
    diagram2: {
      arcX: windowWidth / 1.46,
      arcY: windowWidth / 2.73,
      arcS: windowWidth / 4.8,
      rotation: HALF_PI / 2.1
    },
    diagram3: {
      arcX: windowWidth / 1.69,
      arcY: windowWidth / 6.6,
      arcS: windowWidth / 4.8,
      rotation: HALF_PI / 1.24
    }
  };
  
  needRedrawPaths = true;
}

function draw() {
  background(47, 45, 45);
  
  let elapsed = (millis() - startTime) / 1000;
  
  // Diagramme mit sofortiger Sichtbarkeit anzeigen
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
  
  // Direktes Zeichnen ohne Fade-In
  if (showDiagram1) {
    drawPiechartone();
  }
  
  if (showDiagram2) {
    drawPiecharttwo();
  }
  
  if (showDiagram3) {
    drawPiechartthree();
  }
  
  drawStaticElements();
}

function drawStaticElements() {
  // Arrow2 erscheint nachdem beide Segmente in Diagramm 1 geklickt wurden
  if (showDiagram1 && arrow2Appeared) {
    drawScaledImage(arrow2);
  }
  
  // Arrow1 erscheint nachdem beide Segmente in Diagramm 3 geklickt wurden
  if (showDiagram3 && arrow1Appeared) {
    drawScaledImage(arrows);
  }

  // Diagramm 1 - Bedingte Pfeile basierend auf Klicks
  if(showDiagram1 && diagram1_2_percent_clicked) {
    drawScaledImage(pfeil);
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    drawScaledImage(pfeil1);
  }

  // Diagramm 2 (Konsens) - Bedingte Pfeile
  if(showDiagram2 && diagram2_2_percent_clicked) {
    drawScaledImage(pfeil4);
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
    drawScaledImage(pfeil5);
  }

  // Diagramm 3 (Geschlecht) - Bedingte Pfeile
  if(showDiagram3 && diagram3_1_percent_clicked) {
    drawScaledImage(pfeil2);
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
    drawScaledImage(pfeil3);
  }

  drawTexts();
}

// Hilfsfunktion für skalierte Bilder
function drawScaledImage(img) {
  push();
  scale(0.93);
  image(img, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  pop();
}

function drawTexts() {
  // Deepfake Titel
  fill(255, 80, 255);
  textFont(headline);
  textSize(cachedValues.textSizeHeadline);
  text('Deepfake', cachedValues.titelDeepfakeX, cachedValues.titelDeepfakeY);
  
  // Definition
  textFont(fließtext);
  textSize(cachedValues.textSizeFließtext);
  textLeading(cachedValues.textLeading);
  text('A deepfake is a piece of media - such as a photo,\naudio or video, that has been altered, generated\nor falsified using artificial intelligence (AI) \ntechniques, to convincingly replace one person’s \nface or voice. As a result, it creates people and \nevents that´do not exist or that did not actually \noccur.',
  cachedValues.definitionX, cachedValues.definitionY);
  
  // Diagramm 1 Titel
  if(showDiagram1) {
    textFont(headline);
    textSize(cachedValues.diagramTitelSize);
    text('Deepfake Videos', windowWidth/31, cachedValues.diagram1TitelY);
  }
  
  // Diagramm 1 Texte
  if(showDiagram1 && diagram1_2_percent_clicked) {
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('2%', windowWidth/2.985, windowWidth/3.93);
    textSize(cachedValues.labelSize);
    text('non pornographic', windowWidth/2.985, windowWidth/3.689);
    textSize(cachedValues.smallTextSize);
    text('Political, entertainment,\nfraud and scams, fake news\nand false information.', windowWidth/2.982, windowWidth/3.515);
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('98%', windowWidth/2.97, windowWidth/2.37);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are pornographic', windowWidth/2.97, windowWidth/2.275);
  }
  
  // Diagramm 2 Texte (Konsens)
  if(showDiagram2 && diagram2_2_percent_clicked) {
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('1%', windowWidth/1.2378, windowWidth/3.1631386);
    textSize(windowWidth/69);
    text('are male', windowWidth/1.2375, windowWidth/3.009);
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('99%', windowWidth/1.238, windowWidth/2.37);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are female', windowWidth/1.239, windowWidth/2.274);
  }
  
  // Diagramm 3 Texte (Geschlecht)
  if(showDiagram3 && diagram3_1_percent_clicked) {
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('2%', windowWidth/1.4014517, windowWidth/12.364532);
    textSize(windowWidth/66.985319);
    text('are consensual', windowWidth/1.4014517, windowWidth/10.25);
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('98%', windowWidth/1.404, windowWidth/4.9882816);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are non consensual', windowWidth/1.405, windowWidth/4.58);
  }
}

// Diagramm 1 mit optimiertem Zeichnen
function drawPiechartone() {
  let segmente = [];
  let farben = [color(255, 0, 0, 100), color(0, 255, 0, 150)];
  let werte = [0.02, 0.98];
  let d = cachedValues.diagram1;
  
  let startwinkel = -d.rotation;
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
  
  // Direktes Zeichnen ohne Opacity-Überprüfung
  for (let i = 0; i < segmente.length; i++) {
    if (i === getHoverSegment(d.arcX, d.arcY, d.arcS, segmente, d.rotation)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(d.arcX, d.arcY, d.arcS, d.arcS, segmente[i].start, segmente[i].ende, PIE);
  }
}

// Diagramm 2
function drawPiecharttwo() {
  let segmente = [];
  let farben = [color(255, 0, 0, 100), color(0, 255, 0, 150)];
  let werte = [0.02, 0.98];
  let d = cachedValues.diagram2;
  
  let startwinkel = -d.rotation;
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
    if (i === getHoverSegment(d.arcX, d.arcY, d.arcS, segmente, d.rotation)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(d.arcX, d.arcY, d.arcS, d.arcS, segmente[i].start, segmente[i].ende, PIE);
  }
}

// Diagramm 3
function drawPiechartthree() {
  let segmente = [];
  let farben = [color(255, 0, 0, 100), color(0, 255, 0, 150)];
  let werte = [0.01, 0.99];
  let d = cachedValues.diagram3;
  
  let startwinkel = -d.rotation;
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
    if (i === getHoverSegment(d.arcX, d.arcY, d.arcS, segmente, d.rotation)) {
      fill(255);
    } else {
      fill(farben[i]);
    }
    arc(d.arcX, d.arcY, d.arcS, d.arcS, segmente[i].start, segmente[i].ende, PIE);
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
    let ende = segmente[i].ende + rotation;
    
    while (start >= TWO_PI) start -= TWO_PI;
    while (start < 0) start += TWO_PI;
    while (ende >= TWO_PI) ende -= TWO_PI;
    while (ende < 0) ende += TWO_PI;
    
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
  // Diagramm 1
  if(showDiagram1) {
    let segmente1 = [];
    let werte1 = [0.02, 0.98];
    let d1 = cachedValues.diagram1;
    let startwinkel1 = -d1.rotation;
    
    for (let i = 0; i < werte1.length; i++) {
      let winkel = werte1[i] * TWO_PI;
      segmente1.push({
        start: startwinkel1,
        ende: startwinkel1 + winkel,
        wert: werte1[i],
      });
      startwinkel1 += winkel;
    }
    
    let hoverSegment1 = getHoverSegment(d1.arcX, d1.arcY, d1.arcS, segmente1, d1.rotation);
    
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
    let d3 = cachedValues.diagram3;
    let startwinkel3 = -d3.rotation;
    
    for (let i = 0; i < werte3.length; i++) {
      let winkel = werte3[i] * TWO_PI;
      segmente3.push({
        start: startwinkel3,
        ende: startwinkel3 + winkel,
        wert: werte3[i],
      });
      startwinkel3 += winkel;
    }
    
    let hoverSegment3 = getHoverSegment(d3.arcX, d3.arcY, d3.arcS, segmente3, d3.rotation);
    
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
    let d2 = cachedValues.diagram2;
    let startwinkel2 = -d2.rotation;
    
    for (let i = 0; i < werte2.length; i++) {
      let winkel = werte2[i] * TWO_PI;
      segmente2.push({
        start: startwinkel2,
        ende: startwinkel2 + winkel,
        wert: werte2[i],
      });
      startwinkel2 += winkel;
    }
    
    let hoverSegment2 = getHoverSegment(d2.arcX, d2.arcY, d2.arcS, segmente2, d2.rotation);
    
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
  updateCachedValues();
}