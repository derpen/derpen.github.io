import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(20, 20, 20)");
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );

// For some reason position is read only?
// Is there another way to use Vector directly?
const camera_pos = new THREE.Vector3(0.0, 3.0, 5.0);
camera.position.y = camera_pos.y;
camera.position.z = camera_pos.z;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Flashlight
const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.intensity = 2.0;
spotLight.angle = Math.PI/6;
spotLight.distance = 40;
spotLight.decay = 1;
spotLight.penumbra = 0.1; 

camera.add(spotLight);
spotLight.position.set( 0, 0, 1);
scene.add(camera);
spotLight.target = camera;
 
// // Flashlight debug, can be commented
// const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// camera.add(spotLightHelper);

// Controller
const fpsControl = new FirstPersonControls(camera, renderer.domElement);
fpsControl.lookSpeed = 0.1;
fpsControl.movementSpeed = 5.0;

const loader = new GLTFLoader();
loader.load( 'models/staircase.glb', function ( gltf ) {
  scene.add( gltf.scene );
}, undefined, function ( error ) {
  console.error( error );
} );

const time = new THREE.Clock();
function animate() {
	const delta = time.getDelta();

	renderer.render( scene, camera );
	fpsControl.update(delta);
}

renderer.setAnimationLoop( animate );