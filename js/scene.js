import * as THREE from './node_modules/three/build/three.module.js'

function loadMeshes () {
  const meshes = [testCube()]
  return meshes
};
function loadLights () {
  const lights = []

  const color = 0xFFFFFF
  const intensity = 10
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
  const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  return renderer
};
function animate (renderer, scene, camera) {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
function main () {
  const sceneObjects = [].concat(loadMeshes(), loadLights())
  const scene = init(sceneObjects)
  const cam = buildCamera()
  const renderer = buildRenderer()
  animate(renderer, scene, cam)
};

main()
console.log('done')
