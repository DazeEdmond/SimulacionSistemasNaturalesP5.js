let camera;

let clusters;

function setup() {
    createCanvas(1080,720,WEBGL);
    camera = createEasyCam();
    clusters = [];
    clusters.push(new Cluster(0,0,0,1000,150));
    clusters.push(new Cluster(0,0,0,1500,400));
    clusters.push(new Cluster(0,0,0,2500,1500));
}

function draw() {
    background(0);
    
    for(let c of clusters){
        c.draw();
    }
}
