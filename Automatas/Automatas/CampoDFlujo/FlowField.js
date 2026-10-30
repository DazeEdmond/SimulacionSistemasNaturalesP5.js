class FlowField{
    constructor(w,h,size,mag){
        this.matrix = [];
        this.r = 5;
        this.c = color(random(255),random(255),random(255));
        this.size = size;
        this.rows = floor(h/size);
        this.cols = floor(w/size);
        for(let row=0;row<h;row+=size){
            this.matrix.push([]);
            for(let col=0;col<w;col+=size){
                this.matrix.at(-1).push(p5.Vector.random2D().setMag(mag));
            }
        }
    }

    getVector(x,y){
        return this.matrix.at(floor(y/this.size)).at(floor(x/this.size));
    }
    display(){
        for(let row=0;row<this.rows;row++){
            for(let col=0;col<this.cols;col++){
                fill(100,100,100);
                rect(col*this.size, row*this.size, this.size);
                push();
                fill(this.c);
                translate(col*this.size+this.size/2, row*this.size+this.size/2);
                rotate(this.matrix.at(row).at(col).heading())
                beginShape();
                vertex(-this.r/3, this.r/2)
                vertex(4*this.r/3, 0)
                vertex(-this.r/3, -this.r/2)
                vertex(-this.r/3, this.r/2)
                endShape()
                pop();
            }
        }       
    }
}