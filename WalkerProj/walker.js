class Walker{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.step = 5;
        this.size = 5;
        this.color = color(random(0,255),random(0,255),random(0,255))
    }

    update(){
        let rand = floor(random(0,100));
        let direction = 0;
        if(rand < 50 && rand >= 40){
            direction = 1
        }
        if(rand < 80 && rand >= 50){
            direction = 2 
        }
        if(rand >= 80){
            direction = 3
        }

        if(direction == 0 || direction == 4 || direction == 6){
            this.x += this.step;
        }
        if(direction == 1 || direction == 5 || direction == 7){
            this.x -= this.step;
        }
        if(direction == 2 || direction == 4 || direction == 7){
            this.y += this.step;
        }
        if(direction == 3 || direction == 5 || direction == 6){
            this.y -= this.step;
        }
    }

    draw(){
        stroke(this.color);
        fill(0,0,0)
        square(this.x, this.y, this.size);
    }
}