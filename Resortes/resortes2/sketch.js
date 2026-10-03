let agents = []
let springs = [];
let grav;

let lastAgent = null;

function setup() {
    createCanvas(800, 600);

    sliderK = createSlider(0,2,0.8,0.01);
    sliderK.position(0,0);
    sliderK.size(100);
    sliderRL = createSlider(1,500,40,1);
    sliderRL.position(0,20);
    sliderRL.size(100);
    sliderM = createSlider(1,500,50,1);
    sliderM.position(0,40);
    sliderM.size(100);
    sliderG = createSlider(0.0001,0.1,0.0007,0.0001);
    sliderG.position(0,60);
    sliderG.size(100);

    grav = createVector(0,0.0007);
    for(let element of document.getElementsByClassName("p5Canvas")){
        element.addEventListener("contextmenu",(e)=>e.preventDefault());
    }

    for(let x=0;x<=height;x+=100){
        let as = [];
        for(let y=0;y<=width;y+=100){
            as.push(new Agente(y,x,2));
        }
        agents.push(as);
    }
    agents.at(0).at(0).attached = true;
    agents.at(0).at(-1).attached = true;
    // agents.at(-1).at(0).attached = true;
    // agents.at(-1).at(-1).attached = true;

    for(let x=0;x<agents.length;x++){
        let row = agents.at(x);
        for(let y=0;y<row.length-1;y++){
            springs.push(new Spring(agents.at(x).at(y),agents.at(x).at(y+1),0.8,20));
            if(x!=0){
                springs.push(new Spring(agents.at(x).at(y),agents.at(x-1).at(y),0.8,20));
            }
        }
        if(x!=0){
            springs.push(new Spring(agents.at(x).at(-1),agents.at(x-1).at(-1),0.8,20));
        }
    }
}

function draw() {
    background(0);
    grav = createVector(0,sliderG.value());
    for(let l of agents){
        for(let a of l){
            a.mass = sliderM.value();
            a.r = sqrt(a.mass/PI)*10;
            a.addGrav(grav);
            // a.update();
            // a.display();
        }
    }    

    for(let s of springs){
        s.k = sliderK.value();
        s.restLen = sliderRL.value();
        s.update();
        s.display();
    }
}

// function mousePressed(){
//     if(mouseButton.left){
//         let a1 = new Agente(mouseX,mouseY,5);
//         agents.push(a1);
//         if(agents.length <= 1) return;
//         ss.push(new Spring(lastAgent,a1,0.01,50));
//         lastAgent = a1
//     }
// }