<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>I Ching Sphere</title>
    <!-- Add favicon links -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☯</text></svg>">
    <style>
      body {
        margin: 0;
        overflow: hidden;
        background: #f0f0f0;
        font-family: Arial, sans-serif;
        touch-action: none;
      }
      #canvas {
        width: 100vw;
        height: 100vh;
        display: block;
        touch-action: none;
      }
      #title {
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        font-weight: bold;
        font-size: clamp(14px, 4vw, 18px);
        white-space: nowrap;
        z-index: 10;
      }
      #info {
        position: absolute;
        top: 4rem;
        left: 1rem;
        background: rgba(255, 255, 255, 0.95);
        padding: 0.75rem;
        border-radius: 0.25rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        max-width: 80vw;
        border-left: 4px solid #0066cc;
        font-size: clamp(12px, 3vw, 16px);
        z-index: 10;
        transition: opacity 0.2s;
      }
      .instructions {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: clamp(10px, 2.5vw, 12px);
        max-width: 80vw;
        z-index: 10;
        border-left: 4px solid #0066cc;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .instructions p {
        margin: 0.2rem 0;
      }
      #resetButton {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        padding: 0.5rem 0.75rem;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: clamp(12px, 3vw, 16px);
        z-index: 10;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.2s;
      }
      #resetButton:hover {
        background: #0055aa;
      }
      #resetButton:active {
        transform: translateY(1px);
      }
      #errorOverlay {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 1rem;
        border-radius: 0.5rem;
        border-left: 4px solid #cc0000;
        max-width: 80%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 100;
      }
      @media (max-width: 768px) {
        #title {
          top: 0.5rem;
          padding: 0.4rem 0.8rem;
        }
        #info {
          top: 3rem;
          left: 0.5rem;
          padding: 0.5rem;
          max-width: 90vw;
        }
        .instructions {
          padding: 0.4rem;
          font-size: clamp(9px, 2.5vw, 11px);
        }
        .instructions p {
          margin: 0.1rem 0;
        }
        #resetButton {
          bottom: 0.5rem;
          right: 0.5rem;
          padding: 0.4rem 0.6rem;
        }
      }
    </style>
  </head>
  <body>
    <div id="canvas"></div>
    <div id="title">I Ching Sphere</div>
    <div id="info">Click on any hexagram to see details</div>
    <div class="instructions">
      <p><strong>Instructions:</strong></p>
      <p>• Drag to rotate the sphere</p>
      <p>• Pinch to zoom in/out</p>
      <p>• Tap on any hexagram to view its details</p>
    </div>
    <button id="resetButton">Reset View</button>
    <div id="errorOverlay"></div>
    
    <script>
      // Intercept network errors before loading modules
      window.addEventListener('error', function(event) {
        // Ignore favicon errors - they're harmless
        if (event.target && event.target.tagName === 'LINK' && 
            event.target.rel === 'icon' || event.target.href?.includes('favicon')) {
          return;
        }
        
        if (event.target && (event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
          console.error('Resource loading error:', event);
          document.getElementById('errorOverlay').style.display = 'block';
          document.getElementById('errorOverlay').innerHTML = 
            '<h3>Resource Loading Error</h3>' +
            '<p>There was an error loading resources for this page. This might be due to CORS restrictions.</p>' +
            '<p>Error details: ' + (event.target.src || event.target.href) + '</p>';
        }
      }, true);
      
      // Override fetch to catch CORS issues
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url && url.toString().includes('jreader-bucket.s3.us-east-1.amazonaws.com')) {
          console.warn('Blocked fetch request to:', url);
          return Promise.resolve(new Response('', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          }));
        }
        
        // Also suppress favicon errors in fetch
        if (url && url.toString().includes('favicon.ico')) {
          console.warn('Ignoring favicon.ico request');
          return Promise.resolve(new Response('', {
            status: 200,
            headers: { 'Content-Type': 'image/x-icon' }
          }));
        }
        
        return originalFetch.apply(this, arguments);
      };
    </script>
    
    <script type="importmap">
      {
        "imports": {
          "three": "https://esm.sh/three@0.165.0",
          "three/addons/": "https://esm.sh/three@0.165.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="script.js"></script>
  </body>
</html>
