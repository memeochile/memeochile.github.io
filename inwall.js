//variables globales 
let scene, camera, renderer, clock, deltaTime, totalTime;
let arToolkitSource, arToolkitContext;
let markerRoot1, markerRoot2;
let mesh1;
let raycaster;

let mouse = new THREE.Vector2();

let INTERSECTED;

let loaderFont = new THREE.FontLoader();

let labelRenderer;

let objects = []; //array donde agregaremos los objetos a detectar con el raycast
let IsClicked = false;


let font = loaderFont.load('./data/gentilis_bold.typeface.json');
let nameLabel;

import { CSS2DRenderer, CSS2DObject } from './libraries/renderers/CSS2DRenderer.js';


let meshBox2;

function app() {
	init();
	animate();
}
app();

function init() {

	///////CREACION DE UNA ESCENA///////////////////
	scene = new THREE.Scene();

	let light = new THREE.PointLight(0xffffff, 1, 100); //creo nueva luz 
	light.position.set(0, 4, 4); //indico la posicion de la luz 
	light.castShadow = true; //activo la capacidad de generar sombras.
	light.shadow.mapSize.width = 4096; //resolucion mapa de sombras ancho 
	light.shadow.mapSize.height = 4096;// resolucion mapa de sombras alto
	scene.add(light); //agrego la luz a mi escena    

	///////CREACION DE UNA LUCES///////////////////
	let lightSphere = new THREE.Mesh(
		new THREE.SphereGeometry(0.1),
		new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.8
		})
	);

	lightSphere.position.copy(light);
	scene.add(lightSphere);

	///////CREACION DE UNA CAMARA///////////////////
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	scene.add(camera);

	///////CREACION DEL RENDERER///////////////////
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize(1920, 1080);
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.body.appendChild(renderer.domElement);

	///////CREACION DE UN COUNTER///////////////////
	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType: 'webcam',
	});

	function onResize() {
		arToolkitSource.onResize()
		arToolkitSource.copySizeTo(renderer.domElement)
		if (arToolkitContext.arController !== null) {
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
		}
	}

	arToolkitSource.init(function onReady() {
		onResize()
	});

	// handle resize event
	window.addEventListener('resize', function () {
		onResize()
	});

	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});

	// copy projection matrix to camera when initialization complete
	arToolkitContext.init(function onCompleted() {
		camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls
	markerRoot1 = new THREE.Group();
	markerRoot1.name = 'marker1';
	scene.add(markerRoot1);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
		type: 'pattern',
		patternUrl: "data/hiro.patt",
	})


	//marcador 2
	markerRoot2 = new THREE.Group();
	markerRoot2.name = 'marker2';
	scene.add(markerRoot2);
	let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
		type: 'pattern',
		patternUrl: "data/kanji.patt",
	})

	/////////////////////////GEOMETRIAS//////////////////////////////

//01- CREACION CAJA
	 let geo1 = new THREE.BoxGeometry(1, 0, 1); //geometria box. 

	 let loader = new THREE.TextureLoader(); //objeto que me permite cargar una imagen

	 let texture1 = loader.load('./images/1.jpg'); //cargo la imagen desde la carpeta Images

	 let material1 = new THREE.MeshBasicMaterial(
	 	{
	 		transparent: true,
	 		map: texture1,
	 		side: THREE.FrontSide
	 	}
	 );  // crea un material que muestra las caras interiores de un objeto.  

	    mesh1 = new THREE.Mesh(geo1, material1); //creo un nuevo mesh


	mesh1.position.y = 0.01;

	markerRoot1.add(mesh1); //agrego el mesh al marcador y a la escena
	objects.push(mesh1);
	
	
	//02- CREACION GEOMETRIA MASCARA


	 //let geoMask = new THREE.BoxGeometry(1, 1, 1);
	 //console.log(geoMask.faces);
	 //geoMask.faces.splice(4, 2);

	 //let material2 = new THREE.MeshBasicMaterial(
	 	//{
	 		//colorWrite: false
	//}
	 //)

	 //let meshMask = new THREE.Mesh(geoMask, material2);
	 //meshMask.scale.set(1, 1, 1).multiplyScalar(1.015);
	 //meshMask.position.y = -0.5;
	 //markerRoot1.add(meshMask);

	 //Geometria Dentro de la caja
	 //let geoEsfera = new THREE.SphereGeometry(.25, 16, 16);
	 //let texture2 = loader.load('./images/tile.jpg'); //cargo la imagen desde la carpeta Images

	 //let material3 = new THREE.MeshLambertMaterial(
	 	//{
	 		//map: texture2,
	 		//side: THREE.DoubleSide
	 	//}
	 //);  // crea un material que muestra las caras interiores de un objeto. 

	 //let meshEsfera = new THREE.Mesh(geoEsfera, material3);
	 //meshEsfera.position.y = .01;
	 //objects.push(meshEsfera);
	 //markerRoot1.add(meshEsfera);




	//let box = new THREE.CubeGeometry(.5, .5, .5);

	//let matBox01 = new THREE.MeshLambertMaterial({
		//color: Math.random() * 0xffffff,
		//side: THREE.DoubleSide
	//});
	//let matBox02 = new THREE.MeshLambertMaterial({
		//color: Math.random() * 0xffffff,
		//side: THREE.DoubleSide
	//});

	//let meshBox1 = new THREE.Mesh(box, matBox01);
	//meshBox1.position.y = .2;


	//meshBox2 = new THREE.Mesh(box, matBox02);
	//meshBox2.position.y = .2;
	//meshBox2.position.x = -.6;
	//meshBox2.name = 'm2';
	//meshBox1.name = 'm1';
	//markerRoot1.add(meshBox1);
	//markerRoot1.add(meshBox2);

	//objects.push(meshBox1);
	//objects.push(meshBox2);



	//////AGREGAR TEXTO///////////
	labelRenderer = new CSS2DRenderer();
	labelRenderer.setSize(window.innerWidth, window.innerHeight);
	labelRenderer.domElement.style.position = 'absolute';
	labelRenderer.domElement.style.top = '0px';
	document.body.appendChild(labelRenderer.domElement);


	raycaster = new THREE.Raycaster();
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mousedown', onDocumentMouseDown, false);
}




///////funciones por defecto automaticas ///////////////////////

function update() {
	// update artoolkit on every frame
	if (arToolkitSource.ready !== false)
		arToolkitContext.update(arToolkitSource.domElement);
}


function render() {
	renderer.render(scene, camera);
	labelRenderer.render(scene, camera);
}


function animate() {
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();


}

//EVENTLISTENER CALLBACKS

function onDocumentMouseMove(event) {
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera); // Crea el rayo 

	let intersects = raycaster.intersectObjects(objects, false); //detectamos intersecciones de los objetos contenidos en un array llamado objects 
	if (intersects.length > 0) {

		if (INTERSECTED != intersects[0].object) {

			if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

			INTERSECTED = intersects[0].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex(0xff0000);


		}

	} else {
		if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
		INTERSECTED = null;

	}

}

let Isclicked = false;


function onDocumentMouseDown(event) {

	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(objects, false);

	Isclicked = !Isclicked;

	var nameDiv = document.createElement('div');
	nameDiv.id = 'tag';
	console.log(nameDiv);
	nameDiv.className = 'label';
	//nameDiv.textContent = intersects[0].object.name;
	nameDiv.style.marginTop = '-1em';
	nameLabel = new CSS2DObject(nameDiv);
	//

	if (intersects.length > 0) {
		nameLabel.position.set(intersects[0].object.position.x,.3,intersects[0].object.position.z);
		if (Isclicked === true) {
			
			intersects[0].object.add(nameLabel);
			const labelDiv = document.querySelector('#tag')
			labelDiv.innerHTML = intersects[0].object.name;
			nameLabel.position.set(intersects[0].object.position.x,.3,intersects[0].object.position.z);
		}
		if (Isclicked === false) {
			intersects[0].object.remove(nameLabel);
			//intersects[0].object.add(nameLabel);
			const labelDiv = document.querySelector('#tag')
			labelDiv.innerHTML = ''
		}
		
	}
}





function onResize() {
	arToolkitSource.onResize()
	arToolkitSource.copySizeTo(renderer.domElement)
	if (arToolkitContext.arController !== null) {
		arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
	}
}





