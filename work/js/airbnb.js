let numRows, numCols;
let dataMatrix = [];     //table
let dataMatrix1 = [];    //tableCalendar
let dataMatrix2 = [];    //tableReview
let sizeSet = [];
let size = 0;
let table, tableCalendar, tableReview;
let stars = [];
var height;
let font;

function preload(){
    table = loadTable("data/Asheville/listings.csv",'csv','header'); 
    tableCalendar = loadTable("data/Asheville/calendar.csv",'csv','header'); 
    tableReview = loadTable("data/Asheville/reviews.csv",'csv','header'); 

    //font = loadFont('../Sultan.otf');
}

function setup(){
    smooth(); 
    height = windowHeight;
    createCanvas(windowWidth,windowHeight,WEBGL);

    //table
    numRows= table.getRowCount();
    numCols= table.getColumnCount();
    //tableCalendar
    numRows1= tableCalendar.getRowCount();
    numCols1= tableCalendar.getColumnCount(); 
    //tableReview
    numRows2= tableReview.getRowCount();
    numCols2= tableReview.getColumnCount();  

    cam = createCamera();
    //textFont(font);
    textSize(windowWidth / 20);
    textAlign(CENTER, CENTER);
    
    for(var i = 0; i < numRows; i++){
        dataMatrix[i]= []; //create nested array
        dataMatrix[i][0] = table.getNum(i,0); //take their id
        dataMatrix[i][1] = table.getNum(i,45); //latitude
        dataMatrix[i][2] = table.getNum(i,46); //longitude
        dataMatrix[i][3] = table.getNum(i,71); //aviliable day
        //console.log(dataMatrix[i][3]);
        var price = table.getString(i,57);
        dataMatrix[i][4] = parseInt( price.substring(1)); //price
        dataMatrix[i][5] = table.getNum(i,50); //accomodate
        //dataMatrix[i][5] = table.getNum(i,76); //rating
    }
    for (var i = 0; i < 864; i++) {
        dataMatrix1[i] = [];
        for (var day = 0; day< 365; day++){
            dataMatrix1[i][day] = [];
            dataMatrix1[i][day][0] = tableCalendar.getNum(i*365+day,0); //id
            
            if (tableCalendar.getString(i*365+day,2) == 't'){
                dataMatrix1[i][day][1] = 1; //avaliable
                var price = tableCalendar.getString(i*365+day,3);
                dataMatrix1[i][day][2] = parseInt( price.substring(1) ); //price
                //console.log(dataMatrix1[i][day][2]);
            }
            else{
                dataMatrix1[i][day][1] = 0;
                dataMatrix1[i][day][2] = 0;
            }
        }
    }
    
    for(var i = 0; i < numRows; i++){
        stars[i] = new Star(dataMatrix[i]);
    }

}

let X = 0;
let Y = 0;
//let Z = (height/2)/Math.tan(Math.PI*30/180);
let Z = 0;
let centerX = 0;
let centerY = 0;
let centerZ = 0;
let title = 'Airbnb visualization in Asheville';
let rgb;

function draw(){
    orbitControl();
    lights();
    rgb = hexToRgb(options.Background);
    background(rgb.r, rgb.g, rgb.b, 30);
    //camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
    translate(X, Y, Z);
    //origin in WEBGL is the center of the canvas
    //box(50);
    for (var i = 0; i < numRows; i++){
        stars[i].display();
        if (options.Update == 'True'){
            stars[i].update();
        }
    }
    
    strokeWeight(10);
    stroke(51);
    line(-1000,1000,-100000,-1000,1000,700);
    line(100000,1000,700,-1000,1000,700);
    line(-1000,-1000000,700,-1000,1000,700);


    moveCamera();
    tiltCamera();
}

function drawStrip(){
    for (var i = 0; i <numRows; i++){
        cord = dataMatrix[i];
        stroke(120,120,120);
        strokeWeight(cord[0]/30000000);
        // let xPos = cord[1]*1000-35500;
        // let yPos = cord[2]*1000+82500;
        let xPos = cord[1]*3000-106500;
        let yPos = cord[2]*3000+247500;
        let zPos = log(cord[3])*100;
        line(xPos, yPos, -zPos , xPos, yPos, 5*zPos);
        //print("x: " + xPos + " , y: " + yPos);

        var lastT = 0;
        for (var day = 0; day < 365; day++){ 
            if (dataMatrix1[i][day][1] == 1){
                // stroke('green');
                // strokeWeight(dataMatrix1[i][day][2]/100);
                // point(xPos, yPos, -zPos+day*10); 
                if (lastT == 0){
                    lastT = day;
                }
            }
            else{
                if (lastT != 0){
                    stroke('red');
                    strokeWeight(dataMatrix1[i][day][2]);
                    line(xPos, yPos, lastT , xPos, yPos, day);
                    //console.log('LT '+lastT+' day '+day);
                }
                lastT = 0;
            }
        }
    }
}

function Star(cord){
    this.x = cord[1]*3000-106500;
    this.y = cord[2]*3000+247500;
    this.z = log(cord[3])*100;
    this.pz = this.z;
    this.px = this.x;
    this.py = this.y;

    this.angle = 0;

    this.display = function(){
        var sx = map(this.x/this.z/2, -1, 1, -windowWidth, windowWidth);
        var sy = map(this.y/this.z/2, -1, 1, -windowHeight, windowHeight);

        var r = map(dist(0,0,this.px,this.py),0,width/2, 0, 4.5);

        var n = map(150,0,200,0,900);
        var percent = norm(dist(sx,sy,0,0), 0, n);
        from = color(options.Color1);
        to = color(options.Color2);
        between = lerpColor(from, to, percent);

        stroke(between);
        strokeWeight(r);

        if(this.z >= 1 && sx <= windowWidth && sx > -windowWidth && sy > -windowHeight && sy < windowHeight ){
            line(this.px, -this.py, this.pz, sx, sy, this.pz);   
            this.px = sx;     
            this.py = sy; 
        }          
    }

    this.update = function(){
        this.z -= options.Speed*cord[4]/100;    
        if(this.z < 1 ){
            this.x = cord[1]*1000-35500;
            this.y = cord[2]*1000+82500;
            this.z = log(cord[3])*100;
            this.px = map(this.x/this.z/2, -1, 1, -windowWidth, windowWidth);
            this.py = map(this.y/this.z/2, -1, 1, -windowHeight, windowHeight);
        }
    }
}

function moveCamera() {
    if (keyIsDown(65)) {
        X += 5 ;
    } else if (keyIsDown(68)) {
        X -= 5;
    } else if (keyIsDown(87)) {
        Y += 5;
    } else if (keyIsDown(83)) {
        Y -= 5;
    } else if (keyIsDown(90)) {
        Z += 5;
    } else if (keyIsDown(88)) {
        Z -= 5;
    }
  }

function tiltCamera() {
    angleMode(DEGREES);
    if (keyIsDown(38)) { //up
        cam.tilt(-3);
    } else if (keyIsDown(40)) {//down
        cam.tilt(3);
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
  