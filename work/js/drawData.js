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