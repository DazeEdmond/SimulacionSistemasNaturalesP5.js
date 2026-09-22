let a;
let xSize = 800;
let ySize = 800;
let zSize = 800;

function setup() {
    createCanvas(xSize, ySize);
    let center = new Agent(xSize,ySize,400,400);
    center.setColor(0);
    a = [];
    a.push(center);
}

function draw() {
    background(0);

    if(mouseIsPressed && mouseButton.left){
        let agent;
        let flag;
        do{
            agent = new Agent(xSize,ySize);
            flag = false;
            for(i of a){
                flag = i.collide(agent);
                if(flag) break;
            }
        }while(flag);

        let closest = a[0];
        let cDist = p5.Vector.sub(agent.pos,closest.pos).mag();
        for(i of a){
            let nCDist = p5.Vector.sub(agent.pos,i.pos).mag();
            if(nCDist<cDist) {
                closest = i;
                cDist = nCDist;
            }
        }
        agent.moveNextTo(closest);
        agent.setColor(p5.Vector.sub(agent.pos,a[0].pos).mag());
        
        a.push(agent);
    }

    for (let i of a){
        i.draw();
    }

    for (let i of a){
        i.r = i.r+0.01;
    }
}
