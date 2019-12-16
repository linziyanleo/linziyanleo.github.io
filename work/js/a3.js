var on = false;
var circle = [[500,375]];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
}

var ang = 0;
var r = 1;
var trigger = false;

function draw() {
    background(0,0,0);
    //mousePressed();
    for (var i = 0; i < circle.length; i++){
        drawCircle(circle[i][0],circle[i][1],circle[i][2]);
        if (circle[i][1] > 10){
            trigger = true;
        }
        else if (circle[i][1] < 1){
            trigger = false;
        }
        if (trigger = false){
            circle[i][2] = circle[i][2] + 1;
        }
        else if (trigger = true){
            circle[i][2] = circle[i][2] - 1;
        }
    }    
    if (on) {
        ang += .004;
        drawLines(ang);
        //for (var i = 0; ;i++){
        append(circle,[x,y,r]);
        //}
    }
    else {
        ang = constrain(mouseX/mouseY + 8,9,12);
        drawLines(ang);
        console.log(ang);
    }
}

function drawLines(ang){
    rotate(ang*PI/9);
    for (i = -100; i < 100; i++){
        noStroke();
        fill(255,255,255);
        rect(-1300,-i*25-200,1301,10);
    }
}

var x;
var y;
//var V = {r : 5};

function drawCircle(X,Y,r) {
    fill('black');
    stroke('white');
    strokeWeight(3);
    //var l = noise(V.r)*50;
    //for (j = 0; j <= 300; j++){
    ellipse(X,Y,r);
    //}
    /*
    ellipse(X,Y,r++,r++);
    ellipse(X,Y,r,r);
    
    */
}
function mousePressed(){
    x = mouseX;
    y = mouseY;
    on = !on;
}