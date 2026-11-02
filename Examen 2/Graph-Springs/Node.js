class Node{
    constructor(x,y,z,mass,C=color(random(255),0,random(255)),SR,SRT,MSF,attached=false){
        this.pos = createVector(x,y,z);
        // this.vel = p5.Vector.random3D();
        this.vel = createVector(0,0,0);
        this.acc = createVector(0,0,0);
        this.mass = mass;
        this.color = C;
        this.r = sqrt(mass/PI);
        this.attached = attached
        this.separationRadio = SR;
        this.separationRatio = SRT;
        this.maxSteeringForce = MSF;
    }
    update(){
        if(this.attached) return;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);        
    }
    
    addForce(f){
        let force = p5.Vector.div(f,this.mass);
        this.acc.add(force);
    }
    
    applyFriction(m){
        let fric = this.vel.copy();
        fric.normalize();
        fric.mult(-m);
        this.addForce(fric);
    }

    separate(as){
        let alignmentForce = createVector(0,0,0);
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
            alignmentForce.mult(this.separationRatio);
            alignmentForce.limit(this.maxSteeringForce);
        }
        this.addForce(alignmentForce);
    }

    display(){
        fill(this.color);
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        noStroke();

        sphere(this.r,7,7);

        pop();
    }
}