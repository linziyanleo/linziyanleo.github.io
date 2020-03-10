let numRows, numCols;
let dataMatrix = [];     //table
let dataMatrix1 = [];    //tableCalendar
let dataMatrix2 = [];    //tableReview
let sizeSet = [];
let size = 0;
let table, tableCalendar, tableReview;
let stars = [];

function preload(){
    table = loadTable("data/Asheville/listings.csv",'csv','header'); 
    tableCalendar = loadTable("data/Asheville/calendar.csv",'csv','header'); 
    tableReview = loadTable("data/Asheville/reviews.csv",'csv','header'); 
}

function setup(){
    smooth();
 
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

function draw(){
    orbitControl();
    lights();
    background(10);
    //origin in WEBGL is the center of the canvas
    //drawStrip();
    for (var i = 0; i < numRows; i++){
        stars[i].display();
        stars[i].update();
    }
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
                    console.log('LT '+lastT+' day '+day);
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

        var n = map(150,0,200,0,windowWidth);
        var percent = norm(dist(sx,sy,0,0), 0, n);
        from = color(213,cord[5]/5,33);
        to = color(cord[4],150,159);
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
        this.z -= cord[4]/100;    
        if(this.z < 1 ){
            this.x = cord[1]*1000-35500;
            this.y = cord[2]*1000+82500;
            this.z = log(cord[3])*100;
            this.px = map(this.x/this.z/2, -1, 1, -windowWidth, windowWidth);
            this.py = map(this.y/this.z/2, -1, 1, -windowHeight, windowHeight);
        }
    }
}