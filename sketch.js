let test;
let test2;
let großerkreis;
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

// ========== SEITE 1 FADE-IN VARIABLEN ==========
let diagram1Opacity = 0;        
let diagram1FadeStart = 0;     
let diagram1FadeDauer = 500;  
let diagram1FadeAktiv = true;    
let diagram1Sichtbar = false;  
// ================================================

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

let textFadeSpeed = 8; 
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

let weißerkasten; 
let frau1;
let frau2; 
let frau3; 
let frau4;
let frau5;

let tinypeople;

let buttonWidth;
let buttonHeight;
let margin;
let startX;
let buttonY;

// ========== SEITE 2 VARIABLEN ==========
let aktuellerButton = 0; // 
let buttonHover = -1; //-1 

// Zitate für Seite 2
let zitate = [
  '"I saw that this person who was requesting to follow me, had me as their profile picture.\nSo, of course, I wanted to see what that was about. I clicked on it and I saw that the entire\naccount was full of AI videos of me in lingerie, doing sexual acts. I ended up skipping classes.\nI was scared that people would recognize me and think that it was me whenever I would go\noutside. I felt like no one was going to believe me that it wasnt me. I could not understand\nhow something like this, something that completely damages, ruins your reputation, can\'t be illegal."',
  
  '"For years, I fought against fake profiles that were circulating pornographic images featuring my face.\nThen I discovered that my husband was behind them.\nHe stole my body for years.\nHe possessed me, he thought he could make me available to other men."',
  
  '"I\'ve been stopped on the street by men asking me for oral sex, and I\'ve received comments like slut\non Instagram.\nBy using sexuality as a weapon, they make you feel like an object and attempt to humiliate you."',
  
  '"At first, my reaction was one of shame and fear. I remember walking down the street, unable to meet\nanyone\'s gaze, convinced that everyone had seen that stuff. You feel very—very—exposed.\nFor months, I withdrew into myself.\nEven today, I take a higher dose of antidepressants than I did before all of this happened."',
  
  '"My life has been overwhelmed by a wave of hatred and violence. It all started with a photo of me,\nwhich was Photoshopped, removing my clothes and adding a bare breast, transforming it into something\nthat doesnt exist. A false sexual image, yet one that bears my face. From that moment on, hell began to\nbreak loose; that photo began to circulate everywhere.\nMy dignity was trampled upon, stripped away."'
];

// ========== AUTO-RESET VARIABLEN ==========
let letzteAktivitaet = 0;
let resetVerzoegerung = 60000; // 60 Sekunden
let resetAktiv = true;
// ==========================================

// ==========================================

function preload() {
  test = loadImage('assets/Background 1.webp');
  //test2= loadImage('assets/hintergrundskizze2.jpg');
  headline = loadFont("assets/Avenir Heavy.ttf");
  fließtext = loadFont("assets/Avenir Regular.ttf");
  großerkreis= loadImage("assets/großer kreis.webp");

  pfeil = loadImage("assets/3a.webp");
  pfeil1 = loadImage("assets/4a.webp");
  pfeil2 = loadImage("assets/1a.webp");
  pfeil3 = loadImage("assets/2a.webp");
  pfeil4 = loadImage("assets/5a.webp");
  pfeil5 = loadImage("assets/6a.webp");

  kreisdiagramm3 = loadImage("assets/kreisdiagramme/Diagram 3 a.webp");
  kreisdiagramm3big_clicked = loadImage("assets/kreisdiagramme/Diagram 3 big pie piece clicked a.webp");
  kreisdiagramm3small_clicked = loadImage("assets/kreisdiagramme/Diagram 3 little pie piece clicked a.webp");

  kreisdiagramm1 = loadImage("assets/kreisdiagramme/diagram 1 purple no clicked.webp");
  kreisdiagramm1big_clicked = loadImage("assets/kreisdiagramme/Diagram 1 big pie piece clicked.webp");
  kreisdiagramm1small_clicked = loadImage("assets/kreisdiagramme/Diagram 1 little pie piece clicked.webp");

  kreisdiagramm2 = loadImage("assets/kreisdiagramme/button2.webp");
  kreisdiagramm2small_clicked = loadImage("assets/kreisdiagramme/Diagram 2 little pie piece clicked.webp");
  kreisdiagramm2big_clicked = loadImage("assets/kreisdiagramme/Diagram 2 big pie piece clicked.webp");

  //Seite 2
  weißerkasten= loadImage("seite2/weißer kasten.png");
  frau1= loadImage("seite2/woman1.webp");
  frau2= loadImage("seite2/woman2.webp");
  frau3= loadImage("seite2/woman3.webp");
  frau4= loadImage("seite2/woman4.webp");
  frau5= loadImage("seite2/woman5.webp");
  tinypeople= loadImage("seite2/tiny people.png");

  for (let i = 1; i <= 12; i++) {
    arrowFrames[i-1] = loadImage(`assets/Arrows/arrows${i}.png`);
  }
}

function resetAlles() {
  console.log("Reset wird ausgeführt...");
  
  // Diagramm-Status zurücksetzen
  diagram1_2_percent_clicked = false;
  diagram1_98_percent_clicked = false;
  diagram2_2_percent_clicked = false;
  diagram2_98_percent_clicked = false;
  diagram3_1_percent_clicked = false;
  diagram3_99_percent_clicked = false;
  
  // Text-Opacities zurücksetzen
  textOpacity1_2 = 0;
  textOpacity1_98 = 0;
  textOpacity2_2 = 0;
  textOpacity2_98 = 0;
  textOpacity3_1 = 0;
  textOpacity3_99 = 0;
  
  // Diagramm-Sichtbarkeit zurücksetzen
  showDiagram1 = false;
  showDiagram2 = false;
  showDiagram3 = false;
  animationAbgeschlossen = false;
  
  // Arrow-Animation komplett zurücksetzen (NICHT starten!)
  arrowAnimationAktiv = false;
  animationEinmalAbgespielt = false;
  arrowSichtbar = false;
  aktuellerArrowFrame = 0;
  animationStartZeit = 0;
  
  // Hover-Status zurücksetzen
  currentHoverSegment1 = -1;
  currentHoverSegment2 = -1;
  currentHoverSegment3 = -1;
  
  // Fade-In Status komplett zurücksetzen (wie beim ersten Laden)
  diagram1Opacity = 0;
  diagram1FadeAktiv = true;
  diagram1Sichtbar = false;
  diagram1FadeStart = millis() + 2000;  // Neuer Countdown startet
  
  // Seite 2 zurücksetzen
  aktuellerButton = 1;
  buttonHover = -1;
  
  // WICHTIG: KEINE startePfeilAnimation() hier!
  // Die Animation soll nur starten, wenn der Benutzer das 98% Segment klickt
  
  // Reset-Timer zurücksetzen
  letzteAktivitaet = millis();
}

function setup() {
  createCanvas(windowWidth, windowHeight * 1.98);
  updateCachedValues();
  frameRate(30);
  pixelDensity(0.8);
  aktuellerButton = 1; 
  
  diagram1FadeStart = millis() + 2000;  
  diagram1FadeAktiv = true;
  
  // Initialisiere Reset-Timer
  letzteAktivitaet = millis();
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
    definitionY: windowWidth / 11,
    diagramTitelSize: windowWidth / 68.5,
    diagram1TitelY: windowWidth / 4.35,
    percentSize: windowWidth / 28.8,
    labelSize: windowWidth / 66.755319,
    smallTextSize: windowWidth / 112,
    headlinePercentSize: windowWidth / 17.310344,
    neueHoehe: neueHoehe,
    scaleFaktor: scaleFaktor,
    buttonWidth: windowWidth/110,
    buttonHeight: windowWidth/47,
    margin: windowWidth/89,
    startX: windowWidth/4.085,
    buttonY:  windowWidth/1.048,

    diagram1: {
      arcX: windowWidth / 5.67,
      arcY: windowWidth / 2.67,
      arcS: windowWidth / 2.886044,
      rotation: HALF_PI / 1.42,
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
    pfeilX: windowWidth / 38,
    pfeilX2: windowWidth / 38,
    pfeilX3: windowWidth / 39.8,
    pfeilX3a: windowWidth / 39,
    pfeilX3b: windowWidth / 39.85,
    arrowX: windowWidth / 41.833333
  };
  
  cachedSegments1 = null;
  cachedSegments2 = null;
  cachedSegments3 = null;
}

function draw() {
  // ========== AUTO-RESET CHECK ==========
  if (resetAktiv && millis() - letzteAktivitaet >= resetVerzoegerung) {
    resetAlles();
  }
  // ======================================
  
  background(47, 45, 45);
  
  // ========== FADE-IN LOGIK DIAGRAMM 1 ==========
  if (diagram1FadeAktiv) {
    let now = millis();
    if (now >= diagram1FadeStart) {
      
      let fadeProgress = (now - diagram1FadeStart) / diagram1FadeDauer;
      if (fadeProgress >= 1.0) {
        // Fade-in abgeschlossen
        diagram1Opacity = 255;
        diagram1FadeAktiv = false;
        diagram1Sichtbar = true;
        showDiagram1 = true;
      } else {
        // Noch im Fade-in
        diagram1Opacity = fadeProgress * 255;
        diagram1Sichtbar = true;
        showDiagram1 = true;
      }
    }
  }
  // ==================================================
  
  push();
  scale(0.93);
  image(test, windowWidth/40, 0, windowWidth, cachedValues.neueHoehe);
  pop();
  push();
  scale(0.91);
  image(großerkreis,-windowWidth/3.15,windowHeight/3.70,windowWidth,cachedValues.neueHoehe);
  pop();
  
  //=================SEITE 1=========================//
  
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
  
  push();
  scale(canvasScale);
  
  if (showDiagram1) drawPiechartone();
  if (showDiagram2) drawPiecharttwo();
  if (showDiagram3) drawPiechartthree();
  
  drawStaticElements();
  
  drawArrowAnimation();
  
  pop();
  
  drawTexts();
  
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
    image(pfeil4, cachedValues.pfeilX3a, 0, windowWidth, cachedValues.neueHoehe);
  }
  if(showDiagram2 && diagram2_98_percent_clicked) {
    image(pfeil5, cachedValues.pfeilX3, 0, windowWidth, cachedValues.neueHoehe);
  }

  // Diagramm 3 Pfeile
  if(showDiagram3 && diagram3_1_percent_clicked) {
    image(pfeil2, cachedValues.pfeilX3b, 0, windowWidth, cachedValues.neueHoehe);
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
  text("A deepfake is a piece of media - such as a photo, audio or video, that has been altered,\ngenerated or falsified using generative A.I, to convincingly replace one persons face or voice.\nAs a result, it creates images of people and events that do not exist or that did not actually occur.\n\nCreating deepfake videos has become extremely easy. There are countless online apps\nand software that allow you to replace faces, lip-sync and generate images almost\nautomatically, directly from your smartphone.",
  cachedValues.definitionX, cachedValues.definitionY);
  
  // Diagramm 1 Texte (mit Opacity)
  if(showDiagram1 && diagram1Sichtbar) {
    textFont(headline);
    textSize(cachedValues.diagramTitelSize);
    push();
    fill(255, diagram1Opacity);
    text('Deepfake Videos', windowWidth/31, cachedValues.diagram1TitelY);
    pop();
  }
  
  if(showDiagram1 && diagram1_2_percent_clicked) {
    push();
    fill(255, min(textOpacity1_2, diagram1Opacity));
    textFont(fließtext);
    textSize(cachedValues.percentSize);
    text('2%', windowWidth/2.985, windowWidth/3.95);
    textSize(cachedValues.labelSize);
    text('non pornographic', windowWidth/2.985, windowWidth/3.7);
    textSize(cachedValues.smallTextSize);
    push();
    textLeading(windowWidth / 90);
    text('Political, entertainment,\nfraud and scams, fake news\nand false information.', windowWidth/2.982, windowWidth/3.5);
    pop();
    pop();
  }
  
  if(showDiagram1 && diagram1_98_percent_clicked) {
    push();
    fill(255, min(textOpacity1_98, diagram1Opacity));
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
  }
}

function drawPiechartone() {
  let d = cachedValues.diagram1;
  
  // Hitbox-Bögen 
  if (!cachedSegments1) {
    let werte = [0.03, 0.97];
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
  
  // Hitbox
  noStroke();
  noFill();
  for (let i = 0; i < cachedSegments1.length; i++) {
    arc(d.arcX, d.arcY, d.arcS, d.arcS, cachedSegments1[i].start, cachedSegments1[i].ende, PIE);
  }
  
  push();
  tint(255, diagram1Opacity);
  if (currentHoverSegment1 === 0) {
    image(kreisdiagramm1small_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else if (currentHoverSegment1 === 1) {
    image(kreisdiagramm1big_clicked, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  } else {
    image(kreisdiagramm1, d.imgX, d.imgY, windowWidth, cachedValues.neueHoehe);
  }
  noTint();
  pop();
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
  // Reset-Timer zurücksetzen bei Benutzeraktivität
  letzteAktivitaet = millis();
  
  if (showDiagram1 && cachedSegments1 && diagram1Sichtbar) {
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
  
  // ========== SEITE 2 BUTTON HOVER - KORRIGIERT ==========
  buttonHover = -1;
  for (let i = 0; i < 5; i++) {
    let buttonX = cachedValues.startX + (i * cachedValues.margin);
    if (mouseX > buttonX && 
        mouseX < buttonX + cachedValues.buttonWidth &&
        mouseY > cachedValues.buttonY && 
        mouseY < cachedValues.buttonY + cachedValues.buttonHeight) {
      buttonHover = i;
      break;
    }
  }
}

function mousePressed() {
  // Reset-Timer zurücksetzen bei Benutzeraktivität
  letzteAktivitaet = millis();
  
  if(showDiagram1 && cachedSegments1 && diagram1Sichtbar) {
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
  
  // ========== SEITE 2 BUTTON CLICKS - KORRIGIERT ==========
  for (let i = 0; i < 5; i++) {
    let buttonX = cachedValues.startX + (i * cachedValues.margin);
    if (mouseX > buttonX && 
        mouseX < buttonX + cachedValues.buttonWidth &&
        mouseY > cachedValues.buttonY && 
        mouseY < cachedValues.buttonY + cachedValues.buttonHeight) {
      aktuellerButton = i + 1; // 1-5
      console.log("Button geklickt:", aktuellerButton); // Zum Debuggen
      break;
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

function drawpage2() {

  //Buttons

  noStroke();
  for (let i = 0; i < 5; i++) {
    // Farbe ändern bei Hover
    if (buttonHover === i) {
      fill(129, 68, 86); // Hover-Farbe 
    } else {
      fill(100); // Normale Farbe 
    }
    rect(cachedValues.startX + (i * cachedValues.margin), cachedValues.buttonY, cachedValues.buttonWidth, cachedValues.buttonHeight,20);
  }

  push();
  scale(0.93);
  pop();

  fill(250);
  textFont(fließtext);
  textSize(cachedValues.textSizeFließtext);
  textLeading(cachedValues.textLeading);
  text("For years, women have faced sexual harassment. With the rise of artificial intelligence, it's only getting\nworse. Deepfakes, which use A.I. to create manipulated, but hyper-realistic images and\nvideos of real people in fake situations, are routinely used against women. Data reveals very\nstrong global growth in deepfake pornography videos, particularly those created without\nconsent. The total number of deepfakes online was projected to rise from approximately 500,000\nin 2023 to around 8 million in 2025, representing exponential global growth.Some reports\nindicate that the volume of deepfakes roughly doubles every six months.",
  windowWidth/1.935, windowWidth/1.4);

  textFont(headline);
  textSize( cachedValues.percentSize); 
  textLeading(windowWidth / 30); 
  text('Women who have been \naffected by deepfakes',
  windowWidth/1.935, windowWidth/1.55);

  ////Bilder
  push();
  scale(0.93);
  image(weißerkasten, windowWidth/25-windowWidth/15,windowWidth/1.55,windowWidth,cachedValues.neueHoehe);
  image(tinypeople,-windowWidth/18,windowWidth/1.48,windowWidth,cachedValues.neueHoehe);
  

  if (aktuellerButton === 1) {
    image(frau1, windowWidth/40-windowWidth/10, windowWidth/1.6, windowWidth, cachedValues.neueHoehe);
  } else if (aktuellerButton === 2) {
    image(frau2, windowWidth/40-windowWidth/30, windowWidth/1.55, windowWidth, cachedValues.neueHoehe);
  } else if (aktuellerButton === 3) {
    image(frau3, windowWidth/40-windowWidth/13, windowWidth/1.6, windowWidth, cachedValues.neueHoehe);
  } else if (aktuellerButton === 4) {
    image(frau4, windowWidth/40-windowWidth/20, windowWidth/1.6, windowWidth, cachedValues.neueHoehe);
  } else if (aktuellerButton === 5) {
    image(frau5, windowWidth/40-windowWidth/30, windowWidth/1.55, windowWidth, cachedValues.neueHoehe);
  }
  pop();

  ////////////ZITATE//////////////
  fill(0);
  
  let zitatIndex = aktuellerButton - 1;
  if (zitatIndex >= 0 && zitatIndex < zitate.length) {
    textFont(fließtext);
    textSize(cachedValues.textSizeFließtext);
    textLeading(cachedValues.textLeading);
    text(zitate[zitatIndex], windowWidth/4.1, windowWidth/1.14);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 2.025);
  updateCachedValues();
}