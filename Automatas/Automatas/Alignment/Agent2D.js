const BorderBehaviour = {
    BORDERS : "BORDERS",
    WRAP : "WRAP",
    NONE : "NONE"
}

class Agent2D {
    static drawRatio = 5;
    static img;
    constructor(x, y, mass,AR,ART) {
        this.pos = createVector(x, y);
        this.lastPos = this.pos.copy();
        this.vel = p5.Vector.random2D().mult(2);
        this.acc = createVector(0, 0);
        this.mass = mass < 0? 0 : mass;
        this.massLoss = 0;
        this.c = color(random(100, 255), 255, random(100, 255));
        this.r = sqrt(this.mass / PI) * Agent2D.drawRatio;
        this.borderBehaviour = BorderBehaviour.WRAP;
        this.borderDamp = 0.8;
        this.maxSteeringForce = 0.01;
        this.maxSpeed = 1;
        this.arrivalDist = 200;

        this.wanderLookAhead = 70;
        this.wanderRadius = 50;
        this.wanderNoiseT = random(10);
        this.wanderNoiseInc = 0.1;
        this.alignmentRadio = AR;
        this.alignmentRatio = ART;
        this.separationRadio = 100;
    }
    static createRandomVel(x, y, mass,AR,ART) {
        let agent = new Agent2D(x, y, mass, AR,ART);
        let v = p5.Vector.random2D();
        v.setMag(random(1,15));
        agent.vel.add(v);
        return agent;
    }
    static createRandomPos(mass = 1,AR,ART) {
        let agent = new Agent2D(random(width), random(height), mass,AR,ART);
        return agent;
    }
    update() {
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.borders();
        this.mass -= this.massLoss;
        this.r = sqrt(this.mass / PI) * Agent2D.drawRatio;
    }
    display() {
        //DEBUG
        // stroke(255,0,0);
        // strokeWeight(10);
        // fill(0);
        // circle(this.pos.x, this.pos.y, this.alignmentRadio*2);

        stroke(this.c);
        strokeWeight(this.r * 2)
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        beginShape();
        vertex(-this.r/3, -this.r/2);
        vertex(-this.r/3, this.r/2);
        vertex(3 * this.r/3, 0);
        endShape(CLOSE);
        pop();
    }
    borders() {
        switch (this.borderBehaviour) {
            case BorderBehaviour.BORDERS:
                if (this.pos.x < this.r || this.pos.x > width - this.r)
                    this.vel.x *= -this.borderDamp;
                if (this.pos.y < this.r || this.pos.y > height - this.r)
                    this.vel.y *= -this.borderDamp;
                this.pos.x = constrain(this.pos.x, this.r, width - this.r);
                this.pos.y = constrain(this.pos.y, this.r, height - this.r);
                break;
            case BorderBehaviour.WRAP:
                if (this.pos.x > width + this.r) this.pos.x = -this.r;
                if (this.pos.x < -this.r) this.pos.x = width + this.r;
                if (this.pos.y > height + this.r) this.pos.y = -this.r;
                if (this.pos.y < -this.r) this.pos.y = height + this.r;
                break;
            case BorderBehaviour.NONE:
                break;
        }
    }
    addForce(f) {
        let force = p5.Vector.div(f, this.mass);
        this.acc.add(force);
    }
    applyGravity(g) {
        this.acc.add(g);
    }
    applyFriction(m) {
        let fric = this.vel.copy();
        fric.normalize();
        fric.mult(-m);
        this.addForce(fric);
    }
    applyDrag(d) {
        let drag = this.vel.copy();
        drag.normalize();
        drag.mult(this.vel.mag()**2 * -d);
        this.addForce(drag);
    }
    isDead() {
        return this.mass <= 0;
    }
    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxSteeringForce);
        this.addForce(steering);
    }
    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxSteeringForce);
        this.addForce(steering);
        let dist = p5.Vector.dist(this.pos, target);
        let speed = map(dist, 0, this.arrivalDist, 0,this.maxSpeed);
        this.vel.limit(speed);
    }
    wander() {
        let future = this.vel.copy();
        future.setMag(this.wanderLookAhead);
        let r = this.vel.copy();
        r.setMag(this.wanderRadius);
        r.rotate(map(noise(this.wanderNoiseT), 0, 1, -PI, PI));
        this.wanderDebug(future, r);
        this.wanderNoiseT += this.wanderNoiseInc;
        r.add(future);
        r.add(this.pos);
        this.seek(r);
    }
    wanderDebug(future, r) {
        push();
        stroke(255);
        strokeWeight(1);
        noFill();
        translate(this.pos.x, this.pos.y);
        line(0, 0, future.x, future.y);
        translate(future.x, future.y);
        ellipse(0, 0, r.mag() * 2);
        translate(r.x, r.y);
        ellipse(0, 0, 5);
        pop();     
    }
    align(as){
        let alignmentForce = createVector(0,0);
        let n = 0;

        for(let a of as){
            if(this !=a && this.pos.dist(a.pos) <= this.alignmentRadio){
                alignmentForce.add(a.vel);
                n++;
            }
        }

        if(n>0){ 
            alignmentForce.div(n);
            alignmentForce.mult(this.alignmentRatio);
            alignmentForce.limit(this.maxSteeringForce);
        }
        this.addForce(alignmentForce);
    }

    separate(as){
        let alignmentForce = createVector(0,0);
        let n = 0;

        for(let a of as){
            if(this !=a && this.pos.dist(a.pos) <= this.separationRadio){
                let diff = p5.Vector.sub(this.pos,a.pos);
                diff.normalize();
                diff.div(this.pos.dist(a.pos)==0?1:this.pos.dist(a.pos))
                alignmentForce.add(diff);
                n++;
            }
        }

        if(n>0){ 
            alignmentForce.div(n);
            alignmentForce.mult(this.separationRadio);
            alignmentForce.limit(this.maxSteeringForce);
        }
        this.addForce(alignmentForce);
    }
}