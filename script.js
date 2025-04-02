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
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance", // Request high-performance GPU
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for mobile performance
document.getElementById("canvas").appendChild(renderer.domElement);

// Add lighting - simplified to one light for better performance
const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
scene.add(ambientLight);

// Add orbit controls with optimized settings
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

// Create the sphere with simplified geometry
const radius = 2;
const sphereGeometry = new THREE.SphereGeometry(radius, 24, 24); // Reduced from 32x32 to 24x24
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

// Position hexagrams
const hexagramObjects = positionHexagrams(THREE, scene, radius);

// Ensure all sprites and lines are rendered on top
scene.traverse(function (object) {
  if (object instanceof THREE.Sprite || object instanceof THREE.Line) {
    object.renderOrder = 1;
  }
});

// Raycaster for interactivity - optimized with cache
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let lastInteraction = 0;

function onInteract(event) {
  event.preventDefault();

  // Throttle interactions to 100ms to improve performance
  const now = Date.now();
  if (now - lastInteraction < 100) return;
  lastInteraction = now;

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

// Optimize event handlers with passive option where possible
window.addEventListener("click", onInteract);
window.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length === 1) {
      onInteract(event.touches[0]);
    }
  },
  { passive: false }
);

// Animation loop with optimized frame rate
let autoRotate = true;
let lastFrame = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function animate(timestamp) {
  requestAnimationFrame(animate);

  // Limit framerate for better performance
  if (timestamp - lastFrame < frameInterval) return;
  lastFrame = timestamp;

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

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, 250);
});

// Add reset button
const resetButton = document.createElement("button");
resetButton.textContent = "Reset View";
document.body.appendChild(resetButton);
resetButton.addEventListener("click", () => {
  camera.position.set(0, 0, 5.5);
  controls.target.set(0, 0, 0);
  controls.update();
});
