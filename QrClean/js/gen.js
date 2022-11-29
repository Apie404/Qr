//convertion var
let arraycolor = []; 
let hex;
// draw var
let sizeX = 50, sizeY = 50, space =1,i;

function setup() {
    let canvas=	createCanvas(800,800);
	let c = color('#ff0');

	rectMode(CORNER);
}
function gen() {
	genColor(document.getElementById('scan').value);
}

function drawQr() {
		
		background("#00f");
		noStroke();
		translate(1*space,1*space);
		i=0;
		for(let y = 0;sizeY > y ; y++){
			for(let x = 0;sizeX > x ; x++){
					//test angle ?
					
					if((y < 2 && x < 2 ) ||(y > sizeY-2 && x > sizeX-2)){
						//angle
						fill("#000");
					if(y == 0 && x==0) {
						//angle centre
						fill("#fff");
					}
						rect(x*space,y*space,space,space);
					} else {
						//couleurs

					if(arraycolor.length > i) {
						fill(color(arraycolor[i]));

					} else {
						fill("#0ff");

					}
					rect(x*space,y*space,space,space);
					i++;
				}
				
			}
		}
		
}


//outil general de msg -> arraycolor
function genColor(msg){
    console.log(msg);
    text = msg.replace(/(\r\n|\n|\r)/gm,'<br />');
 	hex = hextocolor(dectohex(texttoascii(text.toString())));
	arraycolor = hex.split(" ");
	sizeX=0;
	sizeY=0;
	for(let i =0;arraycolor.length>(sizeX*sizeY)-5 || arraycolor.length==(sizeX*sizeY)-5 ;i++){
		sizeY++;
		sizeX++;
	}
	space = document.getElementById('res').value
	resizeCanvas((sizeX+2)*space,(sizeY+2)*space,true);
	console.log("APIE QR");
	console.log("the size is " + sizeX+"*"+sizeY);
	console.log("that "+ (sizeX*sizeY-5) +" usable color !");
	console.log("you can stock "+ (sizeX*sizeY-5)*1.5 + " charactere :)");
	drawQr();
    saveCanvas(canvas, 'Qr', 'png');
    resizeCanvas(800,800,true);
    space=800/(sizeX+2);
    drawQr();
}

//transforme converted text into color
	function hextocolor(hexadecimal){
			let charArray=hexadecimal.split(",");
			charArray = charArray.join("");
			charArray = charArray.split("");
			let result = "#";
		for(let i = 0;charArray.length > i ; i++){
			result = result + charArray[i];
			if((i+1)/3 == round((i+1)/3) & i < charArray.length-1 ){
				result = result + " #";
			}
			
			if(i == charArray.length-1) {
				// pour avoir 3 couleurs a la fin
				if(round(((((i+1)/3)%1)*100)) == round((1/3)*100)) {result = result +"00";}
				if(round(((((i+1)/3)%1)*100)) == round((2/3)*100)) {result = result +"0" ;}
			}
		}
		return result;
	}

// the part of convertion V
		function  hextodec(text){
			let charArray=text.split(",");
			let result = "";
			for(let i = 0;charArray.length > i ; i++){
				result = result + parseInt(charArray[i],16);
				if(i < charArray.length-1){
					result = result +",";
				}
			}
			return result;
		}


		function texttoascii(text){
			let charArray=text.split("");
			let result = "";
			for(let i = 0;charArray.length > i ; i++){
				result = result + charArray[i].charCodeAt(0) ;
				if(i < charArray.length-1){
					result = result +",";
				}
			}
			return result;
		}

		function  dectohex(text){
			let charArray=text.split(",");
			let result = "";
			for(let i = 0;charArray.length > i ; i++){
				result = result + parseInt(charArray[i]).toString(16);
				if(i < charArray.length-1){
					result = result +",";
				}
			}
			return result;
		}

		function asciitotext(ascii){
			let charArray=ascii.split(",");
			let result = "";
			for(let i = 0;charArray.length > i ; i++){
				result = result + String.fromCharCode(charArray[i]);
			}
			return result;
		}