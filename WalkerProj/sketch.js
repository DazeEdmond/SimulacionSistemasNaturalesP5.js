let walkers;

function setup() {
    createCanvas(1080, 720);
    background(0);
    walkers = [];
}

function draw() {
    for (let w of walkers){
        w.draw();
        w.update();
    }
    if(mouseIsPressed && mouseButton.left){
        walkers.push(new Walker(mouseX, mouseY));
    }
}
