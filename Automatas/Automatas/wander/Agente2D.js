class Agente{
    constructor(x,y,mass,wr,C=color(random(255),random(255),random(255))){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.mass = mass;
        this.color = C;
        this.r = sqrt(mass/PI);
        this.wanderRadius = wr;
        this.wanderAngle = PI/2;
        this.wanderAngleNoise = random(50);
        this.wanderNoiseInc = 0.03;
        this.wanderLookAhead = p5.Vector.add(this.pos,this.vel);
        this.futureTarget = createVector(0,0);
        this.damp = 0.4;
        this.ang = random(0,2*PI);
        this.angVel = random(-0.1,0.1);
        this.angAcc = 0;
        this.maxSteeringForce = random(5,10);
        this.maxSpeed = random(1,2);
        this.arrivalDist = 100;
        this.debug = true;
    }
    static createRandomDir(x,y,mass){
        let agent = new Agente(x,y,mass,20);
        agent.vel.add(p5.Vector.random2D());
        return agent;
    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        
        this.vel.limit(this.maxSpeed);
        // this.angVel += this.angAcc
        // this.ang += this.angVel
        // this.angAcc = 0
        this.ang= this.vel.heading()

        this.wander();
        this.borders();

    }
    addAngularForce(f){
        this.angAcc += f
    }
    massLoss(m){
        this.mass -= m;
        this.r = sqrt(this.mass/PI);
    }
    isDead(){
        return this.mass<=0;
    }
    addForce(f){
        let force = p5.Vector.div(f,this.mass);
        this.acc.add(force);
    }
    addGrav(g){
        this.acc.add(g);
    }
    applyFriction(m){
        let fric = this.vel.copy();
        fric.normalize();
        fric.mult(-m);
        this.addForce(fric);
    }
    applyDrag(m){
        let drag = this.vel.copy();
        drag.mult(-m*drag.mag()**2);
        this.addForce(drag);
    }
    follow(vec,f){
        let v = p5.Vector.sub(vec,this.pos);
        v.setMag(f);
        this.addForce(v);
    }
    borders(){
        if(this.pos.x >= width-this.r || this.pos.x <= this.r){
            this.vel.x *= -this.damp;
        }
        if(this.pos.y >= height-this.r || this.pos.y <= this.r){
            this.vel.y *= -this.damp;
        }
        this.pos.x = constrain(this.pos.x, this.r, width-this.r);
        this.pos.y = constrain(this.pos.y, this.r,height-this.r);
    }
    seek(target){
        let desired = p5.Vector.sub(target,this.pos);
        let steering = p5.Vector.sub(desired,this.vel);
        steering.limit(this.maxSteeringForce);
        this.addForce(steering);
    }
    arrive(target){
        let desired = p5.Vector.sub(target,this.pos);
        let steering = p5.Vector.sub(desired,this.vel);
        steering.limit(this.maxSteeringForce);
        this.addForce(steering);
        let dist = p5.Vector.dist(this.pos,target);
        let speed = map(dist,0,this.arrivalDist,0,this.maxSpeed);
        this.vel.limit(speed);
    }
    wander(){
        this.wanderLookAhead = p5.Vector.add(this.pos,this.vel.copy().setMag(50));
        
        this.wanderAngle = map(noise(this.wanderAngleNoise),0,1,-4*PI,4*PI);
        this.wanderAngleNoise += this.wanderNoiseInc;

        let px = cos(this.wanderAngle)*this.wanderRadius+this.wanderLookAhead.x
        let py = sin(this.wanderAngle)*this.wanderRadius+this.wanderLookAhead.y
        this.futureTarget = createVector(px,py);

        this.seek(this.futureTarget);
    }
    display(){
        if(this.debug){
            
            strokeWeight(2);
            stroke(255);
            fill(0);
            circle(this.wanderLookAhead.x,this.wanderLookAhead.y,this.wanderRadius*2);
            line(this.pos.x, this.pos.y, this.wanderLookAhead.x, this.wanderLookAhead.y)
            strokeWeight(5);
            point(this.futureTarget.x,this.futureTarget.y)
        }
        fill(this.color);
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        rotate(this.ang)
        // rectMode(CENTER)
        // rect(0,0,this.r, this.r);

        beginShape();
        vertex(-this.r/3, this.r/2)
        vertex(4*this.r/3, 0)
        vertex(-this.r/3, -this.r/2)
        vertex(-this.r/3, this.r/2)
        endShape()
        // imageMode(CENTER)
        // image(img,0,0)
        pop();
    }
}