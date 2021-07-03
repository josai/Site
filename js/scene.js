

function dialog(txt) {
  var i = 0;
  var speed = 50; /* The speed/duration of the effect in milliseconds */
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("dialogText").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter()
}

function loadMeshes () {
  const meshes = [testCube()];
  console.log(meshes)
  return meshes
};
function getGLTFObjects(scene) {
  const loader = new THREE.GLTFLoader();
  let loadedObjects = [];
  let myObjects = ['models/villager.glb', 'models/platform.glb'];
  for (let i = 0; i < myObjects.length; i++) {
    loader.load( myObjects[i], function ( gltf ) {
      gltf.scene.traverse( function ( object ) {
       if ( object.isMesh ) {
           console.log(myObjects[i]);
           object.castShadow = true;
           object.receiveShadow = true;
           }
       } );
    	scene.add( gltf.scene );
    }, undefined, function ( error ) {
    	console.error( error );
    } );
  }

  return loadedObjects;
}
function loadLights () {
  const lights = []

  const color = 0xFFFFFF
  const intensity = 4
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(50, 500, 22);
  light.target.position.set(10, 10, 10);
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 10000;
  light.shadow.camera.left = -500;
  light.shadow.camera.bottom = -500;
  light.shadow.camera.right = 500;
  light.shadow.camera.top = 500;
  light.shadow.bias = -0.01;

  light.castShadow = true;
  light.shadow.radius = 6;
  console.log(light.shadow.camera);



  lights.push(light);
  lights.push(new THREE.AmbientLight(0xFFFFFF, intensity / 4));
  return lights
};
function init (objects, renderer) {
  // Scene setup
  const scene = new THREE.Scene()
  //Load background texture
  const texloader = new THREE.TextureLoader();
  texloader.load('models/background.jpg' , function(texture)
              {
                const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
                rt.fromEquirectangularTexture(renderer, texture);
                scene.background = rt.texture;
              });
  for (let i = 0; i < objects.length; i++) {
    console.log(objects[i])
    scene.add(objects[i])
  }
  getGLTFObjects(scene)
  return scene
};
function testCube () {
  // delete, just for testing
  const geometry = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4)
  const material = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)
  cube.scale.set(2, 2, 2);
  cube.position.set(0, 0, 0);
  cube.name = 'testcube';
  return cube
};

class Controller {
  // A controller for a character. Handles listening and exucution of user input
  constructor(character) {
    this.character = character;
    this.moveSpeed = 0.24;
    this.keysPressed = {};
    document.addEventListener('keydown', (event) => {
     this.keysPressed[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
      this.keysPressed[event.key] = false;
    });
  }
  update () {
    for (const [key, value] of Object.entries(this.keysPressed)) {
      if (value === true) {
        console.log(key, value);
        this.move(key)
      }
    }
  }
  move(key) {
    if (key == 'w') {
             this.character.translateZ( this.moveSpeed );
         }
        if (key == 's') {
             this.character.translateZ( -this.moveSpeed);
         }
         if (key == 'a') {
             this.character.rotation.y += this.moveSpeed;
         }
         if (key == 'd') {
             this.character.rotation.y -= this.moveSpeed;
         }
         if (key == 32) {
             this.character.position.set(0, 0, 0);
         }
      }
}

function buildCamera () {
  const mm = 75 // lens
  const width = window.innerWidth
  const height = window.innerHeight
  const camera = new THREE.PerspectiveCamera(mm, width / height, 0.1, 1000)
  camera.position.set(0.7266766457148011, 2.234444172194488, 24.567981456895367)
  return camera
};
function buildRenderer () {
  const canvas1 = document.getElementById("renderwindow");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas1, preserveDrawingBuffer: true,  antialiasing:true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  return renderer
};

function buildComposer(renderer, scene, cam) {
  const composer = new POSTPROCESSING.EffectComposer( renderer );
  const renderPass = new POSTPROCESSING.RenderPass( scene, cam);
  let vignette = new POSTPROCESSING.VignetteEffect();
  let bloom = new POSTPROCESSING.BloomEffect({"intensity":2});
  let dof = new POSTPROCESSING.DepthOfFieldEffect(cam, {focusDistance: 0.02, focalLength: 0.058, bokehScale: 3.0});

  const effectPass = new POSTPROCESSING.EffectPass(cam, dof, bloom, vignette,);
  effectPass.renderToScreen = true;
  composer.addPass( renderPass );
  composer.addPass(effectPass);
  return composer
}

function main () {

  const sceneObjects = [].concat(loadMeshes(), loadLights())

  const cam = buildCamera()
  const renderer = buildRenderer()
  const scene = init(sceneObjects, renderer);
  const character = scene.getObjectByName("testcube", true);
  const characterController = new Controller(character);

  const composer = buildComposer(renderer, scene, cam);
  const controls = new THREE.OrbitControls( cam, renderer.domElement );

  dialog('Hello and welcome to my CV!')
  const animate = function () {
      requestAnimationFrame(animate)
      composer.render(scene, cam)
      characterController.update();
  };
  animate()

};




main()
console.log('done')
