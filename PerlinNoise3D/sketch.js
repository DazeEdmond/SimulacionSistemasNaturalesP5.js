let MSize = 20;
let SizeMult = 200;
let matrix = [];

let lilStep= 0.05;
let nchange = 0.0001;
let pstart= 0;

function setup() {
    createCanvas(800, 600, WEBGL);
    for(let i=0;i<MSize;i++){
        matrix[i] = []
        for(let j=0;j<MSize;j++){
            matrix[i][j] = 0
        }
    }
}

function draw() {
    background(0);
    orbitControl();

    let nx = pstart;
    let nz = frameCount/700;
    for(let i=0;i<MSize;i++){
        let ny = 0;
        for(let j=0;j<MSize;j++){
            let v = noise(nx, ny,nz);
            ny += lilStep;
            matrix[i][j] = v*SizeMult;
        }
        nx += lilStep;
        pstart+=nchange;
    }

    for(let x=0;x<MSize-1;x++){
        for(let y=0;y<MSize-1;y++){
            let maxVValue = max(matrix[x][y],matrix[x][y+1]);
            maxVValue = max(matrix[x+1][y],maxVValue);
            maxVValue /= SizeMult;
            let R = map(maxVValue,0.2,0.8,255,0);
            let B = map(maxVValue,0.2,0.8,0,255);
            fill(R,0,B);
            beginShape();
            vertex(x*10, matrix[x][y], y*10)
            vertex(x*10, matrix[x][y+1], (y+1)*10)
            vertex((x+1)*10, matrix[x+1][y], y*10)
            vertex(x*10, matrix[x][y], y*10)
            endShape();
            maxVValue = max(matrix[x][y+1],matrix[x+1][y+1]);
            maxVValue = max(matrix[x+1][y],maxVValue);
            maxVValue /= SizeMult;
            R = map(maxVValue,0.2,0.8,255,0);
            B = map(maxVValue,0.2,0.8,0,255);
            fill(R,0,B);
            beginShape();
            vertex(x*10, matrix[x][y+1], (y+1)*10)
            vertex((x+1)*10, matrix[x+1][y+1], (y+1)*10)
            vertex((x+1)*10, matrix[x+1][y], y*10)
            vertex(x*10, matrix[x][y+1], (y+1)*10)
            endShape();
        }
    }
}
