

// orbit controls for testing/viewing


function loadMeshes () {
  const meshes = [testCube()]
  return meshes
};
function loadLights () {
  const lights = []

  const color = 0xFFFFFF
  const intensity = 100
  const lightOne = new THREE.DirectionalLight(color, intensity)
  lightOne.position.set(0, 0, 10)
  lightOne.castShadow = true

  lights.push(lightOne)
  return lights
};
function init (objects) {
  // Scene setup
  const scene = new THREE.Scene()
  for (let i = 0; i < objects.length; i++) {
    scene.add(objects[i])
  }
  return scene
};
function testCube () {
  // delete, just for testing
  const geometry = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4)
  const material = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)
  cube.scale.set(2, 2, 2)
  cube.name = 'testcube'
  return cube
};
function buildCamera () {
  const mm = 75 // lens
  const width = window.innerWidth
  const height = window.innerHeight
  const camera = new THREE.PerspectiveCamera(mm, width / height, 0.1, 1000)
  camera.position.set(0, 0, 6)
  return camera
};
function buildRenderer () {
  const canvas1 = document.getElementById("renderwindow");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas1, preserveDrawingBuffer: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  return renderer
};

function main () {

  const sceneObjects = [].concat(loadMeshes(), loadLights())
  const scene = init(sceneObjects)

  const loader = new THREE.GLTFLoader();
  loader.load( 'models/monkey.glb', function ( gltf ) {

  	scene.add( gltf.scene );

  }, undefined, function ( error ) {

  	console.error( error );

  } );


  const cam = buildCamera()
  const renderer = buildRenderer()

  const controls = new THREE.OrbitControls( cam, renderer.domElement );



  const animate = function () {
      requestAnimationFrame(animate)
      renderer.render(scene, cam)
  };
  animate()

};




main()
console.log('done')
