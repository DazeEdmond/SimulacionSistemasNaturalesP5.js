const lilstep = 0.009;
let pstart = 0;
const multsize = 150;

let lastHigh=[];
let actHigh=[];

let agents = [];
let grav;

function setup() {
    createCanvas(800, 600);
    grav = createVector(0,0.9);
    for(let i = 0;i<width;i+=5){
        lastHigh[i] = 0;
        actHigh[i] = 0;
    }
}

function draw() {
    background(0);
    //Perlin noise
    let nx = pstart;
    //Avanza el noise como si la onda avanzara
    let ny = frameCount/600;
    lastHigh = actHigh.slice();
    for(let i = 0;i<width;i+=5){
        //Genera el crazy noisy bizarre town
        let n = (noise(nx,ny)*multsize)+height/2;
        //Cambia la altura de la onda en la posicion y dependiendo de cual punto en x sea
        ny += lilstep;
        fill(200,0,200,50);
        noStroke();
        rect(i, n, 5, height-n);
        actHigh[i/5] = n;
    }
    //Avanza el noise como si la onda cambiara
    pstart+=lilstep/100;

    //Agregar agentes()
    if(mouseIsPressed && mouseButton.left){
        agents.push(new agent2D(mouseX,mouseY,randomGaussian(100,10)));
    }

    //Renderizar agentes
    for(let a of agents){
        a.applyGrav(grav);
        a.setColorOpacity(1000);
        a.applyFric(5);
        if(a.pos.y>actHigh[floor(a.pos.x/5)]){
            a.setColorOpacity(60);
            //Aplica drag
            a.applyDrag(5);
            //Aplica corriente a la marea
            a.applyForce(createVector(-10,0));
            //Si la marea sube aplica una pequeña fuerza hacia arriba
            // if(actHigh[floor(a.pos.x/5)]>lastHigh[floor(a.pos.x/5)]){
            //     a.applyGrav(createVector(0,-1));
            // }
        }

        a.update();
        if(a.isDead()){
            let index = agents.indexOf(a);
            agents.splice(index,1);
            continue;
        }
        a.draw();
    }
}