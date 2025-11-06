// threejs.js
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { AsciiEffect } from 'three/examples/jsm/Addons.js';
import { GUI } from 'lil-gui';
import helvetiker from 'three/examples/fonts/helvetiker_bold.typeface.json';

console.log("Three.js version:", THREE.REVISION);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );

const gui = new GUI();
const params = {
    show_welcome: true
};

gui.add(params, 'show_welcome',0, true);

export function createScene(container) {

  if (!container) {
    console.error("Three.js container not found!");
    return;
  }
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(effect.domElement);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  try {
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(helvetiker);
    //lighting

    const light_1 = new THREE.PointLight(0xffffff, 3, 0, 0);
    light_1.position.set(0,0,0);
    scene.add(light_1)


    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = 'white';

    const geometry = new TextGeometry("Welcome", {
      font: font,
      size: 80,
      depth: 20,
      curveSegments: 12,
    });

    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.y -= 80;

    geometry.computeBoundingBox();
    const centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(centerOffset, 0, 0);

    camera.position.set(0, 50, 300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    function animate() {
      scene.remove(textMesh)
      if (params.show_welcome == true) {
        scene.add(textMesh)
        textMesh.rotation.y += 0.01;
      }
      effect.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

  } catch (error) {
    console.error("Error creating 3D text:", error);
  }
    

}

function resizeWindow() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resizeWindow);