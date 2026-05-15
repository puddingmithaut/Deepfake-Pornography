let test;
let headline;
let fließtext;

let pfeil;
let pfeil1;
let pfeil2;
let pfeil3;
let pfeil4;
let pfeil5;

// ========== PFEIL-ANIMATION VARIABLEN ==========
let arrowFrames = [];           // Array für die Pfeil-Bilder
let aktuellerArrowFrame = 0;    // Aktueller Frame der Animation
let letzteArrowAktualisierung = 0;
let arrowAnimationAktiv = false; // Ob die Animation gerade läuft
let arrowFrameWechselIntervall = 50; // Wechsel alle 50ms (20 fps)
let animationEinmalAbgespielt = false;
let arrowSichtbar = false;      // NEU: Steuert ob die Animation überhaupt sichtbar ist
let arrowX, arrowY;
let arrowWidth = 200;
let arrowHeight = 200;
// ==============================================

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

// Status für Diagramm 2 (Konsens - 35% public figures, 65% ordinary people)
let diagram2_2_percent_clicked = false;
let diagram2_98_percent_clicked = false;

// Status für Diagramm 3 (Geschlecht - 1% male, 99% female)
let diagram3_1_percent_clicked = false;
let diagram3_99_percent_clicked = false;

// Status für Sichtbarkeit der Diagramme
let showDiagram1 = false;
let showDiagram2 = false;
let showDiagram3 = false;

// Status für Diagramm 1 beide geklickt
let diagram1BothClicked = false;

// Delay-Variablen
let diagram1BothClickedTime = 0;  // Zeitpunkt, wann beide Segmente geklickt wurden
let diagramsDelaySeconds = 10;     // 10 Sekunden bis Diagramme erscheinen

// Cache für berechnete Werte
let cachedValues = {};

// Cache für Diagramm-Segmente
let cachedSegments1 = null;
let cachedSegments2 = null;
let cachedSegments3 = null;

// Cache für Hover-Status (für mouseMoved Optimierung)
let lastMouseX = -1;
let lastMouseY = -1;
let currentHoverSegment1 = -1;
let currentHoverSegment2 = -1;
let currentHoverSegment3 = -1;

function preload() {
  test = loadImage('assets/hintergrundskizze.jpg');
  headline = loadFont("assets/Avenir Heavy.ttf");
  fließtext = loadFont("assets/Avenir Regular.ttf");

  pfeil = loadImage("assets/3a.webp");
  pfeil1 = loadImage("assets/4a.webp");
  pfeil2 = loadImage("assets/1a.webp");
  pfeil3 = loadImage("assets/2a.webp");
  pfeil4 = loadImage("assets/5a.webp");
  pfeil5 = loadImage("assets/6a.webp");

  kreisdiagramm3= loadImage("assets/kreisdiagramme/Diagram 3 a.webp");
  kreisdiagramm3big_clicked= loadImage("assets/kreisdiagramme/Diagram 3 big pie piece clicked a.webp");
  kreisdiagramm3small_clicked= loadImage("assets/kreisdiagramme/Diagram 3 little pie piece clicked a.webp");

  kreisdiagramm1= loadImage("assets/kreisdiagramme/Diagram 1 purple no clicked.webp");
  kreisdiagramm1big_clicked= loadImage("assets/kreisdiagramme/Diagram 1 big pie piece clicked.webp");
  kreisdiagramm1small_clicked= loadImage("assets/kreisdiagramme/Diagram 1 little pie piece clicked.webp");

  kreisdiagramm2 = loadImage("assets/kreisdiagramme/button2.webp");
  kreisdiagramm2small_clicked = loadImage("assets/kreisdiagramme/Diagram 2 little pie piece clicked.webp");
  kreisdiagramm2big_clicked= loadImage("assets/kreisdiagramme/Diagram 2 big pie piece clicked.webp");

  // ===== PFEIL-ANIMATION LADEN =====
  for (let i = 1; i <= 14; i++) {
    arrowFrames[i-1] = loadImage(`assets/Arrows/Arrow1-${i}.png`);
  }
  // DEBUG: Prüfen ob Bilder geladen wurden
  console.log("Anzahl geladene Pfeil-Bilder:", arrowFrames.length);
  for (let i = 0; i < arrowFrames.length; i++) {
    console.log(`Bild ${i+1} geladen:`, arrowFrames[i] ? "Ja" : "Nein");
  
  // ================================
}
}

function setup() {
  createCanvas(windowWidth, windowHeight * 6);
  updateCachedValues();
  frameRate(30); // Reduziert die Framerate für bessere Performance
  
  // ===== PFEIL-ANIMATION POSITION =====
  arrowX = windowWidth / 41.833333;
  arrowY =0;  // Passe die Y-Position nach Bedarf an
  // =================================
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
  
  // Segmente zurücksetzen, da sich Positionen geändert haben
  cachedSegments1 = null;
  cachedSegments2 = null;
  cachedSegments3 = null;
}

function draw() {
  background(47, 45, 45);

  // Diagramm 1 erscheint sofort
  if (!showDiagram1) {
    showDiagram1 = true;
  }
  
  // Prüfen ob beide Segmente in Diagramm 1 geklickt wurden
  if (diagram1_2_percent_clicked && diagram1_98_percent_clicked && !diagram1BothClicked) {
    diagram1BothClicked = true;
    diagram1BothClickedTime = millis();  // Zeitpunkt speichern
    //startePfeilAnimation();  // <-- Animation starten
  }
  
  // Prüfen ob das Delay vorbei ist und Diagramme noch nicht angezeigt werden
  if (diagram1BothClicked && !showDiagram2 && !showDiagram3) {
    let elapsedSinceBothClicked = (millis() - diagram1BothClickedTime) / 1000;
    if (elapsedSinceBothClicked >= diagramsDelaySeconds) {
      showDiagram2 = true;  // Diagramm 2 erscheint nach 10 Sekunden
      showDiagram3 = true;  // Diagramm 3 erscheint nach 10 Sekunden
    }
  }
  
  // Zeichnen der Diagramme
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
  
  // ===== PFEIL-ANIMATION ZEICHNEN =====
  // Nur zeichnen wenn arrowSichtbar true ist
  if (arrowSichtbar && arrowFrames.length > 0) {
    // Wenn Animation aktiv ist, frames durchlaufen
    if (arrowAnimationAktiv) {
      if (millis() > letzteArrowAktualisierung + arrowFrameWechselIntervall) {
        if (aktuellerArrowFrame < arrowFrames.length - 1) {
          aktuellerArrowFrame++;
          letzteArrowAktualisierung = millis();
        } else {
          // Am letzten Frame angekommen - Animation deaktivieren aber Bild behalten
          arrowAnimationAktiv = false;
        }
      }
    }
    
    // Zeige immer den aktuellen Frame (auch wenn Animation vorbei ist)
    push();
    scale(0.93);
    image(arrowFrames[aktuellerArrowFrame], arrowX, arrowY, windowWidth, neueHoehe);
    pop();
  }
  // ==================================
}

function drawStaticElements() {
  // Diagramm 1 - Bedingte Pfeile basierend auf Klicks
  if(showDiagram1 && diagram1_2_percent_clicked) {
    drawScaledImage(pfeil, windowWidth/40.48387);
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

// Hilfsfunktion für skalierte Bilder
function drawScaledImage(img, xOffset = windowWidth/41.833333, yOffset = 0) {
  push();
  scale(0.93);
  image(img, xOffset, yOffset, windowWidth, neueHoehe);
  pop();
}

// ===== PFEIL-ANIMATION STARTER =====
function startePfeilAnimation() {
  if (!arrowAnimationAktiv && !animationEinmalAbgespielt) {
    arrowSichtbar = true;  // Animation sichtbar machen
    arrowAnimationAktiv = true;
    aktuellerArrowFrame = 0;
    letzteArrowAktualisierung = millis();
    console.log("Pfeil-Animation gestartet!");
  }
}
// ==================================


function drawTexts() {
  // Deepfake Titel
  fill(255);
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
    textLeading(windowWidth / 90);
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
    textLeading(windowWidth / 58);
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

// Optimierte Funktion für Diagramm 1
function drawPiechartone() {
  let werte = [0.02, 0.98];
  let d = cachedValues.diagram1;
  
  // Segmente nur einmal berechnen (caching)
  if (cachedSegments1 === null) {
    cachedSegments1 = [];
    let startwinkel = -d.rotation;
    for (let i = 0; i < werte.length; i++) {
      let winkel = werte[i] * TWO_PI;
      cachedSegments1.push({
        start: startwinkel,
        ende: startwinkel + winkel,
        wert: werte[i],
      });
      startwinkel += winkel;
    }
  }
  
  // Unsichtbare Hitbox-Bögen zeichnen
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments1.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments1[i].start, cachedSegments1[i].ende, PIE);
  }
  
  push();
  scale(0.93);
  if (currentHoverSegment1 === 0) {
    image(kreisdiagramm1small_clicked, windowWidth/41.833333-windowWidth/16, windowWidth/10.4, windowWidth, neueHoehe);
  } 
  else if (currentHoverSegment1 === 1) {
    image(kreisdiagramm1big_clicked, windowWidth/41.833333-windowWidth/16, windowWidth/10.4, windowWidth, neueHoehe);
  } 
  else {
    image(kreisdiagramm1, windowWidth/41.833333-windowWidth/16, windowWidth/10.4, windowWidth, neueHoehe);
  }
  pop();
}

// Optimierte Funktion für Diagramm 2
function drawPiecharttwo() {
  let werte = [0.35, 0.65];
  let d = cachedValues.diagram2;
  
  // Segmente nur einmal berechnen (caching)
  if (cachedSegments2 === null) {
    cachedSegments2 = [];
    let startwinkel = -d.rotation;
    for (let i = 0; i < werte.length; i++) {
      let winkel = werte[i] * TWO_PI;
      cachedSegments2.push({
        start: startwinkel,
        ende: startwinkel + winkel,
        wert: werte[i],
      });
      startwinkel += winkel;
    }
  }
  
  // Unsichtbare Hitbox-Bögen zeichnen
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments2.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments2[i].start, cachedSegments2[i].ende, PIE);
  }
  
  push();
  scale(0.93);
  
  if (currentHoverSegment2 === 0) {
    image(kreisdiagramm2small_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else if (currentHoverSegment2 === 1) {
    image(kreisdiagramm2big_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else {
    image(kreisdiagramm2, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  }
  pop();
}

// Optimierte Funktion für Diagramm 3
function drawPiechartthree() {
  let werte = [0.03, 0.97];
  let d = cachedValues.diagram3;
  
  // Segmente nur einmal berechnen (caching)
  if (cachedSegments3 === null) {
    cachedSegments3 = [];
    let startwinkel = -d.rotation;
    for (let i = 0; i < werte.length; i++) {
      let winkel = werte[i] * TWO_PI;
      cachedSegments3.push({
        start: startwinkel,
        ende: startwinkel + winkel,
        wert: werte[i],
      });
      startwinkel += winkel;
    }
  }
  
  // Unsichtbare Hitbox-Bögen zeichnen
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments3.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments3[i].start, cachedSegments3[i].ende, PIE);
  }
  
  push();
  scale(0.93);
  
  if (currentHoverSegment3 === 0) {
    image(kreisdiagramm3small_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else if (currentHoverSegment3 === 1) {
    image(kreisdiagramm3big_clicked, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  } 
  else {
    image(kreisdiagramm3, windowWidth/41.833333, 0, windowWidth, neueHoehe);
  }
  pop();
}

// Optimierte Hover-Erkennung
function getHoverSegment(arcX, arcY, arcS, segmente, rotation) {
  // Schnelle Distanzprüfung
  let dx = mouseX - arcX;
  let dy = mouseY - arcY;
  let abstand = sqrt(dx*dx + dy*dy);
  
  if (abstand > arcS / 2) {
    return -1;
  }
  
  // Winkelberechnung
  let mausWinkel = atan2(dy, dx);
  if (mausWinkel < 0) mausWinkel += TWO_PI;
  
  // Rotation anwenden
  let angepassterMausWinkel = mausWinkel + rotation;
  if (angepassterMausWinkel >= TWO_PI) angepassterMausWinkel -= TWO_PI;
  
  // Optimierte Schleife
  for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + rotation;
    let ende = segmente[i].ende + rotation;
    
    // Normalisierung ohne while-Schleifen
    start = start % TWO_PI;
    if (start < 0) start += TWO_PI;
    ende = ende % TWO_PI;
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

// Mausbewegung nur bei tatsächlicher Bewegung verarbeiten
function mouseMoved() {
  // Nur bei tatsächlicher Mausbewegung neu berechnen
  if (mouseX === lastMouseX && mouseY === lastMouseY) return;
  
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  
  // Hover für Diagramm 1 berechnen
  if (showDiagram1 && cachedSegments1) {
    let d1 = cachedValues.diagram1;
    currentHoverSegment1 = getHoverSegment(d1.arcX, d1.arcY, d1.arcS, cachedSegments1, d1.rotation);
  } else {
    currentHoverSegment1 = -1;
  }
  
  // Hover für Diagramm 2 berechnen
  if (showDiagram2 && cachedSegments2) {
    let d2 = cachedValues.diagram2;
    currentHoverSegment2 = getHoverSegment(d2.arcX, d2.arcY, d2.arcS, cachedSegments2, d2.rotation);
  } else {
    currentHoverSegment2 = -1;
  }
  
  // Hover für Diagramm 3 berechnen
  if (showDiagram3 && cachedSegments3) {
    let d3 = cachedValues.diagram3;
    currentHoverSegment3 = getHoverSegment(d3.arcX, d3.arcY, d3.arcS, cachedSegments3, d3.rotation);
  } else {
    currentHoverSegment3 = -1;
  }
}

function mousePressed() {
  // Diagramm 1
  if(showDiagram1 && cachedSegments1) {
    let d1 = cachedValues.diagram1;
    let hoverSegment1 = getHoverSegment(d1.arcX, d1.arcY, d1.arcS, cachedSegments1, d1.rotation);
    
    if (hoverSegment1 === 0 && !diagram1_2_percent_clicked) {
      diagram1_2_percent_clicked = true;
    }
    
    // Wenn das 98% Segment (Index 1) geklickt wird, starte die Animation
    if (hoverSegment1 === 1 && !diagram1_98_percent_clicked) {
      diagram1_98_percent_clicked = true;
      // Animation starten und sichtbar machen
      startePfeilAnimation();
    }
  }
  
  // Diagramm 2
  if(showDiagram2 && cachedSegments2) {
    let d2 = cachedValues.diagram2;
    let hoverSegment2 = getHoverSegment(d2.arcX, d2.arcY, d2.arcS, cachedSegments2, d2.rotation);
    
    if (hoverSegment2 === 0 && !diagram2_2_percent_clicked) {
      diagram2_2_percent_clicked = true;
    }
    
    if (hoverSegment2 === 1 && !diagram2_98_percent_clicked) {
      diagram2_98_percent_clicked = true;
    }
  }
  
  // Diagramm 3
  if(showDiagram3 && cachedSegments3) {
    let d3 = cachedValues.diagram3;
    let hoverSegment3 = getHoverSegment(d3.arcX, d3.arcY, d3.arcS, cachedSegments3, d3.rotation);
    
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