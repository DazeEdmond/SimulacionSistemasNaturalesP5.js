class Circle {
    constructor(x,y,z,radio){
        this.x = x;
        this.y = y;
        this.z = z;
        this.radio = radio;
        this.vx = random(-5,5);
        this.vy = random(-5,5);
        this.vz = random(-5,5);
        this.color = color(random(0,255),random(0,255),random(0,255))
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        if(this.x >= 200-this.radio || this.x <= 0+this.radio){
            this.vx *= -1;
        }
        if(this.y >= 200-this.radio || this.y <= 0+this.radio){
            this.vy *= -1;
        }   
        if(this.z >= 200-this.radio || this.z <= 0+this.radio){
            this.vz *= -1;
        }
        this.x = constrain(this.x, this.radio, 200-this.radio);
        this.y = constrain(this.y, this.radio, 200-this.radio);
        this.z = constrain(this.z, this.radio, 200-this.radio);
    }

    draw(){
        push();
        translate(this.x, this.y, this.z);
        fill(this.color);
        noStroke();
        sphere(this.radio,5,5);
        pop();
    }
}

class Agent3D {
    constructor(apothem){
        let x = random (-apothem,apothem);
        let y = random (-apothem,apothem);
        let z = random (-apothem,apothem);
        this.apothem = apothem;
        this.pos = createVector(x,y,z);
        this.acc = createVector(0,0,0);
        this.vel = p5.Vector.random3D();
        this.color = color(random(0,255),random(0,255),random(0,255))
        this.r = 10;
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.borders();
    }

    borders(){
        if(this.pos.x >= this.apothem-this.r || this.pos.x <= -this.apothem+this.r){
            this.vel.x *= -1;
        }
        if(this.pos.y >= this.apothem-this.r || this.pos.y <= -this.apothem+this.r){
            this.vel.y *= -1;
        }
        if(this.pos.z >= this.apothem-this.r || this.pos.z <= -this.apothem+this.r){
            this.vel.z *= -1;
        }
        this.pos.x = constrain(this.pos.x, -this.apothem+this.r, this.apothem-this.r);
        this.pos.y = constrain(this.pos.y, -this.apothem+this.r,this.apothem-this.r);
        this.pos.z = constrain(this.pos.z, -this.apothem+this.r,this.apothem-this.r);
    }

    addForce(f){
        this.acc.add(f);
    }

    draw(){
        push();
        translate(this.pos.x,this.pos.y,this.pos.z);
        fill(this.color);
        noStroke();
        sphere(this.r,5,5);
        pop();
    }
}