var particles = [];
var maxLife;

function setup(){
    backgroundColor = color(options.Background);
    createCanvas(windowWidth, windowHeight);
    background(options.Background);
    for(var i = 0; i < 2500; i++){
        particles[i] = new Particle();
    }
}

function draw(){
    noStroke();
    smooth();  
 
    maxLife = options.Length;
    for(var i = 1; i < options.Nums; i++){
        var iterations = map(i,0,options.Nums,5,1);
        var radius = options.Size;
        
        particles[i].move(iterations);
        particles[i].checkEdge();
        
        var alpha = 255;
        var particleColor;
        var fadeRatio;
        fadeRatio = min(particles[i].life * 5 / maxLife, 1);
        fadeRatio = min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);
        var lifeRatioGrayscale = min(255, (255 * particles[i].life / maxLife) + red(backgroundColor));

        var percent1 = norm(particles[i].pos.x,0,width/2);
        var percent2 = norm(particles[i].pos.x,width/2,width);
        from = color(options.Color1);
        middle = color(options.Color2);
        to = color(options.Color3);
        between1 = lerpColor(from, middle, percent1);
        between2 = lerpColor(middle, to, percent2);
        if(particles[i].pos.x > 0 && particles[i].pos.x <width/2){
            particleColor = between1;
        }else{
            particleColor = between2;   
        }   

        fill(red(particleColor), green(particleColor), blue(particleColor), alpha * fadeRatio);
        particles[i].display(radius);
    } 
}

function Particle(){
    this.vel = createVector(0, 0);
    this.pos = createVector(random(-50, width+50), random(-50, height+50));
    this.life = random(0, maxLife);    
    this.move = function(iterations){
        if((this.life -= 0.01666) < 0)
            this.respawn();
        while(iterations > 0){

            var angle = noise(this.pos.x/options.noiseScale, this.pos.y/options.noiseScale)*TWO_PI*options.noiseScale;
            this.vel.x = cos(angle);
            this.vel.y = sin(angle);
            this.vel.mult(0.2);
            this.pos.add(this.vel);
            --iterations;
        }
    }

    this.checkEdge = function(){
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
            this.respawn();
        }
    }
    
    this.respawn = function(){
        this.pos.x = random(-50, width+50);
        this.pos.y = random(-50, height+50);
        this.life = maxLife;
    }

    this.display = function(r){
        ellipse(this.pos.x, this.pos.y, r, r);
    }
}

function touchStarted(){
    background(options.Background);
    for(var i = 0; i < options.Nums; i++){
        particles[i].respawn();
        particles[i].life = random(0,maxLife);
    }
}


function BlockMove(event) {
	event.preventDefault() ;
}
