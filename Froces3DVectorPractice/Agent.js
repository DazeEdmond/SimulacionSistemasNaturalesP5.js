class agent3D{
    constructor(x,y,z,mass,limit){
        this.limit = limit;
        this.pos = createVector(x,y,z);
        this.vel = p5.Vector.random3D();
        this.acc = createVector(0,0,0);
        this.color = color(0,55+random(200),55+random(200));
        this.mass = mass;
        this.r = sqrt(mass/PI);
        this.damp = 0.2;
    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.borders();
    }
    borders(){
        if(this.pos.x < this.r || this.pos.x > this.limit-this.r){
            this.vel.x *= -this.damp;
        }
        if(this.pos.y < this.r || this.pos.y > this.limit-this.r){
            this.vel.y *= -this.damp;
        }
        if(this.pos.z < this.r || this.pos.z > this.limit-this.r){
            this.vel.z *= -this.damp;
        }
        
        this.pos.x = constrain(this.pos.x, this.r, this.limit-this.r);
        this.pos.y = constrain(this.pos.y, this.r, this.limit-this.r);
        this.pos.z = constrain(this.pos.z, this.r, this.limit-this.r);
    }

    applyForce(f){
        let force = p5.Vector.div(f,this.mass);
        this.acc.add(force);
    }
    applyGrav(f){
        this.acc.add(f);
    }
    applyFric(f){
        let fric = this.vel.copy();
        fric.normalize();
        fric.mult(-f);
        this.applyForce(fric);
    }
    follow(v,f){
        let vec = p5.Vector.sub(v,this.pos);
        vec.setMag(f);
        this.applyForce(vec);
    }

    In(v){
        return (this.pos.x >= v.x-this.limit/2 && this.pos.x <= v.x &&
            this.pos.y >= v.y-this.limit/2 && this.pos.y <= v.y &&
            this.pos.z >= v.z-this.limit/2 && this.pos.z <= v.z);
    }

    display(){
        fill(this.color);
        noStroke();
        push();
        translate(this.pos);
        box(this.r*2);
        pop();
    }
}