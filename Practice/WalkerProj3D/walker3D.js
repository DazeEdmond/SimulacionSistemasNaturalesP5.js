class Walker{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.step = 30;
        this.size = 30;
        this.positions = []
        this.color = color(random(0,255),random(0,255),random(0,255))
    }

    update(){
        let rand = floor(random(0,6));
        let direction = 0;

        direction = rand

/*        if(rand < 50 && rand >= 40){
            direction = 1
        }
        if(rand < 80 && rand >= 50){
            direction = 2 
        }
        if(rand >= 80){
            direction = 3
        }
*/

        if(direction == 0) this.x += this.step;
        if(direction == 1) this.x -= this.step;
        if(direction == 2) this.y += this.step;
        if(direction == 3) this.y -= this.step;
        if(direction == 4) this.z += this.step;
        if(direction == 5) this.z -= this.step;
        this.positions.push([this.x,this.y,this.z]);
    }

    draw(){
        fill(0,0,0);
        stroke(color(random(0,255),random(0,255),random(0,255)));
        for (let p of this.positions){
            let x = p[0];
            let y = p[1];
            let z = p[2];
            push();
            translate(x, y, z);
            fill(0,0,0);
//            stroke(this.color);
            stroke(color(random(0,255),random(0,255),random(0,255)));
            box(this.size);
            pop();
        }
        push();
        translate(this.x, this.y, this.z);
        box(this.size);
        pop();
    }
}