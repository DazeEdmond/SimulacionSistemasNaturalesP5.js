let ss = [];
let agents = []
let lastAgent = null;

function setup() {
    slider1 = createSlider(0,100,0);
    slider1.position(width/2,height/2);
    slider1.size(100);
    createCanvas(800, 600);
}

function draw() {
    background(0);

    for(let s of ss){
        s.update();
        s.display();
    }
}

function mousePressed(){
    if(mouseButton.left){
        let a1 = new Agente(mouseX,mouseY,5);
        a2.pos = p5.Vector.add(a1.pos,p5.Vector.sub(a1.pos,a2.pos).setMag(70));

        ss.push(new Spring(a1,a2,0.01,50));
    }
}