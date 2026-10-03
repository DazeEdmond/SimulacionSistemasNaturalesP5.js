let r = 100;
let ang = 0;
let phi = 0;
let theta = 0;
let pos = [];

function setup() {
    createCanvas(800, 600,WEBGL);
    background(0,0,0);
}

function draw() {
    background(0,0,0);
    orbitControl()
    let x = r*sin(theta)*sin(phi)
    let y = -r*cos(theta)
    let z = r*sin(theta)*cos(phi)
    noStroke()
    fill(255,0,255)
    
    push()
    translate(0, 0)
    strokeWeight(1)
    stroke(255)
    line(-1000,0,0,1000,0,0)
    line(0,-1000,0,0,1000,0)
    line(0,0,-1000,0,0,1000)
    noStroke()
    sphere(20)
    pop()
    
    fill(255,0,0)
    for(let p of pos){
        push()
        translate(p[0], p[1],p[2])
        sphere(20)
        pop()
    }
    if(keyIsDown("w")){
        pos.push([x,y,z])
        r+=5
    }
    if(keyIsDown("s")){
        pos.push([x,y,z])
        r-=5
    }
    if(keyIsDown("d")){
        pos.push([x,y,z])
        phi+=0.1
    }
    if(keyIsDown("a")){
        pos.push([x,y,z])
        phi-=0.1
    }
    if(keyIsDown("e")){
        pos.push([x,y,z])
        theta+=0.1
    }
    if(keyIsDown("q")){
        pos.push([x,y,z])
        theta-=0.1
    }
}
