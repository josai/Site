import * as THREE from './node_modules/three/build/three.module.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

function init () {
  // Scene setup
  const scene = new THREE.Scene()
  return scene
};
function buildCamera () {
  const mm = 75 // lens
  const width = window.innerWidth
  const height = window.innerHeight
  const camera = new THREE.PerspectiveCamera(mm, width / height, 0.1, 1000)
  const controls = new OrbitControls(camera, renderer.domElement)
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
  const scene = init()
  const renderer = buildRenderer()
};
