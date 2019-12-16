var ay_sound;
var img;

function setup() {
    createCanvas(windowWidth,windowHeight);
    console.log('setup');
    frameRate(30);
}

function preload() {
    //soundFormats('mp3');
    img = loadImage('image/soda.png');
    console.log('image loaded');
    ay_sound = loadSound('sound/soda.mp3');
    console.log('sound loaded');
  	ay_sound.setVolume(2);
}

function draw() {
//	var acc_x = floor(accelerationX);
//	var acc_y = floor(accelerationY);
    console.log('start draw');

    image(img,0,0,windowWidth,windowHeight);

    var acc_z = floor(accelerationZ);	
    if (acc_z > 10){
        ay_sound.play();
        img.y += acc_z;
        if (img.y < -0.3*windowHeight){
            acc_z = -acc_z;
        }
        if (img.y > 1.3*windowHeight){
            acc_z = -acc_z;
        }

    }
    // else if (acc_z < 3){
    //     ay_sound.stop();
    // }

}

function get_permission_to_use_motion() { // DO NOT CHANGE!
    if (typeof DeviceMotionEvent !== "undefined") { 
		if (typeof DeviceMotionEvent.requestPermission === 'function') {
		  DeviceMotionEvent.requestPermission()
			.then(permissionState => {
			  if (permissionState === 'granted') {
			  	document.getElementById("get_permission_button").style.display="none"	
			  	loop();		
			  }
			})
			.catch(console.error);
		} else{
			alert("not an ios13 device")
			console.log("not an ios13 device")
			document.getElementById("get_permission_button").style.display="none"	
		}
	
	}else {
			alert("not an mobile device")
			console.log("not an mobile device")
			document.getElementById("get_permission_button").style.display="none"	
	
    }
}

