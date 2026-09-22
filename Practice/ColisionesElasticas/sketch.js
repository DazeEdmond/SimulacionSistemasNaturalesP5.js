let as;
let limit = 800;
let grav;

function setup() {
    createCanvas(800, 800);
    grav = createVector(0,0.2);
    as = new AgentSystem2D(grav,0.7,limit);
}

function draw() {
    background(0);

    if(mouseIsPressed && mouseButton.left){
        as.addAgent(mouseX,mouseY);
    }

    as.update();
    as.addGrav();
}
