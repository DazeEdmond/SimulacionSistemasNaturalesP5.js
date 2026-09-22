let camera;

let circles;
let ejes = 1080;

function setup() {
    createCanvas(1080,720,WEBGL);
    camera = createEasyCam();
    camera.setCenter([540,540,540],0)
    circles = [];
}

function draw() {
    background(0);
    lights();
    
    stroke(255);
    strokeWeight(2);

    line(-ejes, ejes/2, ejes/2, ejes*2, ejes/2, ejes/2)
    line(ejes/2, -ejes, ejes/2, ejes/2, ejes*2, ejes/2)
    line(ejes/2, ejes/2, -ejes, ejes/2, ejes/2, ejes*2)
    
    for(let c of circles){
        c.draw();
    }

    if(mouseIsPressed && mouseButton.left){
        desviacion = 100;
        let x = randomGaussian(ejes/2,desviacion);
        let y = randomGaussian(ejes/2,desviacion);
        let z = randomGaussian(ejes/2,desviacion);
        circles.push(new Circle(x,y,z,10,color(255,0,0,20)));
    }
}
