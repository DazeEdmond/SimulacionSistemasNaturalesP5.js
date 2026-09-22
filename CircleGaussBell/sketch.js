let circles;

function setup() {
    createCanvas(1080, 720);
    circles = [];

    background(0);
    
    stroke(255);
    strokeWeight(2);
    line(0, height/2, width, height/2)
    
    for(let i = -width/2;i<width/2;i += 60){
        strokeWeight(2);
        linePos = i.toString().length*3+i+width/2-3;
        line(linePos, height/2+5, linePos, height/2-5)
    
        fill(255);
        strokeWeight(1);
        text(i.toString(), i+width/2-3, height/2+20);
    }

    stroke(255);
    strokeWeight(2);
    line(width/2, 0, width/2, height)
    
    for(let i = -height/2;i<height/2;i += 60){
        strokeWeight(2);
        linePos = i+height/2;
        line(width/2+5,linePos, width/2-5,linePos)
    
        fill(255);
        strokeWeight(1);
        text((-i).toString(), width/2+10, height/2+i+3);
    }
}

function draw() {    
    // for(let c of circles){
    //     c.draw();
    // }

    if(mouseIsPressed && mouseButton.left){
        desviacion = 100;
        let x = randomGaussian(width/2,desviacion);
        // let y = randomGaussian(height/2,desviacion);
        let y = height/2;
        ellipse(x, y, 10, 10,fill(255,0,0,10),noStroke());
        // circles.push(new Circle(x,y,5,color(255,0,0,10)));
    }
}
