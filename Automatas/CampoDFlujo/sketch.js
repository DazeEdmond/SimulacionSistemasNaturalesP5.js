let xSize = 1500;
let ySize = 1000;
let ags;
let grid;
// var img;

async function setup() {
    createCanvas(xSize, ySize);
    ags = [];
    grid = new FlowField(xSize,ySize,20,5);
    // img = await loadImage("monokuma.png")

    //Desactivar menu click derecho
    for(let element of document.getElementsByClassName("p5Canvas")){
        element.addEventListener("contextmenu",(e)=>e.preventDefault());
    }
}

function draw() {
    background(0,0,0,20);

    if(mouseIsPressed && mouseButton.left){
        ags.push(Agente.createRandomDir(mouseX,mouseY,100));
    }
    for(a of ags){
        // a.follow(createVector(width/2,height/2),15);
        let dist = p5.Vector.sub(a.pos,createVector(mouseX,mouseY)).mag();
        // if(dist <=200){
            // a.follow(createVector(mouseX,mouseY),45);
        // }
        // a.addGrav(createVector(0,1));
        // a.arrive(createVector(mouseX,mouseY));
        // a.applyFriction(0.8);
        a.addForce(grid.getVector(a.pos.x,a.pos.y))
        a.update();
        a.display();
    }
    // grid.display();

}

