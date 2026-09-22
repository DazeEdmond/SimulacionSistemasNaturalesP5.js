class Star {
    constructor(x,y,z,color,size){
        this.x = x;
        this.y = y;
        this.z = z;
        this.radio = random(size[0], size[1]);
        this.color = color;
    }

    draw(){
        push();
        noStroke();
        translate(this.x, this.y, this.z)
        emissiveMaterial(this.color);
        sphere(this.radio, 5, 5);
        pop();
    }
}

class Cluster{
    constructor(x,y,z,size,dist){
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.distribution = dist;
        this.stars = [];
        this.starSize = [floor(random(19500/this.size,20000/this.size))];
        this.starsAmount = floor(random(this.size,this.size*2))
        for(let i = 0;i<this.starsAmount;i++){
            let x = randomGaussian(this.x,this.distribution);
            let y = randomGaussian(this.y,this.distribution);
            let z = randomGaussian(this.z,this.distribution);
            let temp = min(this.size/18,140);
            let starColor = color(105+temp,random(105,206),255-temp);
            this.stars.push(new Star(x,y,z,starColor,this.starSize));
        }
    }
    
    draw(){
        for(let s of this.stars){
            s.draw();
        }
    }
}