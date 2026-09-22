let limit = 1000;

let agents = [];

let force = 7;
let forcey = 7;
let forcez = 7;

let slower = 0.8;

function setup() {
    createCanvas(1000, 800,WEBGL);
}

function draw() {
    orbitControl()
    background(0);
    
    
    if(mouseIsPressed && mouseButton.left){
        agents.push(new agent3D(random(limit/3,limit-limit/3),random(limit/3,limit-limit/3),random(limit/3,limit-limit/3),10,limit));
        agents.push(new agent3D(random(limit/3,limit-limit/3),random(limit/3,limit-limit/3),random(limit/3,limit-limit/3),10,limit));
        agents.push(new agent3D(random(limit/3,limit-limit/3),random(limit/3,limit-limit/3),random(limit/3,limit-limit/3),10,limit));
    }

    for(let a of agents){
        a.update();

        //Cuadrante 1
        if(a.pos.x <limit/2 && a.pos.y <limit/2 && a.pos.z < limit/2){
            a.applyForce(createVector(0,forcey*slower,0));
            a.applyForce(createVector(force,0,0));
        }
        //Cuadrante 2
        if(a.pos.x >=limit/2 && a.pos.y <limit/2 && a.pos.z < limit/2){
            a.applyForce(createVector(-force*slower,0,0));
            a.applyForce(createVector(0,forcey,0));
        }
        //Cuadrante 3
        if(a.pos.x >=limit/2 && a.pos.y >=limit/2 && a.pos.z < limit/2){
            a.applyForce(createVector(0,-forcey*slower,0));
            a.applyForce(createVector(0,0,forcez));
        }
        //Cuadrante 4
        if(a.pos.x >=limit/2 && a.pos.y >=limit/2 && a.pos.z >= limit/2){
            a.applyForce(createVector(0,0,-forcez*slower));
            a.applyForce(createVector(0,-forcey,0));
        }
        //Cuadrante 5
        if(a.pos.x >=limit/2 && a.pos.y <limit/2 && a.pos.z >= limit/2){
            a.applyForce(createVector(0,forcey*slower,0));
            a.applyForce(createVector(-force,0,0));
        }
        //Cuadrante 6
        if(a.pos.x <limit/2 && a.pos.y <limit/2 && a.pos.z >= limit/2){
            a.applyForce(createVector(force*slower,0,0));
            a.applyForce(createVector(0,forcey,0));
        }
        //Cuadrante 7
        if(a.pos.x <limit/2 && a.pos.y >=limit/2 && a.pos.z >= limit/2){
            a.applyForce(createVector(0,-forcey*slower,0));
            a.applyForce(createVector(0,0,-forcez));
        }
        //Cuadrante 8
        if(a.pos.x <limit/2 && a.pos.y >=limit/2 && a.pos.z < limit/2){
            a.applyForce(createVector(0,0,forcez*slower));
            a.applyForce(createVector(0,-forcey,0));
        }

        // a.follow(createVector(limit/2,limit/2,limit/2),40);
        // a.applyFric(0.6);
        a.display();
    }

    fill(200,200,200,10);
    noStroke();
    push();
    translate(limit/2, limit/2, limit/2);
    box(limit);
    pop();
}