class Automaton{
    constructor(cells,rows,cols,rules,size,pos){
        this.pos = pos;
        this.cells = cells;
        this.rows = rows;
        this.cols = cols;
        this.rules = rules;
        this.size = size;
        this.birthRule = [];
        for(let c of rules.split('/')[0].split('B')[1]){
            this.birthRule.push(parseInt(c,10));
        }
        this.stayRule = [];
        for(let c of rules.split('/')[1].split('S')[1]){
            this.stayRule.push(parseInt(c,10));
        }
    }
    inList(v,l){
        for(let vals of l){
            if(v == vals) return true
        }
        return false;
    }
    neighbours(r,c){
        let n = 0;
        for(let i = 0;i<3;i++){
            if(this.cells.at(r-1).at((c-1+i)%this.cols) == 1) n++;
        }

        if(this.cells.at(r).at(c-1) == 1) n++;
        if(this.cells.at(r).at((c+1)%this.cols) == 1) n++;

        for(let i = 0;i<3;i++){
            if(this.cells.at((r+1)%this.rows).at((c-1+i)%this.cols) == 1) n++;
        }
        return n;
    }
    newState(r,c){
        let numN = this.neighbours(r,c);
        if(this.inList(numN,this.birthRule)) return 1;
        if(this.inList(numN,this.stayRule)) return this.cells[r][c];
        return 0;
    }
    nextGen(){
        let newCells = [];
        for(let r = 0;r<this.rows;r++){
            newCells.push([]);
            for(let c = 0;c<this.cols;c++){
                newCells.at(-1).push(this.newState(r,c));
            }
        }
        this.cells = newCells;
    }
    display(){
        noStroke();
        for(let r = 0;r<this.rows;r++){
            for(let c = 0;c<this.cols;c++){
                if(this.cells[r][c] == 1){
                    fill(200,0,200)
                }else{
                    fill(0)
                }
                square(this.pos.x+this.size*r, this.pos.y+this.size*c, this.size)
            }
        }
    }
}