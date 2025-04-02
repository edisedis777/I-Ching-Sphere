// hexagramsRendering.js
import { hexagrams, paths } from "./hexagramsData.js";

export function positionHexagrams(THREE, scene, radius) {
  const hexagramObjects = [];
  const innerRadius = 1.0; // Radius for inner hexagrams (Levels 2 and 4)
  const centerHexagrams = [63, 64]; // Hexagrams to place near the center
  const level2Inner = [30, 57, 58]; // Level 2 inner hexagrams
  const level4Inner = [29, 51, 52]; // Level 4 inner hexagrams

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

    // Create a document-like card for each hexagram
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

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Create a material that is always facing the camera
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      sizeAttenuation: true,
      depthTest: false, // Ensures sprite renders on top
      depthWrite: false, // Prevents sprite from affecting depth buffer
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x, y, z);

    // Make sprites slightly smaller
    sprite.scale.set(0.5, 0.5, 0.5);

    // Special highlighting for specific hexagrams
    if (hex.no === 1) {
      // Red highlighting for hexagram 1 (top of sphere - North pole)
      const highlightCanvas = document.createElement("canvas");
      highlightCanvas.width = 128;
      highlightCanvas.height = 128;
      const highlightCtx = highlightCanvas.getContext("2d");
      highlightCtx.fillStyle = "rgba(255, 0, 0, 0.3)";
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

      // Add a text label for "North Pole"
      const labelCanvas = document.createElement("canvas");
      labelCanvas.width = 200;
      labelCanvas.height = 50;
      const labelCtx = labelCanvas.getContext("2d");
      labelCtx.fillStyle = "red";
      labelCtx.font = "bold 24px Arial";
      labelCtx.textAlign = "center";
      labelCtx.fillText("North", 100, 30);
      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelMaterial = new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(x, y + 0.4, z);
      label.scale.set(0.8, 0.2, 0.2);
      scene.add(label);
    } else if (hex.no === 2) {
      // Blue highlighting for hexagram 2 (bottom of sphere - South pole)
      const highlightCanvas = document.createElement("canvas");
      highlightCanvas.width = 128;
      highlightCanvas.height = 128;
      const highlightCtx = highlightCanvas.getContext("2d");
      highlightCtx.fillStyle = "rgba(0, 0, 255, 0.3)";
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

      // Add a text label for "South Pole"
      const labelCanvas = document.createElement("canvas");
      labelCanvas.width = 200;
      labelCanvas.height = 50;
      const labelCtx = labelCanvas.getContext("2d");
      labelCtx.fillStyle = "blue";
      labelCtx.font = "bold 24px Arial";
      labelCtx.textAlign = "center";
      labelCtx.fillText("South", 100, 30);
      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelMaterial = new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(x, y - 0.4, z);
      label.scale.set(0.8, 0.2, 0.2);
      scene.add(label);
    }

    scene.add(sprite);
    hexagramObjects.push({ sprite, data: hex });
  });

  return hexagramObjects;
}

export function drawPaths(THREE, scene, radius) {
  // Create a group for all paths
  const pathsGroup = new THREE.Group();
  scene.add(pathsGroup);

  // Create direct connections between top and bottom poles (hex 1 and hex 2)
  const polarConnection = { from: 1, to: 2 };

  // Create paths that start from the poles (hexagrams 1 and 2)
  const poleConnections = [];

  // Add the direct North-South connection
  poleConnections.push(polarConnection);

  // Connect hexagram 1 (North pole) to several other hexagrams
  for (let i = 10; i <= 60; i += 10) {
    if (i !== 20 && i !== 40) {
      poleConnections.push({ from: 1, to: i });
    }
  }

  // Connect hexagram 2 (South pole) to several other hexagrams
  for (let i = 7; i <= 57; i += 10) {
    if (i !== 17 && i !== 47) {
      poleConnections.push({ from: 2, to: i });
    }
  }

  // Add lateral connections between hexagrams at the equator
  const equatorConnections = [];
  const equatorialHexagrams = hexagrams.filter((h) => h.level === 3); // Get all hexagrams at the equator

  for (let i = 0; i < equatorialHexagrams.length - 1; i++) {
    equatorConnections.push({
      from: equatorialHexagrams[i].no,
      to: equatorialHexagrams[i + 1].no,
    });
  }
  // Close the equatorial loop
  equatorConnections.push({
    from: equatorialHexagrams[equatorialHexagrams.length - 1].no,
    to: equatorialHexagrams[0].no,
  });

  // Combine all paths
  const allPaths = [...paths, ...poleConnections, ...equatorConnections];

  // Function to get the surface position for a hexagram (even if it's inside)
  function getSurfacePosition(hex, radius) {
    const x = radius * Math.sin(hex.theta) * Math.cos(hex.phi);
    const y = radius * Math.cos(hex.theta);
    const z = radius * Math.sin(hex.theta) * Math.sin(hex.phi);
    return new THREE.Vector3(x, y, z);
  }

  allPaths.forEach((path) => {
    const fromHex = hexagrams.find((h) => h.no === path.from);
    const toHex = hexagrams.find((h) => h.no === path.to);

    if (!fromHex || !toHex) return; // Skip if hexagram not found

    // Get positions: if hex is inside, use its projection on the sphere's surface
    const fromPos = getSurfacePosition(fromHex, radius);
    const toPos = getSurfacePosition(toHex, radius);

    // Create a curved path between hexagrams on the sphere's surface
    const curvePoints = [];

    // Add points to create a curved path using great circle
    const A = fromPos.clone().normalize();
    const B = toPos.clone().normalize();
    const omega = Math.acos(A.dot(B));
    if (omega < 1e-6) {
      // If points are too close, just use straight line
      curvePoints.push(fromPos, toPos);
    } else {
      const numPoints = 20;
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const coeffA = Math.sin((1 - t) * omega) / Math.sin(omega);
        const coeffB = Math.sin(t * omega) / Math.sin(omega);
        const P = A.clone()
          .multiplyScalar(coeffA)
          .add(B.clone().multiplyScalar(coeffB));
        P.multiplyScalar(radius);
        curvePoints.push(P);
      }
    }

    // Create geometry from points
    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

    // Determine material based on connection type
    let material;
    const isDirectPoleConnection =
      (path.from === 1 && path.to === 2) || (path.from === 2 && path.to === 1);
    const isPoleConnection =
      path.from === 1 || path.from === 2 || path.to === 1 || path.to === 2;
    const isEquatorConnection = equatorConnections.some(
      (c) =>
        (c.from === path.from && c.to === path.to) ||
        (c.from === path.to && c.to === path.from)
    );

    if (isDirectPoleConnection) {
      // Special material for direct pole-to-pole connection (vibrant blue)
      material = new THREE.LineBasicMaterial({
        color: 0x0066ff, // Bright blue for pole-to-pole connection
        linewidth: 5, // Thicker line
        opacity: 1.0, // Fully opaque
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
    } else if (isPoleConnection) {
      // Colors based on which pole is connected
      if (path.from === 1 || path.to === 1) {
        // Red for North pole (hexagram 1) connections
        material = new THREE.LineBasicMaterial({
          color: 0xff0000, // Red for North pole connections
          linewidth: 3,
          opacity: 0.8,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
      } else {
        // Blue for South pole (hexagram 2) connections
        material = new THREE.LineBasicMaterial({
          color: 0x0000ff, // Blue for South pole connections
          linewidth: 3,
          opacity: 0.8,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
      }
    } else if (isEquatorConnection) {
      // Light blue for equatorial connections
      material = new THREE.LineBasicMaterial({
        color: 0x00aaff, // Light blue for equator
        linewidth: 2,
        opacity: 0.7,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
    } else {
      // Standard material for other paths
      material = new THREE.LineBasicMaterial({
        color: 0x666666, // Gray for regular connections
        linewidth: 1.5,
        opacity: 0.6,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
    }

    const line = new THREE.Line(geometry, material);
    pathsGroup.add(line);
  });

  return pathsGroup;
}

// Add a function to create grid lines on the sphere
export function createSphereGrid(THREE, scene, radius) {
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.3,
    depthTest: false, // Make grid visible through the sphere
    depthWrite: false, // Prevent grid from affecting the depth buffer
  });

  // Create longitude lines (vertical)
  for (let i = 0; i < 12; i++) {
    const phi = (i / 12) * Math.PI * 2;
    const points = [];

    for (let j = 0; j <= 32; j++) {
      const theta = (j / 32) * Math.PI;
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
  for (let i = 1; i < 6; i++) {
    const theta = (i / 6) * Math.PI;
    const points = [];

    for (let j = 0; j <= 32; j++) {
      const phi = (j / 32) * Math.PI * 2;
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
