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


let fontmittel= windowWidth/32;


headline
fill(255,80,255);
textFont(headline);
textSize(windowWidth/22.979);
text('Deepfake', windowWidth/15.72,windowWidth/19.160305);
//textSize(109.2285);
//text('Deepfake', 160,131);


//definition
//textFont(fließtext);
//textSize(windowWidth/86.021505);
//textLeading(windowWidth/71.6);
//text('Deepfake is a form of artificial intelligence (AI)\nthat can be used to create compelling images,\nsounds and video. As a result, it creates people\nand events that do not exist or that did not\nactually occur.',
//windowWidth/22.71, windowHeight/ 4.522); 

//diagramm eins

//textFont(headline);
//textSize(windowHeight/29.1);
//text('Deepfake Videos', windowWidth/23.25 , windowHeight/2.12)

//textFont(fließtext); 
//textSize(fontmittel);
//text('2%', windowWidth/3.385,windowWidth/3.77);



//diagramm zwei

//textFont(fließtext);
//textSize(fontmittel);
//text('2%',windowWidth/1.3456678, windowWidth/13.973929);

//diagramm drei

//textFont(fließtext); 
//textSize(fontmittel);
//text('1%', windowWidth/1.2855947,windowWidth/3.0120349);

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