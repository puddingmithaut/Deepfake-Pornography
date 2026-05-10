//hallo test

//Hintergrund
let test

//Fonts
let headline;
let fließtext;



function preload(){

test= loadImage('assets/hintergrundskizze.jpg')
headline= loadFont("assets/Avenir Heavy.ttf")
fließtext= loadFont("assets/Avenir Regular.ttf")


}


function setup() {
  createCanvas(windowWidth,windowHeight*6);
  background(47, 45, 45);

}





function draw() {

 ///Hintergrund Sketch///    

  push();
  scale(0.93);
  let bildBreite = test.width;
  let bildHoehe = test.height;
  let scaleFaktor = windowWidth / bildBreite;
  let neueHoehe = bildHoehe * scaleFaktor;
  image(test, windowWidth/40, 0, windowWidth, neueHoehe);
  pop();

//text seite eins


let fontmittel= windowWidth/28.8;


headline
fill(255,80,255);
textFont(headline);
textSize(windowWidth/22.979);
text('Deepfake', windowWidth/15.72,windowWidth/19.160305);


//definition
textFont(fließtext);
textSize(21.8457);
textLeading(windowWidth/96);
text('A deepfake is a piece of media - such as a photo,\naudio or video, that has been altered, generated\nor falsified using artificial intelligence (AI) \ntechniques, to convincingly replace one person’s \nface or voice. As a result, it creates people and \nevents that´do not exist or that did not actually \noccur.',
windowWidth/14.940476, windowWidth/11.331828); 

//diagramm eins

textFont(headline);
textSize(windowHeight/35);
text('Deepfake Videos', windowWidth/15.3 , windowHeight/2.22)

textFont(fließtext); 
textSize(fontmittel);
text('2%', windowWidth/2.985,windowWidth/3.93);



//diagramm zwei

textFont(fließtext);
textSize(fontmittel);
text('2%',windowWidth/1.4014517, windowWidth/12.364532);

//diagramm drei

textFont(fließtext); 
textSize(fontmittel);
text('1%', windowWidth/1.2855947,windowWidth/3.0120349);

drawPiechartone();
drawPiecharttwo();
drawPiechartthree();


}

function drawPiechartone() {

  let segmente = []; 
  let farben = [color(255, 0, 0, 100),
   color(0, 255, 0, 150),
  ];
  let werte = [0.02, 0.98];

  let arcX = windowWidth/5.5;
  let arcY = windowHeight/1.375;
  let arcS = windowWidth/4.3;
  
  let rotation=  HALF_PI/1.57;
  let startwinkel = -rotation
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
    let angepassterMausWinkel = (mausWinkel + rotation) % TWO_PI;
  
    for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + rotation;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + rotation;
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
  let farben = [color(255, 0, 0, 50),
   color(0, 255, 0, 50),
  ];
  let werte = [0.01, 0.99];

  let arcX = windowWidth/1.46 ;
  let arcY = windowHeight/1.39;
  let arcS = windowWidth/4.8;
  
  let rotation= HALF_PI/2.1;
  let startwinkel = -rotation
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
  let angepassterMausWinkel = (mausWinkel + rotation) % TWO_PI;
  
  for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + rotation;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + rotation;
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
    let farben = [color(255, 0, 0, 50),
   color(0, 255, 0, 50),
  ];
  let werte = [0.02, 0.98];


  let arcX = windowWidth/1.69;
  let arcY = windowHeight/3.4;
  let arcS = windowWidth/4.8;
  let rotation= HALF_PI/1.24;
  
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
    let angepassterMausWinkel = (mausWinkel + rotation) % TWO_PI;
  
    for (let i = 0; i < segmente.length; i++) {
    let start = segmente[i].start + rotation;
    if (start < 0) start += TWO_PI;
    let ende = segmente[i].ende + rotation;
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