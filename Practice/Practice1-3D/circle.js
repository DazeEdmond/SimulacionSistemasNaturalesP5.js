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
