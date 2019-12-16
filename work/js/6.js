var myCanvas;
var r;
var x1,y1,x2,y2,x3,y3,x4,y4,sx,sy;
var radius;
var mode;
var myG, myR, myB;

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    if(windowWidth > windowHeight){
        r = windowWidth;  
    }else{
        r = windowHeight;
    }
}

function draw() { 
    frameRate(60);
    myG=map(mouseX, 0, displayWidth, 60, 195, true)
    myR=map(mouseY, 0, displayHeight,60, 195, true)
    myB=map(mouseX+mouseY, 0, displayWidth+displayHeight, 60, 195, true)
    background(myR, myG, myB);
    if(windowWidth > windowHeight){
        speedline(windowHeight/2 - 70);  
    }else{
        speedline(windowWidth/2 - 10);
    }
}

var posX, posY;
var Offset;
var X, Y;

function speedline(r){
    X =  floor(rotationX);
    Y =  floor(rotationY);

    background(myR, myG, myB);
    Offset = 0;
    for(var i = 180; i < 540; i += 360/options.Counts){
        push();
        translate(width/2,height/2);
        noFill();
        posX = map(mouseX, 0, windowWidth, -windowWidth/2, windowWidth/2);
        posY = map(mouseY, 0, windowHeight, -windowHeight, 0) + windowHeight/2;

        translate(map(Y, -90, 90, -windowWidth/6, windowWidth/6) + posX/5,map(X, -180, 180, -windowHeight/3, windowHeight/3) + posY/5);

        beginShape();
        vertex(posX,posY);
        // x3 = sin(radians(i))*r+random(options.Offset);
        // y3 = cos(radians(i))*r+random(options.Offset);
        x3 = sin(radians(i))*r;
        y3 = cos(radians(i))*r;
        x1 = x3/2;
        x2 = x1;
        y1 = (-r/7+y3)/2;
        y2 = y1;

        stroke(196, 196, 196,100);
        bezierVertex(x1,y1,x2,y2,x3,y3);
        endShape();
        fill(196, 196, 196);
        noStroke();
        ellipse(x3,y3,5,5);
        pop();
    }
}

function BlockMove(event) {
	event.preventDefault() ;
}