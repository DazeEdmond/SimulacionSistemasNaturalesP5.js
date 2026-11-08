class Turtle{
    constructor(pos,pen){
        this.pos = pos;
        this.ang = 0;
        this.pen = pen;
        this.c = color(255,255,255);
    }
    setPos(pos){
        this.pos = pos;
    }
    penUp(){
        this.pen = false;
    }
    penDown(){
        this.pen = true;
    }
    forward(dist){
        let x = this.pos.x+dist*cos(this.ang);
        let y = this.pos.y+dist*sin(this.ang);
        if(this.pen){
            stroke(255);
            strokeWeight(1);
            line(this.pos.x, this.pos.y, x, y);
        }
        this.pos.x = x;
        this.pos.y = y;
    }
    turnRight(ang){
        this.ang += ang;
    }
    turnLeft(ang){
        this.ang -= ang;
    }
}