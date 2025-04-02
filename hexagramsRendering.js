// hexagramsRendering.js - Optimized version for mobile
import { hexagrams } from "./hexagramsData.js";

export function positionHexagrams(THREE, scene, radius) {
  const hexagramObjects = [];
  const innerRadius = 1.0; // Radius for inner hexagrams (Levels 2 and 4)
  const centerHexagrams = [63, 64]; // Hexagrams to place near the center
  const level2Inner = [30, 57, 58]; // Level 2 inner hexagrams
  const level4Inner = [29, 51, 52]; // Level 4 inner hexagrams

  // Texture canvas size - reduce for mobile performance
  const canvasSize = window.innerWidth < 768 ? 96 : 128;

  // Create textures only once for better performance
  const createTextureCanvas = (hex) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");

    // White background with border
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvasSize, canvasSize);

    // Add document-like lines
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(10, 30 + i * 10, canvasSize - 20, 1);
    }

    // Add hexagram number at the top
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${hex.no}`, canvasSize / 2, 20);

    // Draw the hexagram lines (solid for 1, broken for 0)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    const centerX = canvasSize / 2;
    const lineWidth = canvasSize / 3;

    for (let i = 0; i < 6; i++) {
      const y = 40 + i * 10; // Stack lines vertically
      ctx.beginPath();
      if (hex.lines[i] === "1") {
        // Solid line (yang)
        ctx.moveTo(centerX - lineWidth / 2, y);
        ctx.lineTo(centerX + lineWidth / 2, y);
      } else {
        // Broken line (yin)
        ctx.moveTo(centerX - lineWidth / 2, y);
        ctx.lineTo(centerX - lineWidth / 6, y);
        ctx.moveTo(centerX + lineWidth / 6, y);
        ctx.lineTo(centerX + lineWidth / 2, y);
      }
      ctx.stroke();
    }

    // Highlight the edges of the card to make it more visible
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, canvasSize - 4, canvasSize - 4);

    return canvas;
  };

  // Determine sprite scale based on device size
  const spriteScale = window.innerWidth < 768 ? 0.4 : 0.5;

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
    texture.needsUpdate = true;

    // Create material with optimized parameters for mobile
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      sizeAttenuation: true,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      opacity: 0.95,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x, y, z);
    sprite.scale.set(spriteScale, spriteScale, spriteScale);
    sprite.userData = { hexagramNo: hex.no }; // Store reference for raycasting

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
        y + 0.4,
        spriteScale
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
        y - 0.4,
        spriteScale
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
  labelY,
  scale
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
    opacity: 0.7,
  });

  const highlight = new THREE.Sprite(highlightMaterial);
  highlight.position.set(x, y, z);
  highlight.scale.set(scale * 1.1, scale * 1.1, scale * 1.1);
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

// Add a function to create grid lines on the sphere - optimized for mobile
export function createSphereGrid(THREE, scene, radius) {
  // Determine grid complexity based on device
  const isMobile = window.innerWidth < 768;
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: isMobile ? 0.2 : 0.3,
    depthTest: false,
    depthWrite: false,
  });

  // Reduce complexity on mobile
  const longitudeCount = isMobile ? 6 : 8;
  const latitudeCount = isMobile ? 4 : 5;
  const segmentCount = isMobile ? 16 : 24;

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

  // Create fewer latitude lines (horizontal) on mobile for better performance
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
