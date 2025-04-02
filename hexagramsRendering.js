// hexagramsRendering.js - Optimized version
import { hexagrams } from "./hexagramsData.js";

export function positionHexagrams(THREE, scene, radius) {
  const hexagramObjects = [];
  const innerRadius = 1.0; // Radius for inner hexagrams (Levels 2 and 4)
  const centerHexagrams = [63, 64]; // Hexagrams to place near the center
  const level2Inner = [30, 57, 58]; // Level 2 inner hexagrams
  const level4Inner = [29, 51, 52]; // Level 4 inner hexagrams

  // Create canvas textures only once for better performance
  const textures = {};
  const createTextureCanvas = (hex) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    // White background with border
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 128, 128);

    // Add document-like lines
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(10, 30 + i * 10, 108, 1);
    }

    // Add hexagram number at the top
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${hex.no}`, 64, 20);

    // Draw the hexagram lines (solid for 1, broken for 0)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const y = 40 + i * 10; // Stack lines vertically
      ctx.beginPath();
      if (hex.lines[i] === "1") {
        // Solid line (yang)
        ctx.moveTo(44, y);
        ctx.lineTo(84, y);
      } else {
        // Broken line (yin)
        ctx.moveTo(44, y);
        ctx.lineTo(59, y);
        ctx.moveTo(69, y);
        ctx.lineTo(84, y);
      }
      ctx.stroke();
    }

    // Highlight the edges of the card to make it more visible
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 124, 124);

    return canvas;
  };

  // Pre-create commonly reused materials
  const spriteMaterialCache = new Map();

  hexagrams.forEach((hex) => {
    let x, y, z;

    if (centerHexagrams.includes(hex.no)) {
      // Place near the center, offset along the x-axis
      const offset = hex.no === 63 ? -0.1 : 0.1; // Offset for hex 63 and 64
      x = offset;
      y = 0;
      z = 0;
    } else if (level2Inner.includes(hex.no) || level4Inner.includes(hex.no)) {
      // Place at inner radius
      x = innerRadius * Math.sin(hex.theta) * Math.cos(hex.phi);
      y = innerRadius * Math.cos(hex.theta);
      z = innerRadius * Math.sin(hex.theta) * Math.sin(hex.phi);
    } else {
      // Place on the sphere's surface
      x = radius * Math.sin(hex.theta) * Math.cos(hex.phi);
      y = radius * Math.cos(hex.theta);
      z = radius * Math.sin(hex.theta) * Math.sin(hex.phi);
    }

    // Create texture canvas
    const canvas = createTextureCanvas(hex);
    const texture = new THREE.CanvasTexture(canvas);

    // Create material with optimized parameters
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      sizeAttenuation: true,
      depthTest: false,
      depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x, y, z);
    sprite.scale.set(0.5, 0.5, 0.5);

    // Special highlighting for the pole hexagrams
    if (hex.no === 1) {
      // Red highlighting for North pole (hexagram 1)
      addHighlight(
        THREE,
        scene,
        x,
        y,
        z,
        "rgba(255, 0, 0, 0.3)",
        "red",
        "North",
        y + 0.4
      );
    } else if (hex.no === 2) {
      // Blue highlighting for South pole (hexagram 2)
      addHighlight(
        THREE,
        scene,
        x,
        y,
        z,
        "rgba(0, 0, 255, 0.3)",
        "blue",
        "South",
        y - 0.4
      );
    }

    scene.add(sprite);
    hexagramObjects.push({ sprite, data: hex });
  });

  return hexagramObjects;
}

// Helper function to add highlights and labels to pole hexagrams
function addHighlight(
  THREE,
  scene,
  x,
  y,
  z,
  highlightColor,
  labelColor,
  labelText,
  labelY
) {
  // Create highlight sprite
  const highlightCanvas = document.createElement("canvas");
  highlightCanvas.width = 128;
  highlightCanvas.height = 128;
  const highlightCtx = highlightCanvas.getContext("2d");
  highlightCtx.fillStyle = highlightColor;
  highlightCtx.fillRect(0, 0, 128, 128);

  const highlightTexture = new THREE.CanvasTexture(highlightCanvas);
  const highlightMaterial = new THREE.SpriteMaterial({
    map: highlightTexture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

  const highlight = new THREE.Sprite(highlightMaterial);
  highlight.position.set(x, y, z);
  highlight.scale.set(0.55, 0.55, 0.55);
  scene.add(highlight);

  // Add label
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 200;
  labelCanvas.height = 50;
  const labelCtx = labelCanvas.getContext("2d");
  labelCtx.fillStyle = labelColor;
  labelCtx.font = "bold 24px Arial";
  labelCtx.textAlign = "center";
  labelCtx.fillText(labelText, 100, 30);

  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  const labelMaterial = new THREE.SpriteMaterial({
    map: labelTexture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

  const label = new THREE.Sprite(labelMaterial);
  label.position.set(x, labelY, z);
  label.scale.set(0.8, 0.2, 0.2);
  scene.add(label);
}

// Add a function to create grid lines on the sphere
export function createSphereGrid(THREE, scene, radius) {
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.3,
    depthTest: false,
    depthWrite: false,
  });

  // Optimize by creating fewer lines (reduced from 12 to 8 longitude lines)
  const longitudeCount = 8;
  const latitudeCount = 5;
  const segmentCount = 24; // Reduced from 32 segments per line

  // Create longitude lines (vertical)
  for (let i = 0; i < longitudeCount; i++) {
    const phi = (i / longitudeCount) * Math.PI * 2;
    const points = [];

    for (let j = 0; j <= segmentCount; j++) {
      const theta = (j / segmentCount) * Math.PI;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }

  // Create latitude lines (horizontal)
  for (let i = 1; i < latitudeCount; i++) {
    const theta = (i / latitudeCount) * Math.PI;
    const points = [];

    for (let j = 0; j <= segmentCount; j++) {
      const phi = (j / segmentCount) * Math.PI * 2;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }
}
