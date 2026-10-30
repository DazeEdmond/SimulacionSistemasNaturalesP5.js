let game;

function setup() {
    background(10)
    createCanvas(800, 600);
    let pos = createVector(0,0);
    let rows = 200;
    let cols = 200;
    let cells = [];
    for(let r = 0;r<rows;r++){
        cells.push([]);
            for(let c = 0;c<cols;c++){
                cells.at(-1).push(floor(random(2)));
            }
        }
    let rules = "B3/S23";
    let size = 5;
    game = new Automaton(cells,rows,cols,rules,size,pos)
}

function draw() {
    // if(frameCount%10 == 0){
        game.display();
        game.nextGen();
    // }
}
