let pstart = 0;
let nchange = 0.01;
let lilStep = 0.003;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(3);
    
}

function draw() {
    background(0,0,0,10);
    let perlinStepX = pstart;
    let perlinStepY = frameCount/700;
    stroke(255,0,0);
    for(let x = 0; x < width;x+=1){
        let loise = noise(perlinStepX,perlinStepY);
        perlinStepX += lilStep;
        let y = height*loise;
        point(x, y);
    }
    stroke(0,0,255);
    for(let x = width; x >= 0;x-=1){
        let loise = noise(perlinStepX,perlinStepY);
        perlinStepX += lilStep;
        let y = height*loise;
        point(x, y);
    }
    let psx = 0;
    let psy = frameCount/700;

    stroke(255,0,255);
    for(let x = width; x >= 0;x-=1){
        let loise = noise(psx,psy);
        psx += lilStep;
        let y = height*loise;
        point(x, y);
    }    
    pstart += nchange;
}
