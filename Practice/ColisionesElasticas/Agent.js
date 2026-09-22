class AgentSystem2D{
    constructor(g,damp,limit){
        this.agents = [];
        this.g = g;
        this.limit = limit;
        this.damp = damp;
    }
    update(){
        let index=0;
        for(let a of this.agents){
            for(let i = index+1;i<this.agents.length;i++){
                let a2=this.agents.at(i);
                this.collision(a,a2);
            }
            a.update();
            a.addGrav(grav);
            a.display();
            index++;
        }
    }
    addAgent(x,y){
        this.agents.push(new Agente(x,y,randomGaussian(200,50),this.limit,this.damp));
    }
    addGrav(){
        for(let a of this.agents){
            a.addGrav(this.g);
        }
    }
    collision(a1,a2){
        if(!a1.touch(a2)) return;

        this.separate(a1,a2);

        let a1Vel = a1.vel.copy();
        let a2Vel = a2.vel.copy();
        let Vec1;
        let Vec2;

        let op1;
        let op2;

        op1 = (a1.mass-a2.mass)/(a1.mass+a2.mass)
        op2 = (2*a2.mass)/(a1.mass+a2.mass)

        Vec1 = p5.Vector.mult(a1Vel,op1).add(p5.Vector.mult(a2Vel,op2));

        op1 = (a2.mass-a1.mass)/(a2.mass+a1.mass)
        op2 = (2*a1.mass)/(a2.mass+a1.mass)

        Vec2 = p5.Vector.mult(a2Vel,op1).add(p5.Vector.mult(a1Vel,op2));

        a1.vel = Vec1.copy();
        a2.vel = Vec2.copy();
    }

    separate(a1,a2){
        let distance = p5.Vector.sub(a2.pos,a1.pos);
        let distance2 = p5.Vector.sub(a1.pos,a2.pos);
        let separation = a1.r+a2.r-distance.mag();
        distance.setMag(separation/2);
        distance2.setMag(separation/2);
        a2.pos.add(distance);
        a1.pos.add(distance2);
    }
}

class Agente{
    constructor(x,y,mass,limit,damp,C=color(random(255),random(255),random(255))){
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0,0);
        this.mass = mass;
        this.limit = limit;
        this.color = C;
        this.r = sqrt(mass/PI);
        this.damp = damp;
    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.borders();
    }
    addGrav(g){
        this.acc.add(g);
    }
    touch(a){
        let distance = p5.Vector.sub(this.pos,a.pos).mag();
        return distance <= this.r+a.r;
    }
    borders(){
        if(this.pos.x >= this.limit-this.r || this.pos.x <= this.r){
            this.vel.x *= -this.damp;
        }
        if(this.pos.y >= this.limit-this.r || this.pos.y <= this.r){
            this.vel.y *= -this.damp;
        }
        this.pos.x = constrain(this.pos.x, this.r, this.limit-this.r);
        this.pos.y = constrain(this.pos.y, this.r,this.limit-this.r);
    }
    display(){
        fill(this.color);
        noStroke();
        circle(this.pos.x,this.pos.y,this.r*2);
    }
}