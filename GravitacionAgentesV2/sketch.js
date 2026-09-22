let xSize = 1500;
let ySize = 1000;
let atractors;
let as;

function setup() {
    createCanvas(xSize, ySize);
    as = [];
    atractors = [];

    //Desactivar menu click derecho
    for(let element of document.getElementsByClassName("p5Canvas")){
        element.addEventListener("contextmenu",(e)=>e.preventDefault());
    }
}

function draw() {
    background(0,0,0,40);

    // as.gravitationalForce();
    for(let a of as){
        // a.applyFriction(0.1);
        a.update(frameCount%5==0);
    }
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

function mousePressed(){
    if(mouseButton.left){
        NAG = new AgentSystem2D(mouseX,mouseY,0.1,1000,0.1);
        NAG.setAtractors(atractors);
        as.push(NAG);
    }

    if(mouseButton.right){
        let size = random(1,1000);
        let atractor = new Atractor(mouseX,mouseY,size);
        atractors.push(atractor);
        for(let a of as){
            a.addAtractor(atractor);
        }
    }
    
    if(mouseButton.center){
        let size = random(1,1000);
        let atractor = new Atractor(mouseX,mouseY,size,true);
        atractors.push(atractor);
        for(let a of as){
            a.addAtractor(atractor);
        }
    }
}