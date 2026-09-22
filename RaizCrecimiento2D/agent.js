class Agent {
    constructor(xLimit,yLimit,x=random(0,xLimit),y=random (0,yLimit)){
        this.xLimit = xLimit;
        this.yLimit = yLimit;
        this.pos = createVector(x,y);
        this.color = color(random(0,255),random(0,255),random(0,255))
        this.r = 5;
    }

    collide(agent){
        let distance = p5.Vector.sub(this.pos,agent.pos);
        return (distance.mag() < this.r+agent.r);
    }

    moveNextTo(agent){
        let diference = p5.Vector.sub(agent.pos,this.pos);
        diference.setMag(diference.mag()-this.r-agent.r);
        this.pos.add(diference);
    }

    setColor(dist){
        this.color = color(map(dist,0,this.xLimit/2,0,255),0,map(dist,0,this.yLimit/2,255,0));
    }

    draw(){
        push();
        translate(0,0);
        fill(this.color);
        noStroke();
        circle(this.pos.x, this.pos.y, this.r*2);
        pop();
    }
}