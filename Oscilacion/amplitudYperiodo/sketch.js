let amplitud = 10;
let period;
let periody;
let start = 0;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    period = 10;
    periody = 5;
    background(0,0,0,20);
    stroke(255,255,0);
    strokeWeight(5);

    //Onda 1
    stroke(255,0,0);
    amplitud+=15;
    for(let i=0;i<width;i+=3){
        point(i, height/2-200+amplitud*sin((i+start)/period));
    }
    stroke(0,0,255);
    point(width/2+amplitud*sin((start)/period),height/2-250);

    //Onda 2
    amplitud-=15;
    stroke(255,255,0);
    period = 6;
    periody = 2;
    for(let i=width;i>=0;i-=3){
        point(i, height/2-100+amplitud*sin((i-start)/period));
    }
    stroke(0,255,255);
    point(width/2+amplitud*sin((start)/period),height/2-140+amplitud*sin((start)/periody));

    //Onda 3
    amplitud+=15;
    stroke(255,0,255);
    period = 60;
    periody = 10;
    for(let i=0;i<width;i+=3){
        point(i, height/2+amplitud*sin((i+start)/period));
    }
    stroke(255,255,255);
    point(width/2+amplitud*sin((start)/period),height/2+50+amplitud*sin((start)/periody));

    //Onda 4
    amplitud-=15;
    stroke(0,255,255);
    period = 10;
    periody = 30;
    for(let i=width;i>=0;i-=3){
        point(i, height/2+100+amplitud*sin((i-start)/period));
    }
    stroke(255,0,255);
    point(width/2+amplitud*sin((start)/period),height/2+140+amplitud*sin((start)/periody));

    //Onda 5
    amplitud+=15;
    stroke(0,0,255);
    period = 10;
    periody = 5;
    for(let i=0;i<width;i+=3){
        point(i, height/2+200+amplitud*sin((i+start)/period));
    }
    stroke(255,0,0);
    point(width/2+amplitud*sin((start)/period),height/2+250+amplitud*sin((start)/periody));

    start += 1;
    amplitud-=15;
}
