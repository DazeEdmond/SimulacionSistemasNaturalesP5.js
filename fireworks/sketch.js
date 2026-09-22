let fs;

function setup() {
    createCanvas(1000, 1000,WEBGL);
    fs = new FireworkSystem(createVector(0,0.1,0),0.4,0.2,200);
    noStroke();
}

function draw() {
    orbitControl();
    background(0);

    fs.update();

    push();
    fill(100);
    translate(100, 10, 100);
    box(200, 10, 200);
    pop();
}

function mousePressed(){
    if(mouseButton.left){
        fs.addFirework();
    }
}
