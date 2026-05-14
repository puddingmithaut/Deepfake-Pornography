let test;
let headline;
let fließtext;

let arrows;
let arrow2;

let arrowanimation1; 
let arrowanimation2;

let pfeil;
let pfeil1;
let pfeil2;
let pfeil3;
let pfeil4;
let pfeil5;

let kreisdiagramm3;
let kreisdiagramm3small_clicked;
let kreisdiagramm3big_clicked;

let kreisdiagramm1; 
let kreisdiagramm1small_clicked; 
let kreisdiagramm1big_clicked;

let kreisdiagramm2; 
let kreisdiagramm2small_clicked; 
let kreisdiagramm2big_clicked;


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

// Status für Arrows
let arrowsAppeared = false;  // Beide Arrows erscheinen zusammen
let diagram1BothClicked = false;

// Delay-Variablen
let diagram1BothClickedTime = 0;  // Zeitpunkt, wann beide Segmente geklickt wurden
let arrowsDelaySeconds = 2;        // 2 Sekunden bis Arrows erscheinen
let diagramsDelaySeconds = 2;      // Weitere 2 Sekunden bis Diagramme erscheinen
let arrowsShownTime = 0;           // Zeitpunkt, wann die Arrows erschienen sind

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

  pfeil = loadImage("assets/3a.png");
  pfeil1 = loadImage("assets/4a.png");
  pfeil2 = loadImage("assets/1a.png");
  pfeil3 = loadImage("assets/2a.png");
  pfeil4 = loadImage("assets/5a.png");
  pfeil5 = loadImage("assets/6a.png");

  kreisdiagramm3= loadImage("assets/kreisdiagramme/Diagram 3.png");
  kreisdiagramm3big_clicked= loadImage("assets/kreisdiagramme/Diagram 3 big pie piece clicked.png");
  kreisdiagramm3small_clicked= loadImage("assets/kreisdiagramme/Diagram 3 little pie piece clicked.png");

  kreisdiagramm1= loadImage("assets/kreisdiagramme/Diagram 1 purple no clicked.png");
  kreisdiagramm1big_clicked= loadImage("assets/kreisdiagramme/Diagram 1 big pie piece clicked.png");
  kreisdiagramm1small_clicked= loadImage("assets/kreisdiagramme/Diagram 1 little pie piece clicked.png");

  kreisdiagramm2 = loadImage("assets/kreisdiagramme/button2.png");
  kreisdiagramm2small_clicked = loadImage("assets/kreisdiagramme/Diagram 2 little pie piece clicked.png");
  kreisdiagramm2big_clicked= loadImage("assets/kreisdiagramme/Diagram 2 big pie piece clicked.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight * 6);
  updateCachedValues();
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
    definitionY: windowWidth / 12.3,
    diagramTitelSize: windowWidth / 68.5,
    diagram1TitelY: windowWidth / 4.6,
    percentSize: windowWidth / 28.8,
    labelSize: windowWidth / 66.755319,
    smallTextSize: windowWidth / 112,
    headlinePercentSize: windowWidth / 17.310344,
    diagram1: {
      arcX: windowWidth / 7,
      arcY: windowWidth / 2.4,
      arcS: windowWidth / 2.886044,
      rotation: HALF_PI / 1.525
    },
    diagram2: {
      arcX: windowWidth / 1.46,
      arcY: windowWidth / 2.73,
      arcS: windowWidth / 4.8,
      rotation: 2.85 * PI / 4,
    },
    diagram3: {
      arcX: windowWidth / 1.69,
      arcY: windowWidth / 6.6,
      arcS: windowWidth / 4.8,
      rotation: HALF_PI / 1.87
    }
  };
  
  needRedrawPaths = true;
}

function draw() {
  background(47, 45, 45);

  //referenzbild
  //push(); 
  //scale(0.93);  
  //image(test,windowWidth/40,0,windowWidth,neueHoehe);
  //pop();

  // Diagramm 1 erscheint sofort
  if (!showDiagram1) {
    showDiagram1 = true;
  }
  
  // Prüfen ob beide Segmente in Diagramm 1 geklickt wurden
  if (diagram1_2_percent_clicked && diagram1_98_percent_clicked && !diagram1BothClicked) {
    diagram1BothClicked = true;
    diagram1BothClickedTime = millis();  // Zeitpunkt speichern
  }
  
  // Prüfen ob das Arrow-Delay vorbei ist und Arrows noch nicht angezeigt werden
  if (diagram1BothClicked && !arrowsAppeared) {
    let elapsedSinceBothClicked = (millis() - diagram1BothClickedTime) / 1000;
    if (elapsedSinceBothClicked >= arrowsDelaySeconds) {
      arrowsAppeared = true;              // Arrows erscheinen nach 2 Sekunden
      arrowsShownTime = millis();         // Zeitpunkt speichern, wann Arrows erschienen sind
    }
  }
  
  // Prüfen ob das Diagramm-Delay vorbei ist und Diagramme noch nicht angezeigt werden
  if (arrowsAppeared && !showDiagram2 && !showDiagram3) {
    let elapsedSinceArrowsShown = (millis() - arrowsShownTime) / 1000;
    if (elapsedSinceArrowsShown >= diagramsDelaySeconds) {
      showDiagram2 = true;  // Diagramm 2 erscheint nach weiteren 2 Sekunden
      showDiagram3 = true;  // Diagramm 3 erscheint nach weiteren 2 Sekunden
    }
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
  // BEIDE Arrows erscheinen nach dem ersten Delay
  if (showDiagram1 && arrowsAppeared) {
    drawScaledImage(arrow2, windowWidth/41.833333);  // Arrow2
    drawScaledImage(arrows, windowWidth/41.833333);  // Arrows
  }

  // Diagramm 1 - Bedingte Pfeile basierend auf Klicks
  if(showDiagram1 && diagram1_2_percent_clicked) {
    drawScaledImage(pfeil, windowWidth/40.48387,);
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    drawScaledImage(pfeil1, windowWidth/38, 0);
  }

  if(showDiagram2 && diagram2_2_percent_clicked) {
    drawScaledImage(pfeil4, windowWidth/39.841269, 0); 
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
    drawScaledImage(pfeil5, windowWidth/39.841269, 0); 
  }

  // Diagramm 3 (Geschlecht) - Bedingte Pfeile
  if(showDiagram3 && diagram3_1_percent_clicked) {
    drawScaledImage(pfeil2, windowWidth/39.841269);
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
    drawScaledImage(pfeil3, windowWidth/39.841269);
  }

  drawTexts();
}

// Hilfsfunktion für skalierte Bilder (Standard)
function drawScaledImage(img, xOffset = windowWidth/41.833333, yOffset = 0) {
  push();
  scale(0.93);
  image(img, xOffset, yOffset, windowWidth, neueHoehe);
  pop();
}

function drawTexts() {
  // Deepfake Titel
  fill(255,100,100);
  textFont(headline);
  textSize(cachedValues.textSizeHeadline);
  text('Deepfake', cachedValues.titelDeepfakeX, cachedValues.titelDeepfakeY);
  
  // Definition
  textFont(fließtext);
  textSize(cachedValues.textSizeFließtext);
  textLeading(cachedValues.textLeading);
  text('A deepfake is a piece of media - such as a photo,audio or video,that has been altered\n generated or falsified using artificial intelligence (AI)techniques, to convincingly replace\none persons face or voice.\nAs a result, it creates people and events that do not exist or that did not actually occur.\n\nOver time, the definition of the term deepfake has evolved.\nWhereas in 2017 and 2018 it was applied exclusively to visual media explicitly created\nby "Deepfake AI" by 2022 the term had come to be used to describe images and videos\nthat had been eiter obviously or allegedly falsified by any form of artificial intelligence.',
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
    text('2%', windowWidth/2.985, windowWidth/3.95);
    textSize(cachedValues.labelSize);
    text('non pornographic', windowWidth/2.985, windowWidth/3.7);
    textSize(cachedValues.smallTextSize);
    push();
    textLeading(windowWidth / 90,);
    text('Political, entertainment,\nfraud and scams, fake news\nand false information.', windowWidth/2.982, windowWidth/3.55);
    pop();
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('98%', windowWidth/2.97, windowWidth/2.45);
    textFont(fließtext);
    textSize(windowWidth/69);
    push(); 
    textLeading(windowWidth / 58,);
    text('non consensual\npornography', windowWidth/2.97, windowWidth/2.35);
    pop();
  }
  
  // Diagramm 2 Texte (Konsens)
  if(showDiagram2 && diagram2_2_percent_clicked) {
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('35%', windowWidth/1.2378, windowWidth/3.185);
    textSize(windowWidth/69);
    text('public figures', windowWidth/1.2375, windowWidth/3.025);
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('65%', windowWidth/1.236, windowWidth/2.363);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('ordinary people', windowWidth/1.236, windowWidth/2.270);
  }
  
  // Diagramm 3 Texte (Geschlecht)
  if(showDiagram3 && diagram3_1_percent_clicked) {
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('1%', windowWidth/1.402, windowWidth/12.364532);
    textSize(windowWidth/66.985319);
    text('are male', windowWidth/1.403, windowWidth/10.25);
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('99%', windowWidth/1.408, windowWidth/5.05);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are female', windowWidth/1.408, windowWidth/4.65);
  }
}

// Diagramm 1
function drawPiechartone() {
  let segmente = [];
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
  
  // Unsichtbare Hitbox-Bögen zeichnen
  noStroke();
  noFill();
  for (let i = 0; i < segmente.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, segmente[i].start, segmente[i].ende, PIE);
  }
  
  // Hover-Segment ermitteln
  let hoverSegment = getHoverSegment(d.arcX, d.arcY, d.arcS, segmente, d.rotation);

  push();
  scale(0.93);
  if (hoverSegment === 0) {
    image(kreisdiagramm1small_clicked, windowWidth/41.833333-windowWidth/16, windowWidth/10.4, windowWidth, neueHoehe);
  } 
  else if (hoverSegment === 1) {
    image(kreisdiagramm1big_clicked, windowWidth/41.833333-windowWidth/16, windowWidth/10.4, windowWidth, neueHoehe);
  } 
  else {
    image(kreisdiagramm1, windowWidth/41.833333-windowWidth/16, windowWidth/10.4, windowWidth, neueHoehe);
  }
  
  pop();
}

// Diagramm 2
function drawPiecharttwo() {
  let segmente = [];
  let werte = [0.35, 0.65];
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
  
  noStroke();  
  noFill();    
  for (let i = 0; i < segmente.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, segmente[i].start, segmente[i].ende, PIE);
  }
  
  let hoverSegment = getHoverSegment(d.arcX, d.arcY, d.arcS, segmente, d.rotation);
  
  push();
  scale(0.93);
  
  if (hoverSegment === 0) {
    image(kreisdiagramm2small_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else if (hoverSegment === 1) {
    image(kreisdiagramm2big_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else {
    image(kreisdiagramm2, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  }
  
  pop();
}

// Diagramm 3
function drawPiechartthree() {
  let segmente = [];
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

  noStroke();
  noFill();
  for (let i = 0; i < segmente.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, segmente[i].start, segmente[i].ende, PIE);
  }
  
  let hoverSegment = getHoverSegment(d.arcX, d.arcY, d.arcS, segmente, d.rotation);

  push();
  scale(0.93);
  
  if (hoverSegment === 0) {
    image(kreisdiagramm3small_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else if (hoverSegment === 1) {
    image(kreisdiagramm3big_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else {
    image(kreisdiagramm3, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  }
  
  pop();
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
    }
  }
  
  // Diagramm 2
  if(showDiagram2) {
    let segmente2 = [];
    let werte2 = [0.35,0.65];
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
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 6);
  updateCachedValues();
}