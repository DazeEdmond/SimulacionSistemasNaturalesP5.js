let lilStep= 0.01;
let nchange = 0.0001;
let pstart= 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(3);
    
}

function draw() {
    background(0);
    let nx = pstart;
    let nz = frameCount/700;
    for(let x = 0; x <width;x+=20){
        let ny = 0;
        for(let y = 0; y <height;y+=20){
            let v = noise(nx, ny,nz);
            let R = map(v,0,1,0,255);
            let B = map(v,0,1,255,0);
            fill(R,0,B);
            stroke(R,0,B);
            ny += lilStep;
            square(x, y, 20);
        }
        nx += lilStep;
        pstart+=nchange;
    }
}
