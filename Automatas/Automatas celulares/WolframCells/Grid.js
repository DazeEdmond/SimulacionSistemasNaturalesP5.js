class Grid{
    constructor(x,y,size,cols,ruleset,cells){
        this.pos = createVector(x,y);
        this.size = size;
        this.cols = cols;
        this.ruleset = {"000":ruleset.at(0),"001":ruleset.at(1),"010":ruleset.at(2),"011":ruleset.at(3),"100":ruleset.at(4),"101":ruleset.at(5),"110":ruleset.at(6),"111":ruleset.at(7)};
        this.cells = cells;
        this.generations = [];
    }
    nextGen(){
        this.pos.add(createVector(0,this.size));
        let nc = []
        console.log(this.cells)
        for(let col = 0; col<this.cols;col++){
            let left = String(this.cells.at(col-1));
            let right = String(this.cells.at((col+1)%this.cols));
            let key = left + String(this.cells.at(col))+right;
            nc.push(parseInt(this.ruleset[key],10));
        }
        this.cells = nc;
    }
    display(){
        for(let col = 0; col<this.cols;col++){
            fill(0);
            noStroke();
            if(this.cells[col] == 1){
                fill(255);
            }
            square(this.pos.x+col*this.size, this.pos.y, this.size);
        }
    }
}