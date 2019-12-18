var shadow;
var theata = 0;
var myCanvas;
var stars = [];
var rgb;

var X;
var Y;
var Z;
var posX;
var posY;
var realSpeed;
var Direction;
var mySound;

function preload() {
    //var mySound = loadSound('sound/rain.mp3');
}

function setup() {
    myCanvas = createCanvas(windowWidth*(1), windowHeight+100);
    background(10);
    // mySound.setVolume(0.1);
    // mySound.loop();
    for(var i = 0; i < 4001;i++){
        stars[i] = new Star();
    }
}

function draw() {
    
    Z = floor(rotationZ)
	X =  floor(rotationX)
    Y =  floor(rotationY)

    if(options.isPNG == true){
        clear();
    }else{
        rgb = hexToRgb(options.Background);
        background(rgb.r, rgb.g, rgb.b, 30);
    }


    if(frameCount<10){
        background(10);
    }

    if ( abs(X) < 90 && abs(Y) < 90){
        Direction = 'C';
        posX = map(Y, -90, 90, -100, windowWidth+100);
        posY = map(X, -180, 180, -650, windowHeight+650);
        translate(posX,posY);
    }
    if ( abs(X) > 150 && abs(Y) < 30){
        Direction = 'O';
        X = abs(X)-180;
        posX = map(Y, -90, 90, -100, windowWidth+100);
        posY = map(X, -180, 180, -650, windowHeight+650);
        translate(abs(posX),abs(posY));
    }

    //Direction = 'C';
    // realSpeed = map(Z, 0, 359, -50, 50);
    // //console.log(options.Speed)
    // //console.log(Z);
    // if (Z == null){
    //     realSpeed = 20;
    // }
    // if (realSpeed > 0){
    //     Direction = 'C';
    // }
    // else{
    //     realSpeed = -realSpeed;
    //     if (realSpeed == 0){
    //         realSpeed = 1;
    //     }
    //     Direction = 'O';
    // }
    

    for (var i = 0; i < options.Counts; i++){
        stars[i].display();
        stars[i].update();
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function Star(){
    this.x = random(-width*3,width*3);
    this.y = random(-width*3,width*3);
    this.z = random(width*2,width*4);
    this.pz = this.z;
    this.px = this.x;
    this.py = this.y;

    this.angle = 0;

    this.display = function(){
        var sx = map(this.x/this.z/2, -1, 1, -2*width, 2*width);
        var sy = map(this.y/this.z/2, -1, 1, -2*height, 2*height);

        if(Direction == 'C'){
            var r = map(dist(0,0,this.px,this.py),0,width/2-70, 0, options.Size);
        }else{
            var r = map(dist(sx,sy,this.px,this.py),0,width*2,3,options.Size);
        }

        var n = map(options.Range,0,200,0,width+300);
        var percent = norm(dist(sx,sy,0,0), 0, n);
        // console.log(percent)
        from = color(options.Color1);
        to = color(options.Color2);
        between = lerpColor(from, to, percent/10);

        stroke(between);
        strokeWeight(r);

        if(this.z >= 1 && sx <= width && sx > -width && sy > -height && sy < height){
           line(this.px,this.py,sx,sy);   
           this.px = sx;     
           this.py = sy; 
       }
   }
    
    this.update = function(){
        if(Direction == 'C'){
            this.z += options.Speed;    
            if( dist(0,0,this.px,this.py) < options.Range || this.z > width*3 ){
                this.angle = random(TWO_PI);
                this.z = random(width*1.5,width*2);
                this.x = random(-width*2,width*2);
                this.y = random(-width*2,width*2);
                this.px = map(this.x/this.z/2, -1, 1, -2*width, 2*width);
                this.py = map(this.y/this.z/2, -1, 1, -2*height, 2*height);
            }
        }else{
                this.z -= options.Speed;    
                if(this.z<1|| dist(0,0,this.px,this.py) < options.Range){
                    this.z = random(width*1.5,width*2);
                    this.x = random(-width*2,width*2);
                    this.y = random(-width*2,width*2);
                    this.px = map(this.x/this.z/2, -1, 1, -width, width);
                    this.py = map(this.y/this.z/2, -1, 1, -height, height);
                }
        }
    }
}


function mousePressed() {
	location.replace("5.html")
}

function BlockMove(event) {
	event.preventDefault() ;
}