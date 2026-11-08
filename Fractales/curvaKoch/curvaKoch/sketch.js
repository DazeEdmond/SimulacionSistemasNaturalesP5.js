let ang = 0;
let turtle;
function setup() {
    createCanvas(1000, 800);
    background(0);
    turtle = new Turtle(createVector(width/2,height/5),true);
    angleMode(DEGREES);
}
function draw() {
    // turtle.forward(10);
    // turtle.turnRight(PI/8+(ang-=0.001%(2*PI)));
    koch(400);
    turtle.turnRight(120);
    kochAux(400);
    turtle.turnRight(120);
    kochAux(400);
    turtle.turnRight(120);
    kochAux(400);
    noLoop();
}

function kochAux(tam){
    if(tam < 2){
        turtle.forward(tam);
        return;
    }
    kochAux(tam/3);
    turtle.turnLeft(60);
    kochAux(tam/3);
    turtle.turnRight(120);
    kochAux(tam/3);
    turtle.turnLeft(60);
    kochAux(tam/3);
}
function koch(tam){
    turtle.penUp();
    turtle.forward(-tam/2);
    turtle.penDown();
    kochAux(tam);
}