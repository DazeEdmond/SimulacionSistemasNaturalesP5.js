let xSize = 1000;
let ySize = 1000;
let ags;
let segment;

async function setup() {
    createCanvas(xSize, ySize);
    ags = [];
    segment = new Segment(createVector(0,0),createVector(width,height),50)
    //Desactivar menu click derecho
    for(let element of document.getElementsByClassName("p5Canvas")){
        element.addEventListener("contextmenu",(e)=>e.preventDefault());
    }
}

function draw() {
    background(0,0,0);

    if(mouseIsPressed && mouseButton.left){
        ags.push(Agente.createRandomDir(mouseX,mouseY,100));
    }
    for(a of ags){
        a.followSegment(segment);
        a.update();
        a.display();
    }
    segment.display();

}

