let c;
let agente;
let gravity;

function setup() {
    createCanvas(800, 600,WEBGL);
    c = [];
    gravity = createVector(0,2,0);
}

function draw() {
    orbitControl();
    background(50);

    rotateY(millis()/2000)
    rotateX(millis()/2000)

    for (let i of c){
        i.update();
        i.draw();
    }
    if(mouseIsPressed && mouseButton.left){
        c.push(new Agent3D(200));
    }

    if (keyIsDown(DOWN_ARROW)) {
        for (let i of c){
            i.addForce(createVector(0,2,0));
        }
    }
    if (keyIsDown(UP_ARROW)) {
        for (let i of c){
            i.addForce(createVector(0,-2,0));
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
        for (let i of c){
            i.addForce(createVector(-2,0,0));
        }
    }
    if (keyIsDown(RIGHT_ARROW)) {
        for (let i of c){
            i.addForce(createVector(2,0,0));
        }
    }

    push();
    translate(0, 0, 0);
    fill(100,100,100,50);
    strokeWeight(5);
    box(400,400,400);
    pop();

}
