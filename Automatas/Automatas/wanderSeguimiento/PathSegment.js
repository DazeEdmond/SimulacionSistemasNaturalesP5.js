class Segment{
    constructor(start,end,r){
        this.start = start;
        this.end = end;
        this.r = r;
        this.transparence = 10;
        this.Tvel = 1;
    }
    display(){
        stroke(255);
        strokeWeight(1);
        line(this.start.x, this.start.y, this.end.x, this.end.y)
        strokeWeight(this.r*2);
        stroke(255,0,255,this.transparence);
        line(this.start.x, this.start.y, this.end.x, this.end.y)
        this.transparence += this.Tvel;
        if(this.transparence >= 100 || this.transparence <= 10) this.Tvel *= -1;
    }
}