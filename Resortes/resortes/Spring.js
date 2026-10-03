class Spring{
    constructor(a1,a2,k,restLen){
        this.a1 = a1;
        this.a2 = a2;
        this.k = k;
        this.restLen = restLen;
        this.color = color(255,255,255);
    }
    update(){
        let springForce = p5.Vector.sub(this.a1.pos,this.a2.pos);
        let len = springForce.mag();
        springForce.normalize();
        let displacement = len - this.restLen;
        springForce.mult(-this.k*displacement);
        // springForce.div(2);

        this.a1.addForce(springForce);
        springForce.mult(-1);
        this.a2.addForce(springForce);

        this.a1.update();
        this.a2.update();
    }
    display(){
        stroke(this.color);
        strokeWeight(1);
        line(this.a1.pos.x,this.a1.pos.y,this.a2.pos.x,this.a2.pos.y);

        this.a1.display()
        this.a2.display()
    }
}