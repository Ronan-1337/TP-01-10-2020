import { Image } from './Image.js';
let listeImages = [];

onload = ajaxCall;

function ajaxCall(){
	let xhr = new XMLHttpRequest();
	
	xhr.open("GET", "galerie_images.xml");
	xhr.send();
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			let response = xhr.responseXML;
			processResponse(response);
		}
	};
}

function processResponse(response){
	let nodeImages = response.getElementsByTagName("image");
	for(let i=0; i<nodeImages.length; i++){
		let category = nodeImages[i].getAttribute("categorie");	
		let name = nodeImages[i].getElementsByTagName("fichier")[0].firstChild.nodeValue;
		let legend = nodeImages[i].getElementsByTagName("legende")[0].firstChild.nodeValue;
		
		let image = new Image(category, name, legend);
		listeImages.push(image);
	}
	listeImages.forEach( i => {
		document.getElementById("gallery").innerHTML += "<img src=\"galeries\\"+ i.category +"\\"+ i.name +"\">";//<img src="galeries\i.category\i.name">
	});
	eventlisteners();
}

function eventlisteners(){
	let images = document.getElementsByTagName('img');

	for (let i = 0; i < images.length; i++){
		//console.log(images[i].getAttribute('src'));
		images[i].addEventListener("click", function(){ bigBoi(images[i].getAttribute('src')); });
	}
}

function bigBoi(src){
	let splitedSrc = src.split("\\");
	listeImages.forEach( i => {
		if (splitedSrc[1] == i.category && splitedSrc[2] == i.name){
			document.getElementById("big-boi").innerHTML = "<img src=\"galeries\\"+ i.category +"\\big\\"+ i.name +"\"><p>"+ i.legend +"</p>";
		}
	});
}