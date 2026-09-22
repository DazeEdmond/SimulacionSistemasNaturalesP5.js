let camera;

let walkers;
let walker;

function setup() {
    createCanvas(1080,1080,WEBGL);

    createEasyCam();

    walkers = [];

}

function draw() {
    background(0);
    lights();
    
    for (let w of walkers){
        w.draw();
        w.update();
    }
    if(mouseIsPressed && mouseButton.left){
        walkers.push(new Walker(0,0,0));
        console.log(randomGaussian());
    }
    /*
    walker.draw();
    walker.update();
    */
}
