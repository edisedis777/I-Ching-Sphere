import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { positionHexagrams, createSphereGrid } from "./hexagramsRendering.js";

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for mobile performance
document.getElementById("canvas").appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.target.set(0, 0, 0);
camera.position.set(0, 0, 5.5);
controls.update();
controls.enablePan = false; // Disable panning for better mobile experience
controls.minDistance = 2; // Prevent zooming too close
controls.maxDistance = 10; // Limit zoom out

// Create the sphere
const radius = 2;
const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0xadd8e6,
  wireframe: false,
  transparent: true,
  opacity: 0.1,
  side: THREE.DoubleSide,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Add grid lines to the sphere
createSphereGrid(THREE, scene, radius);

// Position hexagrams and draw paths
const hexagramObjects = positionHexagrams(THREE, scene, radius);

// Ensure all sprites and lines are rendered on top
scene.traverse(function (object) {
  if (object instanceof THREE.Sprite || object instanceof THREE.Line) {
    object.renderOrder = 1;
  }
});

// Raycaster for interactivity
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function onInteract(event) {
  event.preventDefault();
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(
    hexagramObjects.map((o) => o.sprite)
  );
  if (intersects.length > 0) {
    const hex = hexagramObjects.find(
      (o) => o.sprite === intersects[0].object
    ).data;
    document.getElementById(
      "info"
    ).innerHTML = `<strong>${hex.number} - ${hex.simplifiedChinese} (${hex.pinyin}) - ${hex.english}</strong><br>
                  <span style="font-family: monospace;">Lines: ${hex.lines}</span><br>
                  <span>Level: ${hex.level}</span>`;
  }
}

// Add event listeners for both mouse and touch
window.addEventListener("click", onInteract);
window.addEventListener("touchstart", (event) => {
  if (event.touches.length === 1) {
    onInteract(event.touches[0]);
  }
});

// Animation loop with subtle rotation
let autoRotate = true;
function animate() {
  requestAnimationFrame(animate);
  if (autoRotate) {
    sphere.rotation.y += 0.001;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Toggle auto-rotation when interacting with controls
controls.addEventListener("start", function () {
  autoRotate = false;
});
controls.addEventListener("end", function () {
  setTimeout(() => {
    autoRotate = true;
  }, 3000);
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add reset button dynamically
const resetButton = document.createElement("button");
resetButton.textContent = "Reset View";
document.body.appendChild(resetButton);
resetButton.addEventListener("click", () => {
  camera.position.set(0, 0, 5.5);
  controls.target.set(0, 0, 0);
  controls.update();
});
