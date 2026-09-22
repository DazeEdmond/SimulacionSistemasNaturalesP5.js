class FireworkSystem{
    constructor(g,f,d,size){
        this.particles = [];
        this.rockets = [];
        this.g = g;
        this.f = f;
        this.d = d;
        this.size = size;
    }
    update(){
        for(let p of this.particles){
            p.applyGrav(this.g);
            p.update();
            p.applyFriction(this.f);
            p.applyDrag(this.d);
            if(p.isDead()){
                let index = this.particles.indexOf(p);
                this.particles.splice(index,1);
            }
            p.display();
        }
        for(let r of this.rockets){
            r.update();
            // r.applyDrag(this.d);
            if(r.isDead()){
                this.explode(r);
                let index = this.rockets.indexOf(r);
                this.rockets.splice(index,1);
                continue;
            }
            r.display();
        }
    }
    addFirework(){
        this.rockets.push(new Rocket(random(this.size),0,random(this.size),randomGaussian(40,5),randomGaussian(3,1)));
    }
    explode(r){
        for(let p of r.explode()){
            this.particles.push(p);
        }
    }
}

class Rocket{
    constructor(x,y,z,nParticles,time){
        this.pos = createVector(x,y,z);
        this.vel = createVector(0,-5,0);
        this.acc = createVector(0,0,0);
        this.nParticles = nParticles;
        this.time = time;
        this.r = 2;
    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.time -= 0.1
    }
    applyForce(f){
        this.acc.add(f);
    }
    applyDrag(d){
        let drag = this.vel.copy();
        drag.normalize();
        drag.mult(-d*this.vel.mag()**2);
        this.applyForce(drag);
    }
    explode(){
        let particles = []
        for(let i = 0; i<this.nParticles;i++){
            particles.push(new Particle(this.pos.x,this.pos.y,this.pos.z,randomGaussian(40,3),3));
        }
        return particles;
    }
    isDead(){
        return this.time <= 0;
    }
    display(){
        fill(150);
        push();
        translate(this.pos);
        box(this.r,this.r*2,this.r);
        pop()
    }
}

class Particle{
    constructor(x,y,z,mass,massLoss,vel=p5.Vector.random3D().mult(2),r=random(255),g=random(255),b=random(255)){
        this.pos = createVector(x,y,z);
        this.vel = vel;
        this.acc = createVector(0,0,0);
        this.Lparticles = [];
        this.Pmass = mass*0.7;
        this.mass = mass;
        this.massL = massLoss;
        this.r = sqrt(mass/PI);
        this.R = r;
        this.G = g;
        this.B = b;
        this.op = 100;
        this.color = color(r,g,b);
    }
    update(){
        if(this.mass <0) return;
        this.massLoss();
        if(this.vel.x == 0 && this.vel.y == 0 && this.vel.z == 0) return;

        this.Lparticles.push(new Particle(this.pos.x,this.pos.y,this.pos.z,this.Pmass,this.massL/2,createVector(0,0,0),this.color));
        console.log(this.Pmass);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    applyForce(f){
        let force = p5.Vector.div(f,this.mass);
        this.acc.add(force);
    }
    applyGrav(g){
        this.acc.add(g);
    }
    applyFriction(f){
        let fric = this.vel.copy();
        fric.normalize();
        fric.mult(-f);
        this.applyForce(fric);
    }
    applyDrag(d){
        let drag = this.vel.copy();
        drag.normalize();
        drag.mult(-d*this.vel.mag()**2);
        this.applyForce(drag);
    }
    massLoss(){
        this.mass -= this.massL;
        this.r = sqrt(this.mass/PI);
        this.op -= 1;
        this.color = color(this.R,this.G,this.B,this.op);
    }
    isDead(){
        return this.mass <= 0 && this.Lparticles.length == 0;
    }
    display(){
        for(let p of this.Lparticles){
            p.update();
            if(p.isDead()){
                let index = this.Lparticles.indexOf(p);
                this.Lparticles.splice(index,1);
                continue;
            }
            p.display();
        }

        if(this.mass <0) return;

        fill(this.color);
        push();
        translate(this.pos);
        box(this.r);
        pop()
    }
}