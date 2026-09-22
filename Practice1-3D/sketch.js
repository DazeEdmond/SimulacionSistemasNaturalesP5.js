let c;

function setup() {
    createCanvas(800, 600,WEBGL);
    c = [];
}

function draw() {
    orbitControl();
    
    background(50);
    push();
    translate(0, 0, 0);
    strokeWeight(5);
    stroke(200,0,200,50);
    line(0,0,0,200,0,0);
    line(0,0,0,0,200,0);
    line(200,0,0,200,200,0);
    line(0,200,0,200,200,0);
    
    line(0,0,200,200,0,200);
    line(0,0,200,0,200,200);
    line(200,0,200,200,200,200);
    line(0,200,200,200,200,200);
    
    line(0,0,0,0,0,200);
    line(200,0,0,200,0,200);
    line(0,200,0,0,200,200);
    line(200,200,0,200,200,200);
    pop();
    for (let i of c){
        i.draw();
        i.update();
    }
    if(mouseIsPressed && mouseButton.left){
        c.push(new Circle(100, 100,100, random(10, 30)));
    }
}
