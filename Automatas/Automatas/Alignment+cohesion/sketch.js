let agent;

function setup() {
    createCanvas(1000, 800);
    background(0);
    agent = new AgentSystem2D(0,0,1,1,1);
}

function draw() {
    background(0);

    agent.update();
    // agent.align();
    agent.cohere();
    agent.separate();
    // agent.manada();

    if(mouseIsPressed && mouseButton.left) agent.addAgent();
}