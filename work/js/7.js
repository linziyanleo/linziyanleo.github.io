var list = [];
var rad;
var on = false;

function setup() {

    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    // for(var index = 0; index < 30; index++) {
    //     list[index] = new dot(random(rad-10,rad+10),random(400,600),random(10)/10,random(10)*Math.PI/5,false);
    // }

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBZqIU5pLUTum1JV76fue5Mye3oD4tt9eU",
        authDomain: "art102mm-7.firebaseapp.com",
        databaseURL: "https://art102mm-7.firebaseio.com",
        projectId: "art102mm-7",
        storageBucket: "art102mm-7.appspot.com",
        messagingSenderId: "984040752239",
        appId: "1:984040752239:web:6de303ae19a1ec03f4f99a",
        measurementId: "G-C8369LW1BG"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    
    db.collection("users").doc("add_doc").onSnapshot(function(returndata) {
		var X=returndata.data().mouse_x
        var Y=returndata.data().mouse_y
        var dotMouse = {x:X, y:Y, s:2, d:random(10)*Math.PI/5, t:false}

        append(list,dotMouse);
	});

}

/*
var dot1 = {x:500, y:600, s:0.1, d:0, t:false};
var dot2 = new dot(450,550,0.2,Math.PI/6,false);
var dot3 = {x:420, y:400, s:-1, d:Math.PI/9, t:false};
var dot4 = {x:600, y:400, s:0.3, d:Math.PI/12, t:false};
var dot5 = {x:700, y:500, s:4, d:0, t:false};
var dot6 = {x:400, y:400, s:-4, d:Math.PI*5/9, t:false};
var dot7 = {x:650, y:500, s:0.1, d:Math.PI/2, t:false};
var dot8 = {x:700, y:600, s:-0.3, d:Math.PI/13, t:false};
var dot9 = {x:500, y:400, s:-0.5, d:Math.PI/3, t:false};

var list = [dot1,dot2,dot3,dot4,dot5,dot6,dot7,dot8,dot9];
*/

function draw() {
    console.log(list.length);
    background(255, 255, 255);
    drawCircle(1);
    if (on) {
        mouseClicked();
    }
    for (var i = 0; i < list.length-1; i++) {
        dotMove(list[i]);
        var triList = [];
        for (var j = i+1; j < list.length; j++) {
            if (dist(list[i].x,list[i].y,list[j].x,list[j].y) <= 100){
                append(triList,list[j]);
            }
        }
        if (triList.length >= 2) {
            for (var k = 0; k < triList.length-1; k++) {
                for (var l = k+1; l < triList.length; l++){
                    drawTriangle(list[i],triList[k],triList[l]);
                }
            }
        }
    }
}

function drawCircle(num) {
    noStroke();
    if (num == 1) {
        fill(0,0,0);
    }
    else {
        fill(255,255,255);
    }
    //fill(255,255,255);
    if (windowHeight < windowWidth) {
        rad = 0.8 * windowHeight;
    }
    else {
        rad = 0.8 * windowWidth;
    }
    ellipse(windowWidth/2,windowHeight/2,rad,rad);
}



/*
var dot1 = {x:500, y:600, s:1, d:0, t:false};
var dot2 = {x:450, y:550, s:2, d:Math.PI/6, t:false};
var dot3 = {x:420, y:400, s:-1, d:Math.PI/9, t:false};
var dot4 = {x:600, y:400, s:3, d:Math.PI/12, t:false};
var dot5 = {x:700, y:500, s:4, d:0, t:false};
var dot6 = {x:400, y:400, s:-4, d:Math.PI*5/9, t:false};
var dot7 = {x:650, y:500, s:5, d:Math.PI/2, t:false};
var dot8 = {x:700, y:600, s:-3, d:Math.PI/13, t:false};
var dot9 = {x:500, y:400, s:-0.5, d:Math.PI/3, t:false};
*/

function drawTriangle(point1, point2, point3) {
    //colorMode(HSB,360,100,100,100);
    if (dist(point1.x,point1.y,windowWidth/2,windowHeight/2) <= rad/2) {
        if (dist(point2.x,point2.y,windowWidth/2,windowHeight/2) <= rad/2){
            if (dist(point3.x,point3.y,windowWidth/2,windowHeight/2) <= rad/2){
                var a = map(point1.x,rad/4,windowWidth/2 + rad/4 , 35,185);
                var b = map(point2.x,rad/4,windowWidth/2 + rad/4 , 60,185);
                var c = map(point3.x,rad/4,windowWidth/2 + rad/4 , 50,185);
                fill(a,b,c);
                //fill('white');
                triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
            }
        }
    }
    
}

function dotMove(dot) {
    var a = map(dot.x,rad/4,windowWidth/2 + rad/4 , 50,185);
    var b = map(dot.y,rad/4,windowWidth/2 + rad/4 , 50,185);
    fill(a,255,b);
    ellipse(dot.x,dot.y,3,3);
    if (dist(dot.x,dot.y,windowWidth/2,windowHeight/2) >= rad/2) {
        dot.t = !dot.t;
    }
    if (dot.t){
        dot.x = dot.x + dot.s;
        dot.y = dot.y + dot.s*sin(dot.d);
    }
    else {
        dot.x = dot.x - dot.s;
        dot.y = dot.y - dot.s*sin(dot.d);
    }
}

// function mouseClicked() {

//     if (dist(mouseX,mouseY,windowWidth/2,windowHeight/2) <= rad/2) {
//         var dotMouse = {x:mouseX, y:mouseY, s:2, d:random(10)*Math.PI/5, t:false};
//         append(list,dotMouse);
//         on = !on;
//     }
// }

function mousePressed() {
    db.collection("users").doc("add_doc").update({
        mouse_x : mouseX,
        mouse_y : mouseY
    })
}

function dot(dot_x,dot_y,dot_s,dot_d,dot_t) {
    this.x = dot_x;
    this.y = dot_y;
    this.s = dot_s;
    this.d = dot_d;
    this.t = dot_t;
    
    this.isCollided = function(otherX,otherY) {
        if (dist(this.x,this.y,otherX,otherY) <= 6){
            return true;
        }
    }
}

function BlockMove(event) {
	event.preventDefault() ;
}