let graph;
let font;
let cam;

let k;
let restLen;
let mass;
let maxDistGeneration;
let separationRadio;
let separationRatio;
let maxSteeringForce;
let frictionC;

async function setup() {
    createCanvas(1200, 1000, WEBGL);

    font = await loadFont('assets/Roboto_Condensed-Regular.ttf');
    cam = createEasyCam();

    let nodes = 300;

    sliderK = createSlider(0,1,0.3,0.1);
    sliderK.position(100,20);
    sliderK.size(100);
    sliderRL = createSlider(0,100,20,5);
    sliderRL.position(100,60);
    sliderRL.size(100);
    sliderMass = createSlider(0,50,10,5);
    sliderMass.position(100,100);
    sliderMass.size(100);
    sliderSepRadio = createSlider(0,500,100,10);
    sliderSepRadio.position(100,140);
    sliderSepRadio.size(100);
    sliderSepRatio = createSlider(0,150,60,5);
    sliderSepRatio.position(100,180);
    sliderSepRatio.size(100);
    sliderMSteeringF = createSlider(0,100,100,5);
    sliderMSteeringF.position(100,220);
    sliderMSteeringF.size(100);
    sliderFrictionC = createSlider(0,3,0.5,0.1);
    sliderFrictionC.position(100,260);
    sliderFrictionC.size(100);
    sliderMDG = createSlider(0,1000,100,50);
    sliderMDG.position(100,390);
    sliderMDG.size(100);
    sliderNodes = createSlider(0,500,300,50);
    sliderNodes.position(100,350);
    sliderNodes.size(100);

    resetBTN = createButton('Reset with slider changes');
    resetBTN.position(100, 410);
    resetBTN.mousePressed(reset);

    k = sliderK.value();
    restLen = sliderRL.value();
    mass = sliderMass.value();
    maxDistGeneration = sliderMDG.value();
    separationRadio = sliderSepRadio.value();
    separationRatio = sliderSepRatio.value();
    maxSteeringForce = sliderMSteeringF.value();
    frictionC = sliderFrictionC.value();

    //k,restLen,mass,maxDistGeneration,SR,SRT,MSF,FC
    graph = new Graph(k,restLen,mass,maxDistGeneration,separationRadio,separationRatio,maxSteeringForce,frictionC);
    graph.createGraph(nodes);
}

function reset(){
    maxDistGeneration = sliderMDG.value();
    graph.maxDistGeneration = maxDistGeneration;
    graph.createGraph(sliderNodes.value());
}

function drawText(){
    fill(255);
    stroke(1);
    stroke(255)

    textFont(font);
    textSize(20)
    text("K slider: "+str(sliderK.value()),60,20);
    text("RestLen slider: "+str(sliderRL.value()),60,60);
    text("Mass slider: "+str(sliderMass.value()),60,100);
    text("Sepration Radio slider: "+str(sliderSepRadio.value()),60,140);
    text("Sepration Ratio slider: "+str(sliderSepRatio.value()),60,180);
    text("Max Steering Force slider: "+str(sliderMSteeringF.value()),60,220);
    text("Friction C slider: "+str(sliderFrictionC.value()),60,260);
    text("Friction C slider: "+str(sliderFrictionC.value()),60,300);
    text("Funcionan despues de resetear",60,330);
    text("Nodes: "+str(sliderNodes.value()),60,350);
    text("Distance generation radio: "+str(sliderMDG.value()),60,390);
}

function draw() {
    background(0);
    orbitControl();

    if(k != sliderK.value()){
        k = sliderK.value();
        graph.changeK(sliderK.value());
    }
    if(restLen != sliderRL.value()){
        restLen = sliderRL.value();
        graph.changeRestLen(sliderRL.value());
    }
    if(mass != sliderMass.value()){
        mass = sliderMass.value();
        graph.changeMass(sliderMass.value());
    }
    if(separationRadio != sliderSepRadio.value()){
        separationRadio = sliderSepRadio.value()
        graph.changeSR(sliderSepRadio.value());
    }
    if(separationRatio != sliderSepRatio.value()){
        separationRatio = sliderSepRatio.value();
        graph.changeSRT(sliderSepRatio.value());
    }
    if(maxSteeringForce != sliderMSteeringF){
        maxSteeringForce = sliderMSteeringF.value();
        graph.changeMaxSteeringForce(sliderMSteeringF.value());
    }
    if(frictionC != sliderFrictionC){
        frictionC = sliderFrictionC.value();
        graph.changeFriction(sliderFrictionC.value());
    }

    graph.update();
    graph.display();

    cam.beginHUD();
    drawText();
    cam.endHUD();
}
