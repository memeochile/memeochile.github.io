var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
var p001, p002, p003, p004, p005, p006, p007, p008, p009, p010, p011, p012, p013, p014, p015, p016, p017, p018, p019, p020, p021, p022, p023, p024, p025, p026, p027, p028;

init();
animate();

function init() {

	///////CREACION DE UNA ESCENA///////////////////
	scene = new THREE.Scene();

	let light = new THREE.PointLight(0xffffff, 1, 100); //creo nueva luz 
	light.position.set(0, 4, 4); //indico la posicion de la luz 
	light.castShadow = true; //activo la capacidad de generar sombras.
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
	camera = new THREE.Camera();
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

	//HAIYING
	p001 = new THREE.Group();
	p001.name = 'marker1';
	scene.add(p001);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, p001, {
		type: 'pattern',
		patternUrl: "data/haiying.patt",
	})

	let meme001 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader001 = new THREE.TextureLoader();
	let texture001 = loader001.load('./images/haiying.png')
	let material001 = new THREE.MeshBasicMaterial({map:texture001});

	let foto001 = new THREE.Mesh(meme001, material001);
	foto001.rotation.x = -Math.PI / 2;
	p001.add(foto001);

	//CONSTANZA
	p002 = new THREE.Group();
	p002.name = 'marker2';
	scene.add(p002);
	let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, p002, {
		type: 'pattern',
		patternUrl: "data/constanza.patt",
	})

	let meme002 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader002 = new THREE.TextureLoader();
	let texture002 = loader002.load('./images/constanza.png')
	let material002 = new THREE.MeshBasicMaterial({map:texture002});

	let foto002 = new THREE.Mesh(meme002, material002);
	foto002.rotation.x = -Math.PI / 2;
	p002.add(foto002);

	//IGNACIO
	p003 = new THREE.Group();
	p003.name = 'marker3';
	scene.add(p003);
	let markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, p003, {
		type: 'pattern',
			patternUrl: "data/kako.patt",
	})
	
	let meme003 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader003 = new THREE.TextureLoader();
	let texture003 = loader003.load('./images/kako.png')
	let material003 = new THREE.MeshBasicMaterial({map:texture003});
	
	let foto003 = new THREE.Mesh(meme003, material003);
	foto003.rotation.x = -Math.PI / 2;
	p003.add(foto003);

	//NICOLÁS
	p004 = new THREE.Group();
	p004.name = 'marker4';
	scene.add(p004);
	let markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, p004, {
		type: 'pattern',
			patternUrl: "data/nicolas.patt",
	})
	
	let meme004 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader004 = new THREE.TextureLoader();
	let texture004 = loader004.load('./images/Nicolás.png')
	let material004 = new THREE.MeshBasicMaterial({map:texture004});
	
	let foto004 = new THREE.Mesh(meme004, material004);
	foto004.rotation.x = -Math.PI / 2;
	p004.add(foto004);	

	//JUAN CARLOS
	p005 = new THREE.Group();
	p005.name = 'marker5';
	scene.add(p005);
	let markerControls5 = new THREEx.ArMarkerControls(arToolkitContext, p005, {
		type: 'pattern',
		patternUrl: "data/juanca.patt",
	})

	let meme005 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader005 = new THREE.TextureLoader();
	let texture005 = loader005.load('./images/juancarlos.png')
	let material005 = new THREE.MeshBasicMaterial({map:texture005});

	let foto005 = new THREE.Mesh(meme005, material005);
	foto005.rotation.x = -Math.PI / 2;
	p005.add(foto005);

	//CAMILIA
	p006 = new THREE.Group();
	p006.name = 'marker6';
	scene.add(p006);
	let markerControls6 = new THREEx.ArMarkerControls(arToolkitContext, p006, {
		type: 'pattern',
		patternUrl: "data/camila.patt",
	})

	let meme006 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader006 = new THREE.TextureLoader();
	let texture006 = loader006.load('./images/camila.png')
	let material006 = new THREE.MeshBasicMaterial({map:texture006});

	let foto006 = new THREE.Mesh(meme006, material006);
	foto006.rotation.x = -Math.PI / 2;
	p006.add(foto006);	
}

	//JUAN
	p007 = new THREE.Group();
	p007.name = 'marker7';
	scene.add(p007);
	let markerControls7 = new THREEx.ArMarkerControls(arToolkitContext, p007, {
		type: 'pattern',
		patternUrl: "data/juan.patt",
	})

	let meme007 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader007 = new THREE.TextureLoader();
	let texture007 = loader007.load('./images/juan.png')
	let material007 = new THREE.MeshBasicMaterial({map:texture007});

	let foto007 = new THREE.Mesh(meme007, material007);
	foto007.rotation.x = -Math.PI / 2;
	p007.add(foto007);

	//JAVIERA
	p008 = new THREE.Group();
	p008.name = 'marker8';
	scene.add(p008);
	let markerControls8 = new THREEx.ArMarkerControls(arToolkitContext, p008, {
		type: 'pattern',
		patternUrl: "data/javiera.patt",
	})

	let meme008 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader008 = new THREE.TextureLoader();
	let texture008 = loader008.load('./images/javiera.png')
	let material008 = new THREE.MeshBasicMaterial({map:texture008});

	let foto008 = new THREE.Mesh(meme008, material008);
	foto008.rotation.x = -Math.PI / 2;
	p008.add(foto008);

	//RODRIGO
	p009 = new THREE.Group();
	p009.name = 'marker9';
	scene.add(p009);
	let markerControls9 = new THREEx.ArMarkerControls(arToolkitContext, p009, {
		type: 'pattern',
			patternUrl: "data/rodrigo.patt",
	})

	let meme009 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader009 = new THREE.TextureLoader();
	let texture009 = loader009.load('./images/rodrigo.png')
	let material009 = new THREE.MeshBasicMaterial({map:texture009});

	let foto009 = new THREE.Mesh(meme009, material009);
	foto009.rotation.x = -Math.PI / 2;
	p009.add(foto009);

	//MICHELLE
	p010 = new THREE.Group();
	p010.name = 'marker10';
	scene.add(p010);
	let markerControls10 = new THREEx.ArMarkerControls(arToolkitContext, p010, {
		type: 'pattern',
			patternUrl: "data/michelle.patt",
	})

	let meme010 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader010 = new THREE.TextureLoader();
	let texture010 = loader010.load('./images/michelle.png')
	let material010 = new THREE.MeshBasicMaterial({map:texture010});

	let foto010 = new THREE.Mesh(meme010, material010);
	foto010.rotation.x = -Math.PI / 2;
	p010.add(foto010);	

	//NADEEM
	p011 = new THREE.Group();
	p011.name = 'marker11';
	scene.add(p011);
	let markerControls11 = new THREEx.ArMarkerControls(arToolkitContext, p011, {
		type: 'pattern',
		patternUrl: "data/nadeem.patt",
	})

	let meme011 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader011 = new THREE.TextureLoader();
	let texture011 = loader011.load('./images/nadeem.png')
	let material011 = new THREE.MeshBasicMaterial({map:texture011});

	let foto011 = new THREE.Mesh(meme011, material011);
	foto011.rotation.x = -Math.PI / 2;
	p011.add(foto011);

	//ISIDORA
	p012 = new THREE.Group();
	p012.name = 'marker12';
	scene.add(p012);
	let markerControls12 = new THREEx.ArMarkerControls(arToolkitContext, p012, {
		type: 'pattern',
		patternUrl: "data/isidora.patt",
	})

	let meme012 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader012 = new THREE.TextureLoader();
	let texture012 = loader012.load('./images/isidora.png')
	let material012 = new THREE.MeshBasicMaterial({map:texture012});

	let foto012 = new THREE.Mesh(meme012, material012);
	foto012.rotation.x = -Math.PI / 2;
	p012.add(foto012);	

	//FRANCISCA
	p013 = new THREE.Group();
	p013.name = 'marker13';
	scene.add(p013);
	let markerControls13 = new THREEx.ArMarkerControls(arToolkitContext, p013, {
		type: 'pattern',
		patternUrl: "data/francisca.patt",
	})

	let meme013 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader013 = new THREE.TextureLoader();
	let texture013 = loader013.load('./images/francisca.png')
	let material013 = new THREE.MeshBasicMaterial({map:texture013});

	let foto013 = new THREE.Mesh(meme013, material013);
	foto013.rotation.x = -Math.PI / 2;
	p013.add(foto013);

	//MANUEL
	p014 = new THREE.Group();
	p014.name = 'marker14';
	scene.add(p014);
	let markerControls14 = new THREEx.ArMarkerControls(arToolkitContext, p014, {
		type: 'pattern',
		patternUrl: "data/manuel.patt",
	})

	let meme014 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader014 = new THREE.TextureLoader();
	let texture014 = loader014.load('./images/manuel.png')
	let material014 = new THREE.MeshBasicMaterial({map:texture014});

	let foto014 = new THREE.Mesh(meme014, material014);
	foto014.rotation.x = -Math.PI / 2;
	p014.add(foto014);

	//MARTIN
	p015 = new THREE.Group();
	p015.name = 'marker15';
	scene.add(p015);
	let markerControls15 = new THREEx.ArMarkerControls(arToolkitContext, p015, {
		type: 'pattern',
			patternUrl: "data/martin.patt",
	})
	
	let meme015 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader015 = new THREE.TextureLoader();
	let texture015 = loader015.load('./images/martin.png')
	let material015 = new THREE.MeshBasicMaterial({map:texture015});
	
	let foto015 = new THREE.Mesh(meme015, material015);
	foto015.rotation.x = -Math.PI / 2;
	p015.add(foto015);

	//CAROLINA
	p016 = new THREE.Group();
	p016.name = 'marker16';
	scene.add(p016);
	let markerControls16 = new THREEx.ArMarkerControls(arToolkitContext, p016, {
		type: 'pattern',
			patternUrl: "data/carolina.patt",
	})
	
	let meme016 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader016 = new THREE.TextureLoader();
	let texture016 = loader016.load('./images/carolina.png')
	let material016 = new THREE.MeshBasicMaterial({map:texture016});
	
	let foto016 = new THREE.Mesh(meme016, material016);
	foto016.rotation.x = -Math.PI / 2;
	p016.add(foto016);	

	//DANIEL
	p017 = new THREE.Group();
	p017.name = 'marker17';
	scene.add(p017);
	let markerControls17 = new THREEx.ArMarkerControls(arToolkitContext, p017, {
		type: 'pattern',
		patternUrl: "data/daniel.patt",
	})

	let meme017 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader017 = new THREE.TextureLoader();
	let texture017 = loader017.load('./images/daniel.png')
	let material017 = new THREE.MeshBasicMaterial({map:texture017});

	let foto017 = new THREE.Mesh(meme017, material017);
	foto017.rotation.x = -Math.PI / 2;
	p017.add(foto017);

	//MAI
	p018 = new THREE.Group();
	p018.name = 'marker18';
	scene.add(p018);
	let markerControls18 = new THREEx.ArMarkerControls(arToolkitContext, p018, {
		type: 'pattern',
		patternUrl: "data/mai.patt",
	})

	let meme018 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader018 = new THREE.TextureLoader();
	let texture018 = loader018.load('./images/mai.png')
	let material018 = new THREE.MeshBasicMaterial({map:texture018});

	let foto018 = new THREE.Mesh(meme018, material018);
	foto018.rotation.x = -Math.PI / 2;
	p018.add(foto018);	


	//ANTONIA
	p019 = new THREE.Group();
	p019.name = 'marker19';
	scene.add(p019);
	let markerControls19 = new THREEx.ArMarkerControls(arToolkitContext, p019, {
		type: 'pattern',
		patternUrl: "data/antonia.patt",
	})

	let meme019 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader019 = new THREE.TextureLoader();
	let texture019 = loader019.load('./images/antonia.png')
	let material019 = new THREE.MeshBasicMaterial({map:texture019});

	let foto019 = new THREE.Mesh(meme019, material019);
	foto019.rotation.x = -Math.PI / 2;
	p019.add(foto019);

	//PABLO
	p020 = new THREE.Group();
	p020.name = 'marker20';
	scene.add(p020);
	let markerControls20 = new THREEx.ArMarkerControls(arToolkitContext, p020, {
		type: 'pattern',
		patternUrl: "data/pablo.patt",
	})

	let meme020 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader020 = new THREE.TextureLoader();
	let texture020 = loader020.load('./images/pablo.png')
	let material020 = new THREE.MeshBasicMaterial({map:texture020});

	let foto020 = new THREE.Mesh(meme020, material020);
	foto020.rotation.x = -Math.PI / 2;
	p020.add(foto020);

	//VALERIA
	p021 = new THREE.Group();
	p021.name = 'marker21';
	scene.add(p021);
	let markerControls21 = new THREEx.ArMarkerControls(arToolkitContext, p021, {
		type: 'pattern',
			patternUrl: "data/valeria.patt",
	})

	let meme021 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader021 = new THREE.TextureLoader();
	let texture021 = loader021.load('./images/valeria.png')
	let material021 = new THREE.MeshBasicMaterial({map:texture021});

	let foto021 = new THREE.Mesh(meme021, material021);
	foto021.rotation.x = -Math.PI / 2;
	p021.add(foto021);

	//ANGELES
	p022 = new THREE.Group();
	p022.name = 'marker22';
	scene.add(p022);
	let markerControls22 = new THREEx.ArMarkerControls(arToolkitContext, p022, {
		type: 'pattern',
			patternUrl: "data/angeles.patt",
	})

	let meme022 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader022 = new THREE.TextureLoader();
	let texture022 = loader022.load('./images/angeles.png')
	let material022 = new THREE.MeshBasicMaterial({map:texture022});

	let foto022 = new THREE.Mesh(meme022, material022);
	foto022.rotation.x = -Math.PI / 2;
	p022.add(foto022);	

	//NICOLE
	p023 = new THREE.Group();
	p023.name = 'marker23';
	scene.add(p023);
	let markerControls23 = new THREEx.ArMarkerControls(arToolkitContext, p023, {
		type: 'pattern',
		patternUrl: "data/nicole.patt",
	})

	let meme023 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader023 = new THREE.TextureLoader();
	let texture023 = loader023.load('./images/nicole.png')
	let material023 = new THREE.MeshBasicMaterial({map:texture023});

	let foto023 = new THREE.Mesh(meme023, material023);
	foto023.rotation.x = -Math.PI / 2;
	p023.add(foto023);

	//CARITO BU
	p024 = new THREE.Group();
	p024.name = 'marker24';
	scene.add(p024);
	let markerControls24 = new THREEx.ArMarkerControls(arToolkitContext, p024, {
		type: 'pattern',
		patternUrl: "data/carito.patt",
	})

	let meme024 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader024 = new THREE.TextureLoader();
	let texture024 = loader012.load('./images/carito.png')
	let material024 = new THREE.MeshBasicMaterial({map:texture024});

	let foto024 = new THREE.Mesh(meme024, material024);
	foto024.rotation.x = -Math.PI / 2;
	p024.add(foto024);

	//CAMILO
	p025 = new THREE.Group();
	p025.name = 'marker25';
	scene.add(p025);
	let markerControls25 = new THREEx.ArMarkerControls(arToolkitContext, p025, {
		type: 'pattern',
		patternUrl: "data/camilo.patt",
	})

	let meme025 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader025 = new THREE.TextureLoader();
	let texture025 = loader025.load('./images/camilo.png')
	let material025 = new THREE.MeshBasicMaterial({map:texture025});

	let foto025 = new THREE.Mesh(meme025, material025);
	foto025.rotation.x = -Math.PI / 2;
	p025.add(foto025);

	//JOSEFINA
	p026 = new THREE.Group();
	p026.name = 'marker26';
	scene.add(p026);
	let markerControls26 = new THREEx.ArMarkerControls(arToolkitContext, p026, {
		type: 'pattern',
			patternUrl: "data/josefina.patt",
	})

	let meme026 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader026 = new THREE.TextureLoader();
	let texture026 = loader026.load('./images/josefina.png')
	let material026 = new THREE.MeshBasicMaterial({map:texture026});

	let foto026 = new THREE.Mesh(meme026, material026);
	foto026.rotation.x = -Math.PI / 2;
	p026.add(foto026);

	//PAULA
	p027 = new THREE.Group();
	p027.name = 'marker27';
	scene.add(p027);
	let markerControls27 = new THREEx.ArMarkerControls(arToolkitContext, p027, {
		type: 'pattern',
			patternUrl: "data/paula.patt",
	})

	let meme027 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader027 = new THREE.TextureLoader();
	let texture027 = loader027.load('./images/paula.png')
	let material027 = new THREE.MeshBasicMaterial({map:texture027});

	let foto027 = new THREE.Mesh(meme027, material027);
	foto027.rotation.x = -Math.PI / 2;
	p027.add(foto027);	

	//PANCHA
	p028 = new THREE.Group();
	p028.name = 'marker28';
	scene.add(p028);
	let markerControls28 = new THREEx.ArMarkerControls(arToolkitContext, p028, {
		type: 'pattern',
		patternUrl: "data/pancha.patt",
	})

	let meme028 = new THREE.PlaneBufferGeometry(1,1.5,6,6);
	let loader028 = new THREE.TextureLoader();
	let texture028 = loader028.load('./images/pancha.png')
	let material028 = new THREE.MeshBasicMaterial({map:texture028});

	let foto028 = new THREE.Mesh(meme028, material028);
	foto028.rotation.x = -Math.PI / 2;
	p028.add(foto028);


///////automatico///////////////////////

function update() {
	// update artoolkit on every frame
	if (arToolkitSource.ready !== false)
		arToolkitContext.update(arToolkitSource.domElement);
}



function render() {
	renderer.render(scene, camera);
}


function animate() {
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}