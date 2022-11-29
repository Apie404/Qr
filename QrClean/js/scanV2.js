	let img,input,submit ,etape = 0;
    
	//input
	let zoomIn;
	let importIn;
	let scanIn
	let divMove;
	let result;

	//rect red
	let Mx=0,My=0;

	//scanner variable
	let r, g, b, pixSize, startX, startY, tots;
	let arrayColor = [];

	function setup() {
		 canvas = createCanvas(800, 800);
		 zoomIn = document.getElementById("zoom");
		 fileInput = document.getElementById("fileInput");
		 scanIn = document.getElementById("submitScan");
		 importIn = document.getElementById("submitImport");
		 divMove = document.getElementById("move");
		 result = document.getElementById("result");
		 // stockage des input 
		 arrayColor = new Array;
	}


	function draw() {
		if(etape==1){
		rectMode(CENTER);
	    affIMG(0,0);
        document.getElementById("defaultCanvas0").style="width: 50%; height: auto;"; 
		noFill();
		strokeWeight( map(img.width, 0, 2000,1, 10));
		stroke("#f00");

		if(mouseIsPressed) {
		//	console.log(mouseX + " " + mouseY);
		//	console.log(mouseX < canvasSX*img.width && mouseX > 0 && mouseY > 0 && mouseY < canvasSY*img.height);
			if(mouseX < img.width && mouseX > 0 && mouseY > 0 && mouseY < img.height) {
			
			Mx = mouseX;
			My = mouseY;
			}
		}
		//rect(Mx,My,zoomIn.value,zoomIn.value);
		line(Mx-5,My,Mx+5,My);
		line(Mx,My-5,Mx,My+5);
		}
	}



	function affIMG(x,y){
		image(img,x,y);
	}

	function BaseToCanvas(base64) {
	    img = loadImage(base64);
	}

	function getBaseUrl() {
	    var file = document.querySelector('input[type=file]')['files'][0];
	    var reader = new FileReader();
	    var baseString;
	    reader.onloadend = function() {
	        baseString = reader.result;
	        BaseToCanvas(baseString);
	        importIn.className="dis";
	        console.log("Image Detect !");
	    };
	    reader.readAsDataURL(file);
	}

	function importImg() {
		etape++;
		fileInput.className="noDis";
		divMove.className="dis";
		importIn.className="noDis";
		scanIn.className="dis";
	    console.log("image import ! size :" + img.width +" / " + img.height + " etape : " + etape);

	    Mx = img.width/2;
	    My = img.height/2;
	   // zoomIn.value = img.width-5;

		resizeCanvas(img.width,img.height);
		background(0);
	}


	function scan() {
		etape++;
		divMove.className="noDis";
		scanIn.className="noDis"; 
		console.log("Scan Start !"+ " etape : " + etape);
	 	tots = 0;
	    pixSize = 1;
	    arrayColor = [];
	    // setup
	    noStroke();
	    imgSX = img.height;
	    imgSY = img.width;
	    startX = Math.floor(Mx);
	    startY = Math.floor(My);
	    
	    console.log( imgSX + " / " + imgSY+ " angle start" + startX + " " + startY );

	    //setup query
	   // queryAngle();

		//console.log("Qr found");
		//calc size of px and QR size of case
		QrSize();

		//dessine et ajoute les couleurs a l'array
	//	drawCanvas(startX,startY,tots,(790/img.width));
		// DrawQrScan();
		requar();
		//Transforme les couleurs en texte :)
		convertionArray();

	}

	function convertionArray() {
		let tempArray = [];
	    for(let i = 0 ; i < arrayColor.length;i++) {
	  
	        if(i/2==Math.floor(i/2)) {
	            tempArray.push(arrayColor[i]);
	          
	        } else {
	            tempArray[tempArray.length-1] = tempArray[tempArray.length-1] + "" + arrayColor[i];
              
	        }
	    }
	    
	    arrayColor = tempArray;
	    tempArray = [];
	    for(let i = 0;i < arrayColor.length;i++){
	        tempArray[i] = parseInt(arrayColor[i],16);
	    }
	    console.log(" ");
	    console.log("scan finish !!");

	    result.className ="dis"
	    result.innerHTML = asciitotext(hextodec(arrayColor));
	}

	function asciitotext(ascii) {
	    let charArray = ascii.split(",");
	    let result = "";
	    for (let i = 0; charArray.length > i; i++) {
	        result = result + String.fromCharCode(charArray[i]);
	    }
	    return result;
	}
	function hextodec(arr) {
	    let charArray = arr;
	    let result = "";
	    for (let i = 0; charArray.length > i; i++) {
	        result = result + parseInt(charArray[i], 16);
	        if (i < charArray.length - 1) {
	            result = result + ",";
	        }
	    }
	    return result;
	}

	function QrSize() {
				//calc size of pixel
		stroke(255,0,0);
		gcolor(startX, startY);
		for (i = 0; (r > 245 && g > 245 && b > 245); i++) {
	        startX--;

	        gcolor(startX, startY);
	        
	    }
	    startX++;
	    console.log("startX" + startX);
	    gcolor(startX, startY);
		for (i ; (r > 245 && g > 245 && b > 245); i++) {
	        gcolor(startX + i, startY);
	        pixSize = i;
	        console.log(i + " pixsize?");
	    }
	    startX+= Math.floor(pixSize/2);
		gcolor(startX, startY);
		for (i = 0; (r > 245 && g > 245 && b > 245); i++) {
	        gcolor(startX+2, startY);
	        startY--;
	    }
	    startY+= Math.floor(pixSize/2)+1;
	    //partie directionnel supprimer (retrouver dans backup)
	    //calcul de la taille du QR Code
	    let x, y, bool = true;
	    console.log("pixsize QrSize " + pixSize);
	    tots = 2;

	    while (bool) {
	        tots++;
	        x = startX + tots * pixSize;
	        y = startY + tots * pixSize;
	        gcolor(x, y);
	        if (!(r < 15 && g < 15 && b < 15)) {
	            bool = true;
	            if (x > imgSX) {
	                false;
	            }
	        } else {
	            bool = false;
	        }

	    }
	}

	function DrawQrScan() {
		resizeCanvas(800,800);
		background('#000');
		rectMode(CENTER);
		let size = 800/(tots+2);
		noStroke();
		for(let y = -1;y < tots+2 ; y++) {
			for(let x = -1; x < tots+2 ; x++) {
				gcolor(startX+(x*pixSize),startY+(y*pixSize));
				c = color(r, g, b);
	            fill(c);
	            noStroke();
                rect((x+1) * size, (y+1) * size, size, size );
                 //remplie l'array des couleurs
	            if(!((r > 250 && g > 250 && b > 250) || (r < 5 && g < 5 && b < 5) || (r < 5 && g > 250 && b > 250) || (r < 5 && g < 5 && b > 250))) {
		        	arrayColor.push(colorHex(r));
    	        	arrayColor.push(colorHex(g));
    	        	arrayColor.push(colorHex(b));
    	        	stroke(255,0,255);
    	        	point((x+1) * size, (y+1) * size);
		        } 
			}
		}
	}
	function requar() {
		rectMode(CENTER);
		let size = 800/(tots+2);
		noStroke();
		for(let y = -1;y < tots+2 ; y++) {
			for(let x = -1; x < tots+2 ; x++) {
				gcolor(startX+(x*pixSize),startY+(y*pixSize));
				c = color(r, g, b);

	            if(!((r > 250 && g > 250 && b > 250) || (r < 5 && g < 5 && b < 5) || (r < 5 && g > 250 && b > 250) || (r < 5 && g < 5 && b > 250))) {
		        	arrayColor.push(colorHex(r));
    	        	arrayColor.push(colorHex(g));
    	        	arrayColor.push(colorHex(b));
    	        	stroke(255,0,255);
    	        	point(startX+(x*pixSize),startY+(y*pixSize));
		        } 
			}
		}
	}

	function colorHex(color) {
    let hexa = 0;
        for(let i = 8.5;i < color ; i+=17) {
            hexa++;
        }
        return(hexa.toString(16))
    }

	function gcolor(x, y) {
		stroke(255,0,0);
		point(x,y);
	    r = img.get(x, y)[0];
	    g = img.get(x, y)[1];
	    b = img.get(x, y)[2];
	    // console.log(r,g,b + " pos : ",x,y);
	}
