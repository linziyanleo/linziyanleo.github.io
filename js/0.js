// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Runner = Matter.Runner,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Constraint = Matter.Constraint;

// create an engine
var engine,world;
var circles = [];
var mConstraint;

let t = ["p5.js","Full Stack","C++","Python","Java","Data","Design","Premiere","Photoshop","IoT","UI","Database","SpringBoot","HTML","css", "Photography"];
let r= [6,7,7,6,6,3,2,3,3,4,1,1,2,4,3,4];


function setup () {
	var canvas =createCanvas (windowWidth, windowHeight); 
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	var options = {
		isStatic: true
	}
	ground = Bodies.rectangle( width/2, height, width*3,2, options);
	groundL = Bodies.rectangle( 0, height/2, 2,height*3,options);
	groundR = Bodies.rectangle( width, height/2, 2, height*3,options);
	groundT = Bodies.rectangle( width/2, -3000,width*3,100,options);
	World.add(world, [ground,groundL,groundR,groundT]);
	for(var i = 0 ; i < t.length; i++){
		var radius = map(r[i],0,10,20,70);
		var n = map(windowWidth,400,2000,1,2.5);
		circles.push(new Circle(random(width),random(-200,-2000), radius*n,t[i], 0));
	}


	var canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = 2; 
	var options = {
		mouse: canvasmouse
	}


	mConstraint = MouseConstraint.create(engine,options);
	World.add(world, mConstraint);
} 



function draw () {
	pixelDensity(2);
	background ('#445FAC');
	var percent = norm(sin(PI/2+frameCount/100), -1, 1);
	var between = lerpColor(color('#eedacf'),color('#f3f3f3'), percent);
	fill(between);
	noStroke();
	rect(0,0,width,height);

	fill('#ea7689');
	noStroke();
	var size = map(windowWidth,375,2000,14,22);
	textSize(size);
	textAlign(CENTER);
	textSize(size*2.5);
	
	text("Hi, I am Leo.", width/2, height*0.4 );
	textSize(size);
	textAlign(CENTER);
	text("Here is Leo Lin, or Ziyan Lin officially", width/2, height*0.45);
	text("I am a senior student in UCSB", width/2, height*0.48);
	text("Studying Computer Science and Media Art", width/2, height*0.51);
	text("And also want to learn more about life", width/2, height*0.54);

	for(var i = 0; i < t.length; i++){ 
		circles[i].show();
	}   

}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	location.replace("index.html")
}