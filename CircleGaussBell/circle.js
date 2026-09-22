class Circle {
    constructor(x,y,radio,color){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
    }

    draw(){
        ellipse(this.x, this.y, this.radio*2, this.radio*2,fill(this.color),noStroke());
    }
}
