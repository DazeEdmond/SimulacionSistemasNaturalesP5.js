class Agente{
    constructor(x,y,z,mass,C=color(random(255),0,random(255))){
        this.pos = createVector(x,y,z);
        this.vel = p5.Vector.random3D();
        this.acc = createVector(0,0,0);
        this.mass = mass;
        this.color = C;
        this.r = sqrt(mass/PI);
        this.damp = 0.4;

        this.angX = random(0,2*PI)
        this.angVelX = random(-0.1,0.1)
        this.angAccX = 0

        this.angY = random(0,2*PI)
        this.angVelY = random(-0.1,0.1)
        this.angAccY = 0

        this.angZ = random(0,2*PI)
        this.angVelZ = random(-0.1,0.1)
        this.angAccZ = 0
    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        
        this.angVelX += this.angAccX
        this.angX += this.angVelX
        this.angAccX = 0

        this.angVelY += this.angAccY
        this.angY += this.angVelY
        this.angAccY = 0

        this.angVelZ += this.angAccZ
        this.angZ += this.angVelZ
        this.angAccZ = 0
        
        // this.borders();
    }
    addAngularForce(f){
        this.angAccX += f
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
        if(this.pos.x >= 200-this.r || this.pos.x <= this.r){
            this.vel.x *= -this.damp;
        }
        if(this.pos.y >= 200-this.r || this.pos.y <= this.r){
            this.vel.y *= -this.damp;
        }
        if(this.pos.z >= 200-this.r || this.pos.z <= this.r){
            this.vel.z *= -this.damp;
        }
        this.pos.x = constrain(this.pos.x, this.r, 200-this.r);
        this.pos.y = constrain(this.pos.y, this.r, 200-this.r);
        this.pos.z = constrain(this.pos.z, this.r, 200-this.r);
    }
    display(){
        fill(this.color);
        push();
        translate(this.pos.x, this.pos.y,this.pos.z);
        strokeWeight(0.5);
        stroke(0);
        rotateX(this.angX)
        rotateY(this.angY)
        rotateZ(this.angZ)
        box(this.r);
        pop();
    }
}