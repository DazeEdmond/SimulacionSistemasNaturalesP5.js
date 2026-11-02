let grid;
let counter = 0;
function setup() {
    background(220);
    createCanvas(1200, 1200);
    let size = 1;
    let cols = 1000;
    let ruleset = ["0","1","0","0","1","0","0","0"];
    let cells = [];
    // for(let i=0;i<cols;i++){
    //     cells.push(floor(random(2)));
    // }
    for(let i=0;i<cols;i++){
        if(i == floor(cols/2)){
            cells.push(1);
        }else{
            cells.push(0);
        }
    }
    grid = new Grid(width/2 - size*cols/2,0,size,cols,ruleset,cells)
    // for(let i = 0;i<100;i++){
    //     grid.display();
    //     grid.nextGen();
    // }
}

function draw() {
    // background(220);
    // grid.display();
    // grid.nextGen();
    if(counter<1000){
        grid.display();
        grid.nextGen();
    }
    counter++;
}
