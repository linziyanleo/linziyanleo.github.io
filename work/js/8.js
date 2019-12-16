// var locationData;
var myCanvas;
var centerX, centerY;
var angle;
var lon = new Array();
var lat = new Array();
var magn = new Array();
var dept = new Array();

// function preload(){
// 	locationData =  getCurrentPosition(); //see https://github.com/bmoren/p5.geolocation#getcurrentposition-used-in-preload
//     console.log('preload loaded');
// }

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    console.log('canvas created');
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
    loadJSON(url, gotEQ);
    // loadJSON(url2, gotWeather);
}

function gotEQ(quakes){
    console.log('eq getting');
    for(var i = 0 ; i < quakes.metadata.count; i++){
        lon[i]=quakes.features[i].geometry.coordinates[0]
        lat[i]=quakes.features[i].geometry.coordinates[1]
        dept[i]=quakes.features[i].geometry.coordinates[2]
        mag[i]=quakes.features[i].properties.mag
    }
    console.log('eq got');
}

// function gotWeather(loc){
//     var locLat = locationData.latitude;
//     var locLon = locationData.longitude;
//     console.log('loc got:', locLat, locLon);
// }

var locLat = 34.420830;
var locLon = -119.698189;

function draw(){
    console.log('draw started');
    angle = floor(rotationZ);
    for (var i = 0; i < lat.length; i++){
        //if(lat[i] < locLat+10 && lat[i] > locLat-10 && lon[i] < locLon+10 && lon[i] > locLon-10 ){
            var CA = calculateAngle(locLat, locLon, lat[i], lon[i]) + angle;
            //console.log(CA);
            drawTriangle(lat[i],lon[i],magn[i],dept[i], CA);
            //triangle(centerX, centerY, windowWidth, (windowWidth)*Math.tan(CA),  windowWidth + dept[i]*magn[i], (windowWidth)*Math.tan(CA) + dept[i]*magn[i]);
            //console.log(windowWidth/2, (windowWidth/2)*Math.tan(CA));
        //}
        
    }
}

function drawTriangle(lat, lon, magn, dept, CA) {
    fill(6*dept, 0, 10+2*dept, 50);
    console.log(int(dept));
    if (lon < locLon){
        if(lat < locLat){
            triangle(centerX, centerY, 0, (windowWidth)*Math.atan(CA), windowWidth/2, 0);
        }
        else{
            triangle(centerX, centerY, 0, (windowWidth)*Math.tan(CA), 0, windowHeight/2);
        }
    }
    else{
        if(lat < locLat){
            //triangle(centerX, centerY, windowWidth, (windowWidth)*Math.tan(CA),  windowWidth/2, windowHeight);
            triangle(centerX, centerY, windowWidth, (windowWidth)*Math.tan(CA),  windowWidth, windowHeight/2);
        }
        else{
            //triangle(centerX, centerY, windowWidth, (windowWidth)*Math.tan(CA),  windowWidth, windowHeight/2);
            triangle(centerX, centerY, windowWidth, (windowWidth)*Math.atan(CA),  windowWidth/2, windowHeight);
        }
    }
}

function calculateAngle(x1, y1, x2, y2){
    var A = 0;
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (x2 == x1){
        A = Math.PI/2;
        if (y2 == y1){
            A = 0;
        }
        else if(y2 < y1){
            A = 3*Math.PI/2;
        }
    }
    else if(x2 > x1 && y2 > y1){
        A = Math.atan(dx/dy);
    }
    else if(x2 > x1 && y2 < y1){
        A = Math.PI/2+Math.atan(-dy/dx);
    }
    else if(x2 < x1 && y2 < y1){
        A = Math.PI + Math.atan(dx/dy);
    }
    else if(x2 < x1 && y2 > y1){
        A = 3*Math.PI/2 + Math.atan(dy/-dx);
    }
    return (A * 180/Math.PI);
}

function BlockMove(event) {
	event.preventDefault() ;
}