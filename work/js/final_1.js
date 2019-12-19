var myCanvas;
var imgIndex = -1;
var img;
var frame;
var uploadImg;
var graphics;
var X;
var Y;
var Z;

var imgNames = ['image/goose.gif', 'image/soda.png', 'image/me.jpg'];
var imgs = [];
var imgIndex = -1;

function preload() {
	for (let i = 0; i < imgNames.length; i++) {
		imgs.push(loadImage(imgNames[i]));
	}
}

function setup() {
	myCanvas = createCanvas(windowWidth, windowHeight);
	changeImage();
}

function paint(pic, x0, y0, z0){   

	pic.loadPixels();
	if(pic.height > height-50 || pic.width > width-50){
		var sca = height/pic.height;
		scale(sca);
		translate(width/2-pic.width*sca/2, height/2-pic.height*sca/2);
	}else{
		scale(1);
		translate(width/2-pic.width/2, height/2-pic.height/2);
	}

	let count = map(frame, 0, options.drawTimes, 2, 80);

	for (let i = 0; i < count; i++) {
		let x = int(random(pic.width))
		let y = int(random(pic.height))
		
		let index = (y*pic.width+x)*4;

		let r = pic.pixels[index];
		let g = pic.pixels[index+1];
		let b = pic.pixels[index+2];
		let a = pic.pixels[index+3];
		
		stroke(r, g, b, a);
		
		let sw = map(frame, 0, options.drawTimes, options.strokeWeight, 2);
		strokeWeight(sw);
		
		push();
		translate(x, y)
		
		let n = noise(x*options.noiseScale, y*options.noiseScale);
		rotate(radians(map(n, 0, 1, -180, 180)));
		
		let lengthVariation = random(0.75, 1.25);
		if (a!=0) { 
			//line(0, 0, options.strokeLength*lengthVariation, 0);
			line(x0, y0, options.strokeLength*lengthVariation, 0);
		}
		stroke(min(r*3, 255), min(g*3, 255), min(b*3, 255), random(100));
		strokeWeight(sw*0.8);
		if (a!=0) { 
			//line(0, -sw*0.15, options.strokeLength*lengthVariation, -sw*0.15);
			line(x0, y0-sw*0.15, options.strokeLength*lengthVariation, -sw*0.15);
		}
		pop();
	}
}

function draw() {
	if (frame > options.drawTimes) {
		return;
	}
	Z = map(floor(rotationZ),0,359,0,1);
	X = map(floor(rotationX),-180,180,0,1);
	Y = map(floor(rotationY),-90,90,0,1);

	let img = imgs[imgIndex];
	paint(img,X,Y,Z);

	frame++;
	frameRate(7);
}

function changeImage() {
	background(255);
	frame = 0;
	noiseSeed(int(random(1000)));
	imgIndex++;
	if (imgIndex >= imgNames.length) {
	  	imgIndex = 0;
	}
	imgs[imgIndex].loadPixels();
}

function mouseReleased() {
	changeImage();
}

function BlockMove(event) {
	event.preventDefault() ;
}