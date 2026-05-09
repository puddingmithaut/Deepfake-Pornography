//hallo test

//Hintergrund
let testseite

//Fonts
let headline;
let fließtext;



function preload(){

testseite= loadImage('assets/testseite.jpg')
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
  let bildBreite = testseite.width;
  let bildHoehe = testseite.height;
  let scaleFaktor = width / bildBreite;
  let neueHoehe = bildHoehe * scaleFaktor;
  image(testseite, 0, 0, width, neueHoehe);
  pop();

//text seite eins

//headline
fill(255,80,255);
textFont(headline);
textSize(windowHeight/9.5);
text('Deepfake', windowWidth/24.9, windowHeight/6.4);

//definition
textFont(fließtext);
textSize(windowWidth/85.8);
textLeading(windowWidth/71.6);
text('Deepfake is a form of artificial intelligence (AI)\nthat can be used to create compelling images,\nsounds and video.\nAs a result, it creates people and events that\ndo not exist or that did not actually occur.',
windowWidth/23, windowHeight/ 4.6); 

//diagramm eins

textFont(headline);
textSize(windowHeight/23.4);
text('Deepfake Videos', windowWidth/25.7, windowHeight/2.2)



//diagramm zwei

//diagramm drei


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

  let arcX = windowWidth/6.6;
  let arcY = windowHeight/1.375;
  let arcS = windowWidth/4.5;
  
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
   let farben = [color(255, 0, 0, 100),
   color(0, 255, 0, 150),
  ];
  let werte = [0.01, 0.99];

  let arcX = windowWidth/1.45 ;
  let arcY = windowHeight/1.302;
  let arcS = windowWidth/5;
  
  let rotation= HALF_PI/2.07;
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
    let farben = [color(255, 0, 0, 100),
   color(0, 255, 0, 150),
  ];
  let werte = [0.02, 0.98];


  let arcX = windowWidth/1.62;
  let arcY = windowHeight/3.2;
  let arcS = windowWidth/5;
  let rotation= HALF_PI/1.258;
  
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