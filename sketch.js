let test;
let test2;
let headline;
let fließtext;

let pfeil;
let pfeil1;
let pfeil2;
let pfeil3;
let pfeil4;
let pfeil5;

// ========== PFEIL-ANIMATION VARIABLEN ==========
let arrowFrames = [];          
let aktuellerArrowFrame = 0;    
let letzteArrowAktualisierung = 0;
let arrowAnimationAktiv = false; 
let arrowFrameWechselIntervall = 50; 
let animationEinmalAbgespielt = false;
let arrowSichtbar = false;      
let animationStartZeit = 0;      
let animationStartVerzoegerung = 2500; 
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

// Status für Diagramme
let diagram1_2_percent_clicked = false;
let diagram1_98_percent_clicked = false;
let diagram2_2_percent_clicked = false;
let diagram2_98_percent_clicked = false;
let diagram3_1_percent_clicked = false;
let diagram3_99_percent_clicked = false;

// ========== VARIABLEN FÜR TEXT-EINBLENDUNGEN ==========
let textOpacity1_2 = 0;
let textOpacity1_98 = 0;
let textOpacity2_2 = 0;
let textOpacity2_98 = 0;
let textOpacity3_1 = 0;
let textOpacity3_99 = 0;

let textFadeSpeed = 8; // Geschwindigkeit Einblendung
// =========================================================

let showDiagram1 = false;
let showDiagram2 = false;
let showDiagram3 = false;
let animationAbgeschlossen = false;

// Cache für berechnete Werte
let cachedValues = {};
let cachedSegments1 = null;
let cachedSegments2 = null;
let cachedSegments3 = null;

// Hover-Status
let currentHoverSegment1 = -1;
let currentHoverSegment2 = -1;
let currentHoverSegment3 = -1;

// Canvas-skalierungsfaktor
let canvasScale = 0.93;
let baseX = 0;
let baseY = 0;

function preload() {
  test = loadImage('assets/hintergrundskizze.jpg');
  test2= loadImage('assets/hintergrundskizze2.png');
  headline = loadFont("assets/Avenir Heavy.ttf");
  fließtext = loadFont("assets/Avenir Regular.ttf");

  pfeil = loadImage("assets/3a.webp");
  pfeil1 = loadImage("assets/4a.webp");
  pfeil2 = loadImage("assets/1a.webp");
  pfeil3 = loadImage("assets/2a.webp");
  pfeil4 = loadImage("assets/5a.webp");
  pfeil5 = loadImage("assets/6a.webp");

  kreisdiagramm3 = loadImage("assets/kreisdiagramme/Diagram 3 a.webp");
  kreisdiagramm3big_clicked = loadImage("assets/kreisdiagramme/Diagram 3 big pie piece clicked a.webp");
  kreisdiagramm3small_clicked = loadImage("assets/kreisdiagramme/Diagram 3 little pie piece clicked a.webp");

  kreisdiagramm1 = loadImage("assets/kreisdiagramme/Diagram 1 purple no clicked.webp");
  kreisdiagramm1big_clicked = loadImage("assets/kreisdiagramme/Diagram 1 big pie piece clicked.webp");
  kreisdiagramm1small_clicked = loadImage("assets/kreisdiagramme/Diagram 1 little pie piece clicked.webp");

  kreisdiagramm2 = loadImage("assets/kreisdiagramme/button2.webp");
  kreisdiagramm2small_clicked = loadImage("assets/kreisdiagramme/Diagram 2 little pie piece clicked.webp");
  kreisdiagramm2big_clicked = loadImage("assets/kreisdiagramme/Diagram 2 big pie piece clicked.webp");

  // Pfeil-Animation laden
  for (let i = 1; i <= 12; i++) {
    arrowFrames[i-1] = loadImage(`assets/Arrows/arrows${i}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight * 6);
  updateCachedValues();
  frameRate(30);
  pixelDensity(1);
}

function updateCachedValues() {
  let bildBreite = test.width;
  let bildHoehe = test.height;
  let scaleFaktor = windowWidth / bildBreite;
  let neueHoehe = bildHoehe * scaleFaktor;
  
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
    neueHoehe: neueHoehe,
    scaleFaktor: scaleFaktor,
    diagram1: {
      arcX: windowWidth / 7,
      arcY: windowWidth / 2.4,
      arcS: windowWidth / 2.886044,
      rotation: HALF_PI / 1.525,
      imgX: windowWidth / 41.833333 - windowWidth/16,
      imgY: windowWidth / 10.4
    },
    diagram2: {
      arcX: windowWidth / 1.46,
      arcY: windowWidth / 2.73,
      arcS: windowWidth / 4.8,
      rotation: 2.85 * PI / 4,
      imgX: windowWidth / 41.833333,
      imgY: 0
    },
    diagram3: {
      arcX: windowWidth / 1.69,
      arcY: windowWidth / 6.6,
      arcS: windowWidth / 4.8,
      rotation: HALF_PI / 1.87,
      imgX: windowWidth / 41.833333,
      imgY: 0
    },
    pfeilX: windowWidth / 41.833333,
    pfeilX2: windowWidth / 38,
    pfeilX3: windowWidth / 39.841269,
    arrowX: windowWidth / 41.833333
  };
  
  cachedSegments1 = null;
  cachedSegments2 = null;
  cachedSegments3 = null;
}

function draw() {
  background(47, 45, 45);

  //=================SEITE 1=========================//
  if (!showDiagram1) showDiagram1 = true;
  
  if (animationEinmalAbgespielt && !animationAbgeschlossen) {
    animationAbgeschlossen = true;
    showDiagram2 = true;
    showDiagram3 = true;
  }
  
  if (!arrowAnimationAktiv && !animationEinmalAbgespielt && animationStartZeit > 0) {
    if (millis() - animationStartZeit >= animationStartVerzoegerung) {
      starteAnimationJetzt();
    }
  }
  
  // Skalierung für alle Bilder einmal anwenden
  push();
  scale(canvasScale);
  
  // Diagramme zeichnen
  if (showDiagram1) drawPiechartone();
  if (showDiagram2) drawPiecharttwo();
  if (showDiagram3) drawPiechartthree();
  
  // Pfeile zeichnen
  drawStaticElements();
  
  // Pfeil-Animation zeichnen
  drawArrowAnimation();
  
  pop();
  
  // Texte werden NICHT skaliert (bleiben lesbar)
  drawTexts();
  
  // Text-Transparenzen aktualisieren
  updateTextOpacities();
  drawpage2();

}

function updateTextOpacities() {
  // Diagramm 1 - 2%
  if (diagram1_2_percent_clicked && textOpacity1_2 < 255) {
    textOpacity1_2 = min(255, textOpacity1_2 + textFadeSpeed);
  }
  
  // Diagramm 1 - 98%
  if (diagram1_98_percent_clicked && textOpacity1_98 < 255) {
    textOpacity1_98 = min(255, textOpacity1_98 + textFadeSpeed);
  }
  
  // Diagramm 2 - 35%
  if (diagram2_2_percent_clicked && textOpacity2_2 < 255) {
    textOpacity2_2 = min(255, textOpacity2_2 + textFadeSpeed);
  }
  
  // Diagramm 2 - 65%
  if (diagram2_98_percent_clicked && textOpacity2_98 < 255) {
    textOpacity2_98 = min(255, textOpacity2_98 + textFadeSpeed);
  }
  
  // Diagramm 3 - 1%
  if (diagram3_1_percent_clicked && textOpacity3_1 < 255) {
    textOpacity3_1 = min(255, textOpacity3_1 + textFadeSpeed);
  }
  
  // Diagramm 3 - 99%
  if (diagram3_99_percent_clicked && textOpacity3_99 < 255) {
    textOpacity3_99 = min(255, textOpacity3_99 + textFadeSpeed);
  }
}

function drawArrowAnimation() {
  if (arrowSichtbar && arrowFrames.length > 0) {
    if (arrowAnimationAktiv) {
      if (millis() > letzteArrowAktualisierung + arrowFrameWechselIntervall) {
        if (aktuellerArrowFrame < arrowFrames.length - 1) {
          aktuellerArrowFrame++;
          letzteArrowAktualisierung = millis();
        } else {
          arrowAnimationAktiv = false;
          animationEinmalAbgespielt = true;
        }
      }
    }
    image(arrowFrames[aktuellerArrowFrame], cachedValues.arrowX, 0, windowWidth, cachedValues.neueHoehe);
  }
}

function drawStaticElements() {
  // Diagramm 1 Pfeile
  if(showDiagram1 && diagram1_2_percent_clicked) {
    image(pfeil, cachedValues.pfeilX, 0, windowWidth, cachedValues.neueHoehe);
  }
  if(showDiagram1 && diagram1_98_percent_clicked) {
    image(pfeil1, cachedValues.pfeilX2, 0, windowWidth, cachedValues.neueHoehe);
  }

  // Diagramm 2 Pfeile
  if(showDiagram2 && diagram2_2_percent_clicked) {
    image(pfeil4, cachedValues.pfeilX3, 0, windowWidth, cachedValues.neueHoehe);
  }
  if(showDiagram2 && diagram2_98_percent_clicked) {
    image(pfeil5, cachedValues.pfeilX3, 0, windowWidth, cachedValues.neueHoehe);
  }

  // Diagramm 3 Pfeile
  if(showDiagram3 && diagram3_1_percent_clicked) {
    image(pfeil2, cachedValues.pfeilX3, 0, windowWidth, cachedValues.neueHoehe);
  }
  if(showDiagram3 && diagram3_99_percent_clicked) {
    image(pfeil3, cachedValues.pfeilX3, 0, windowWidth, cachedValues.neueHoehe);
  }
}

function drawTexts() {

  //SEITE 1
  fill(255);
  
  // Deepfake Titel
  textFont(headline);
  textSize(cachedValues.textSizeHeadline);
  text('Deepfake', cachedValues.titelDeepfakeX, cachedValues.titelDeepfakeY);
  
  // Definition
  textFont(fließtext);
  textSize(cachedValues.textSizeFließtext);
  textLeading(cachedValues.textLeading);
  text('A deepfake is a piece of media - such as a photo,audio or video,that has been altered\n generated or falsified using artificial intelligence (AI)techniques, to convincingly replace\none persons face or voice.\nAs a result, it creates people and events that do not exist or that did not actually occur.\n\nOver time, the definition of the term deepfake has evolved.\nWhereas in 2017 and 2018 it was applied exclusively to visual media explicitly created\nby "Deepfake AI" by 2022 the term had come to be used to describe images and videos\nthat had been eiter obviously or allegedly falsified by any form of artificial intelligence.',
  cachedValues.definitionX, cachedValues.definitionY);
  
  // Diagramm 1 Texte
  if(showDiagram1) {
    textFont(headline);
    textSize(cachedValues.diagramTitelSize);
    text('Deepfake Videos', windowWidth/31, cachedValues.diagram1TitelY);
  }
  
  if(showDiagram1 && diagram1_2_percent_clicked) {
    push();
    fill(255, textOpacity1_2);
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
    pop();
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    push();
    fill(255, textOpacity1_98);
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('98%', windowWidth/2.97, windowWidth/2.45);
    textFont(fließtext);
    textSize(windowWidth/69);
    push(); 
    textLeading(windowWidth / 58);
    text('non consensual\npornography', windowWidth/2.97, windowWidth/2.35);
    pop();
    pop();
  }
  
  // Diagramm 2 Texte
  if(showDiagram2 && diagram2_2_percent_clicked) {
    push();
    fill(255, textOpacity2_2);
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('35%', windowWidth/1.2378, windowWidth/3.185);
    textSize(windowWidth/69);
    text('public figures', windowWidth/1.2375, windowWidth/3.025);
    pop();
  }
  
  if(showDiagram2 && diagram2_98_percent_clicked) {
    push();
    fill(255, textOpacity2_98);
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('65%', windowWidth/1.236, windowWidth/2.363);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('ordinary people', windowWidth/1.236, windowWidth/2.270);
    pop();
  }
  
  // Diagramm 3 Texte
  if(showDiagram3 && diagram3_1_percent_clicked) {
    push();
    fill(255, textOpacity3_1);
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('1%', windowWidth/1.402, windowWidth/12.364532);
    textSize(windowWidth/66.985319);
    text('are male', windowWidth/1.403, windowWidth/10.25);
    pop();
  }
  
  if(showDiagram3 && diagram3_99_percent_clicked) {
    push();
    fill(255, textOpacity3_99);
    textFont(headline);
    textSize(cachedValues.headlinePercentSize);
    text('99%', windowWidth/1.408, windowWidth/5.05);
    textFont(fließtext);
    textSize(windowWidth/69);
    text('are female', windowWidth/1.408, windowWidth/4.65);
    pop();




  //SEITE 2



  }
}

function drawPiechartone() {
  let d = cachedValues.diagram1;
  
  // Hitbox-Bögen (unsichtbar für Hover)
  if (!cachedSegments1) {
    let werte = [0.02, 0.98];
    cachedSegments1 = [];
    let startwinkel = -d.rotation;
    for (let i = 0; i < werte.length; i++) {
      let winkel = werte[i] * TWO_PI;
      cachedSegments1.push({
        start: startwinkel,
        ende: startwinkel + winkel,
      });
      startwinkel += winkel;
    }
  }
  
  // Unsichtbare Hitbox
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments1.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments1[i].start, cachedSegments1[i].ende, PIE);
  }
  
  // Bild basierend auf Hover
  if (currentHoverSegment1 === 0) {
    image(kreisdiagramm1small_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else if (currentHoverSegment1 === 1) {
    image(kreisdiagramm1big_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else {
    image(kreisdiagramm1, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  }
}

function drawPiecharttwo() {
  let d = cachedValues.diagram2;
  
  if (!cachedSegments2) {
    let werte = [0.35, 0.65];
    cachedSegments2 = [];
    let startwinkel = -d.rotation;
    for (let i = 0; i < werte.length; i++) {
      let winkel = werte[i] * TWO_PI;
      cachedSegments2.push({
        start: startwinkel,
        ende: startwinkel + winkel,
      });
      startwinkel += winkel;
    }
  }
  
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments2.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments2[i].start, cachedSegments2[i].ende, PIE);
  }
  
  if (currentHoverSegment2 === 0) {
    image(kreisdiagramm2small_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else if (currentHoverSegment2 === 1) {
    image(kreisdiagramm2big_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else {
    image(kreisdiagramm2, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  }
}

function drawPiechartthree() {
  let d = cachedValues.diagram3;
  
  if (!cachedSegments3) {
    let werte = [0.01, 0.99];
    cachedSegments3 = [];
    let startwinkel = -d.rotation;
    for (let i = 0; i < werte.length; i++) {
      let winkel = werte[i] * TWO_PI;
      cachedSegments3.push({
        start: startwinkel,
        ende: startwinkel + winkel,
      });
      startwinkel += winkel;
    }
  }
  
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments3.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments3[i].start, cachedSegments3[i].ende, PIE);
  }
  
  if (currentHoverSegment3 === 0) {
    image(kreisdiagramm3small_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else if (currentHoverSegment3 === 1) {
    image(kreisdiagramm3big_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else {
    image(kreisdiagramm3, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  }
}

function getHoverSegment(arcX, arcY, arcS, segmente, rotation) {
  let dx = mouseX - arcX;
  let dy = mouseY - arcY;
  let abstand = sqrt(dx*dx + dy*dy);
  
  if (abstand > arcS / 2) return -1;
  
  let mausWinkel = atan2(dy, dx);
  if (mausWinkel < 0) mausWinkel += TWO_PI;
  
  let angepassterMausWinkel = mausWinkel + rotation;
  if (angepassterMausWinkel >= TWO_PI) angepassterMausWinkel -= TWO_PI;
  
  for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + rotation;
    let ende = segmente[i].ende + rotation;
    
    start = start % TWO_PI;
    if (start < 0) start += TWO_PI;
    ende = ende % TWO_PI;
    if (ende < 0) ende += TWO_PI;
    
    if (start < ende) {
      if (angepassterMausWinkel >= start && angepassterMausWinkel < ende) return i;
    } else {
      if (angepassterMausWinkel >= start || angepassterMausWinkel < ende) return i;
    }
  }
  return -1;
}

function mouseMoved() {
  if (showDiagram1 && cachedSegments1) {
    let d1 = cachedValues.diagram1;
    currentHoverSegment1 = getHoverSegment(d1.arcX, d1.arcY, d1.arcS, cachedSegments1, d1.rotation);
  } else {
    currentHoverSegment1 = -1;
  }
  
  if (showDiagram2 && cachedSegments2) {
    let d2 = cachedValues.diagram2;
    currentHoverSegment2 = getHoverSegment(d2.arcX, d2.arcY, d2.arcS, cachedSegments2, d2.rotation);
  } else {
    currentHoverSegment2 = -1;
  }
  
  if (showDiagram3 && cachedSegments3) {
    let d3 = cachedValues.diagram3;
    currentHoverSegment3 = getHoverSegment(d3.arcX, d3.arcY, d3.arcS, cachedSegments3, d3.rotation);
  } else {
    currentHoverSegment3 = -1;
  }
}

function mousePressed() {
  if(showDiagram1 && cachedSegments1) {
    let d1 = cachedValues.diagram1;
    let hoverSegment1 = getHoverSegment(d1.arcX, d1.arcY, d1.arcS, cachedSegments1, d1.rotation);
    
    if (hoverSegment1 === 0 && !diagram1_2_percent_clicked) {
      diagram1_2_percent_clicked = true;
    }
    
    if (hoverSegment1 === 1 && !diagram1_98_percent_clicked) {
      diagram1_98_percent_clicked = true;
      startePfeilAnimation();
    }
  }
  
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

function startePfeilAnimation() {
  if (!animationEinmalAbgespielt && !arrowAnimationAktiv) {
    animationStartZeit = millis();
  }
}

function starteAnimationJetzt() {
  arrowSichtbar = true;
  arrowAnimationAktiv = true;
  aktuellerArrowFrame = 0;
  letzteArrowAktualisierung = millis();
}


function drawpage2(){

image(test2,windowWidth/60,1600,windowWidth, cachedValues.neueHoehe);


}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 6);
  updateCachedValues();
}


