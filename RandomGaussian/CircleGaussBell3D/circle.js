class Circle {
    constructor(x,y,z,radio,color){
        this.x = x;
        this.y = y;
        this.z = z;
        this.radio = radio;
        this.color = color;
    }

    draw(){
        push();
        translate(this.x, this.y, this.z)
        fill(this.color);
        noStroke();
        sphere(this.radio, 7, 7);
        pop();
    }
}
