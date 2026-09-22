let c;

function setup() {
    createCanvas(800, 600);
    c = [];
}

function draw() {
    background(50);
    for (let i of c){
        i.draw();
        i.update();
    }
    if(mouseIsPressed && mouseButton.left){
        c.push(new Circle(mouseX, mouseY, random(10, 50)));
    }
}
