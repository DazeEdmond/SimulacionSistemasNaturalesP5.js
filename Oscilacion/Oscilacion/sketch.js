let as = []
let R = 0;

function setup() {
    createCanvas(800, 600,WEBGL);
}

function draw() {
    let v = map(sin(frameCount * 0.001),-1,1,-1,1)
    R+=0.5
    orbitControl()
    background(50);

    as.push(new Agente(100,100,100,randomGaussian(100,20)))

    for(let a of as){
        if(a.isDead()){
            let i = as.indexOf(a);
            as.splice(i,1);
            continue;
        }
        a.massLoss(0.3);
        a.update()
        a.display()
    }

    

    // fill(200,200,200,50)
    
    push()
    translate(100,100,100)
    strokeWeight(0.5)
    rotateY(R)
    rotateZ(0.3)
    stroke(0,100,255)
    line(0,-1000,0,0,1000,0)    
    fill(200)
    stroke(0)
    strokeWeight(0.2)
    sphere(50)
    noStroke()
    pop()
}

// function mousePressed(){
//     if(mouseButton.left){
//         as.push(new Agente(random(200),random(200),random(200),randomGaussian(100,20)))
//     }
// }