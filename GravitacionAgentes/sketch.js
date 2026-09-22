let xSize = 1500;
let ySize = 1000;
let as;

function setup() {
    createCanvas(xSize, ySize);
    as = new AgentSystem2D(width/2,height/2,0.1);
}

function draw() {
    background(0,0,0, 90);

    if(mouseIsPressed){
        as.addAgent(mouseX,mouseY,randomGaussian(10,1));   
    }
    if(keyIsDown('x')){
        as.addAgent(mouseX,mouseY,randomGaussian(5000,5));
    }

    as.gravitationalForce();
    as.applyFriction(0.1);
    as.update();

    // for(a of ags){
    //     // a.follow(createVector(width/2,height/2),15);
    //     let dist = p5.Vector.sub(a.pos,createVector(mouseX,mouseY)).mag();
    //     if(dist <=200){
    //         a.follow(createVector(mouseX,mouseY),45);
    //     }
    //     // a.addGrav(createVector(0,1));
    //     a.applyFriction(0.8);
    //     a.update();
    //     a.display();
    // }
}