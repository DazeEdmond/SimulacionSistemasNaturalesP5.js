class Atractor{
    constructor(x,y,mass,repellent=false){
        this.pos = createVector(x,y);
        this.mass = mass;
        this.repellent = repellent;
        this.angle = 0;
        this.r = sqrt(mass/PI);
        if(repellent){
            this.color = color(255,0,0,50);
        }else{
            this.color = color(0,0,255,50);
        }
    }
    AtractAgents(agents,g){
        for(let a of agents){
            let r;
            if(this.repellent){
                r = p5.Vector.sub(a.pos,this.pos);
            }else{
                r = p5.Vector.sub(this.pos,a.pos);
            }
            let mag = max(r.magSq(),0.1);
            const c = g * a.mass * this.mass / mag;
            r.normalize();
            r.mult(-c);
            a.addForce(r);
        }
        this.Display();
    }
    Display(){
        noStroke();
        fill(this.color);
        push();
        translate(this.pos);
        this.angle = (this.angle+0.08)%360;
        rotate(this.angle);
        rect(-this.r/2, -this.r/2, this.r, this.r);
        pop()
    }
}