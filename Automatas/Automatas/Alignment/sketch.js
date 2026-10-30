let agent;

function setup() {
    createCanvas(800, 600);
    background(0);
    agent = new AgentSystem2D(0,0,1,1,1);
}

function draw() {
    background(0);

    agent.update();
    agent.align();
    agent.separate();

    if(mouseIsPressed && mouseButton.left) agent.addAgent();
}