let total = 100;
let array = [];

function setup() {
    createCanvas(800, 600);
    array = Array(total).fill(0);
}

function draw() {
    background(0);
    noStroke();
    for(let i=0;i<10;i++){
        generateNumbers();
    }
    drawBars();
}

function generateNumbers(){
    let r1,r2,p;
    do {
        r1 = random(1);
        //lineal
        //p = r1;
        //exponencial
        //p = r1**2;
        //log
        //p = Math.log(r1*5+1);
        //hyperbolic
        p = 0.1 / r1;
        r2 = random(1);
    }while(r2>=p);

    const index = floor(r1*total);
    if(index >= 0 && index < total) array[index]++;
}

function drawBars(){
    const w = width/total;
    for(let i = 0; i<total; i++){
        fill(i*2+55,100,255-i*2+55);
        x = w*i;
        rect(x,height, w, -array[i]);
    }
}
