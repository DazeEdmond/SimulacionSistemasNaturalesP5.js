class Circle {
    constructor(x,y,radio){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.vx = random(-5,5);
        this.vy = random(-5,5);
        this.color = color(random(0,255),random(0,255),random(0,255))
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.y >= height-this.radio || this.y <= 0+this.radio){
            this.vy *= -1;
        }   
        if(this.x >= width-this.radio || this.x <= 0+this.radio){
            this.vx *= -1;
        }
        this.x = constrain(this.x, this.radio, width-this.radio);
        this.y = constrain(this.y, this.radio, height-this.radio);
    }

    draw(){
        ellipse(this.x, this.y, this.radio*2, this.radio*2,fill(this.color),noStroke());
    }
}
