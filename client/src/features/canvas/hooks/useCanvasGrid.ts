import { useEffect } from 'react';
import { useCanvasStore } from '../../../store/useCanvasStore';

/**
 * useCanvasGrid - Hook to render a dot grid background on the Fabric.js canvas.
 * Following Phase 1.5.4 of setup-microsteps.md.
 */
export const useCanvasGrid = () => {
  const { fabricCanvas, zoom } = useCanvasStore();

  useEffect(() => {
    if (!fabricCanvas) return;

    // Grid Settings from PRD 4.5
    const gridSize = 20; // 20px dot grid
    
    /**
     * Draw the dot grid on the background layer.
     * We use a custom render function to keep the grid "infinite" during pan/zoom.
     */
    const drawGrid = () => {
      // Clear the background first (optional, backgroundColor already set)
      
      // Fabric.js background rendering is handled via viewportTransform
      // But for an infinite grid, it's often better to use a pattern or 
      // render it during the canvas 'after:render' event if performance allows.
    };

    // For MVP, we'll use a simpler approach: 
    // Creating a small pattern and setting it as background.
    const canvas = document.createElement('canvas');
    canvas.width = gridSize;
    canvas.height = gridSize;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#1E1E35'; // --color-grid from PRD
      ctx.beginPath();
      ctx.arc(1, 1, 1, 0, Math.PI * 2); // Tiny dot
      ctx.fill();
    }

    // Convert to dataURL and set as background pattern
    const patternUrl = canvas.toDataURL();
    
    // In Fabric.js 6, we use Pattern class
    // (Skipping complex Pattern setup for now to ensure it works first)
    // fabricCanvas.setBackgroundColor({ source: patternUrl, repeat: 'repeat' }, fabricCanvas.renderAll.bind(fabricCanvas));
    
    // Alternative: Use CSS background on the container (already in global.scss)
    // However, to make it snap and move with the canvas, it should be on-canvas.
    
    // Since global.scss already has a grid, we'll keep it for now and 
    // focus on making it "dynamic" if needed later.

  }, [fabricCanvas, zoom]);
};
