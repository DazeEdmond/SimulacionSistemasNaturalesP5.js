class agent2D{
    constructor(x,y,mass){
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D().mult(2);
        this.acc = createVector(0,0);
        this.mass = mass;
        this.r = sqrt(mass/PI);
        this.Red = 55+random(0,200);
        this.Blue = 55+random(0,200);
        this.color = color(this.Red,0,this.Blue);
        this.damp = 0.5;
    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.borders();
    }
    borders(){
        // if(this.vel.x!=0 && this.pos.x<=this.r || this.pos.x>=width-this.r){
        //     this.vel.x *= -this.damp;
        //     if(this.vel.x <= 0.5 && this.vel.x > -0.5) this.vel.x=0;
        // }
        if(this.vel.y!=0 && this.pos.y<=this.r || this.pos.y>=height-this.r){
            this.vel.y *= -this.damp;
            if(this.vel.y <= 0.5 && this.vel.y > -0.5) this.vel.y=0;
        }
        // this.pos.x = constrain(this.pos.x, this.r, width-this.r);
        this.pos.y = constrain(this.pos.y, this.r, height-this.r);
    }

    applyForce(f){
        let force = p5.Vector.div(f,this.mass)
        this.acc.add(force);
    }
    applyGrav(g){
        this.acc.add(g);
    }
    applyFric(f){
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

    isDead(){
        return this.pos.x<-this.r;
    }

    draw(){
        fill(this.color);
        noStroke();
        circle(this.pos.x, this.pos.y, this.r*2);
    }
    setColorOpacity(o){
        this.color = color(this.Red,0,this.Blue,o);
    }
}