class Graph{
    constructor(k,restLen,mass,maxDistGeneration,SR,SRT,MSF,FC){
        this.k = k;
        this.restLen = restLen;
        this.mass = mass;
        this.maxDistGeneration = maxDistGeneration;
        this.separationRadio = SR;
        this.separationRatio = SRT
        this.maxSteeringForce = MSF;
        this.frictionC = FC;

        this.nodes = [];
        this.arcs = [];
    }
    createGraph(nodes){
        this.nodes = [];
        this.arcs = [];

        for(let n=0;n<nodes;n++){
            let pos;
            let C;
            let attached = false;
            if(this.nodes.length == 0){
                C = color(255,0,0)
                pos = createVector(0,0,0);
                attached = true;
            }else{
                C = color(random(50,255),0,random(50,255))
                let x = random(-this.maxDistGeneration,this.maxDistGeneration);
                let y = random(-this.maxDistGeneration,this.maxDistGeneration);
                let z = random(-this.maxDistGeneration,this.maxDistGeneration);
                pos = createVector(x,y,z);
            }
            let mass = this.mass;
            
            this.nodes.push(new Node(pos.x,pos.y,pos.z,mass,C,this.separationRadio,this.separationRatio,this.maxSteeringForce,attached));
        }
        
        let conectedNodes = [];
        let leftNodes = [];
        for(let n=0;n<this.nodes.length;n++){
            leftNodes.push(this.nodes.at(n));
        }

        let firstNode = random(0,leftNodes.length)
        conectedNodes.push(leftNodes.at(firstNode));
        leftNodes.splice(firstNode,1);

        let nodeIndex;
        let conectedNode;

        while(leftNodes.length != 0){
            conectedNode = random(0,conectedNodes.length);
            nodeIndex = random(0,leftNodes.length);
            this.arcs.push(new Arc(leftNodes.at(nodeIndex),conectedNodes.at(conectedNode),this.k,this.restLen));
            conectedNodes.push(leftNodes.at(nodeIndex));
            leftNodes.splice(nodeIndex,1);
        }
    }
    update(){
        for(let a of this.arcs){
            a.update();
        }

        for(let n of this.nodes){
            n.separate(this.nodes);
            n.applyFriction(this.frictionC);
            n.update();
        }
    }
    changeK(v){
        for(let a of this.arcs){
            a.k = v;
        }
        this.k = v;
    }
    changeRestLen(v){
        for(let a of this.arcs){
            a.restLen = v;
        }
        this.restLen = v;
    }
    changeMass(v){
        for(let n of this.nodes){
            n.mass = v;
            n.r = sqrt(v/PI);
        }
        this.mass = v;
    }
    changeSR(v){
        for(let n of this.nodes){
            n.separationRadio = v;
        }
        this.separationRadio = v;
    }
    changeSRT(v){
        for(let n of this.nodes){
            n.separationRatio = v;
        }
        this.separationRatio = v;
    }
    changeMaxSteeringForce(v){
        for(let n of this.nodes){
            n.maxSteeringForce = v;
        }
        this.maxSteeringForce = v;
    }
    changeFriction(v){
        this.frictionC = v;
    }
    display(){
        for(let n of this.nodes){
            n.display();
        }
        for(let a of this.arcs){
            a.display();
        }
    }
}