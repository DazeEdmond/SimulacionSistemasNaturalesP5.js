class AgentSystem2D{
    constructor(x,y,g){
        this.pos = createVector(x,y);
        this.agents = [];
        this.g = this.g;
    }
    update(){
        for(let a of this.agents){
            a.update();
            a.display();
        }
    }
    addAgent(x,y,mass){
        this.agents.push(Agente.createRandomDir(x,y,mass));
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
}