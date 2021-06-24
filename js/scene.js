import * as THREE from './node_modules/three/build/three.module.js'

function loadMeshes () {
  const meshes = [testCube()]
  return meshes
};
function loadLights () {
  const lights = [];

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
  const color = 0xFFFFFF
  const intensity = 10
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(0, 0, 10)
  light.castShadow = true
  for (let i = 0; i < objects.length; i++) {
    scene.add(objects[i])
  }
  return scene
};
function testCube () {
  // delete, just for testing
  const geometry = new THREE.BoxGeometry(7, 7, 7, 10, 10, 10)
  const material = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)
  return cube
};
function buildCamera () {
  const mm = 75 // lens
  const width = window.innerWidth
  const height = window.innerHeight
  const camera = new THREE.PerspectiveCamera(mm, width / height, 0.1, 1000)
  return camera
};
function buildRenderer () {
  const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  document.body.appendChild(renderer.domElement)
  return renderer
};
function main () {
  const scene = init([].concat(loadMeshes(), loadLights()))
  const cam = buildCamera()
  const renderer = buildRenderer()
};

main()
console.log('done')
