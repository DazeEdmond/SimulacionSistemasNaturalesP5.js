class AgentSystem2D{
    constructor(x,y,g,MD,ML){
        this.pos = createVector(x,y);
        this.agents = [];
        this.atractors = [];
        this.g = this.g;
        this.massDeflt = MD;
        this.massLoss = ML;
    }
    update(add){
        if(add){
            this.addAgent(this.pos.x,this.pos.y);
        }
        for(let i=0;i<this.agents.length;i++){
            let a = this.agents.at(i);
            if(a.isDead()){
                this.agents.splice(i,1);
                continue;
            }
            a.massLoss(this.massLoss);
            a.update();
            a.display();

        }
        for(let atr of this.atractors){
            atr.AtractAgents(this.agents,this.g);
        }
    }
    addAgent(x,y){
        this.agents.push(Agente.createRandomDir(x,y,randomGaussian(this.massDeflt,this.massDeflt/10)));
    }
    addForce(f){
        for(let a of this.agents){
            a.addForce(f);
        }
    }
    addGrav(g){
        for(let a of this.agents){
            a.addGrav(g);
        }
    }
    applyFriction(m){
        for(let a of this.agents){
            a.applyFriction(m);
        }
    }
    applyDrag(m){
        for(let a of this.agents){
            a.applyDrag(m);
        }
    }
    follow(vec,f){
        for(let a of this.agents){
            a.follow(vec,f);
        }
    }
    gravitationalForce(){
        let a1;
        let a2;
        let r;
        for(let i=0;i<this.agents.length;i++){
            a1 = this.agents.at(i);
            for(let j=i+1;j<this.agents.length;j++){
                a2 = this.agents.at(j);
                r = p5.Vector.sub(a1.pos,a2.pos);
                let mag = max(r.magSq(),0.1);
                const c = this.g * a1.mass * a2.mass / mag;
                r.normalize();
                r.mult(c);
                a2.addForce(r);
                r.mult(-1);
                a1.addForce(r);
            }
        }
    }
    addAtractor(atr){
        this.atractors.push(atr);
    }
    setAtractors(atr){
        this.atractors = atr;
    }
}