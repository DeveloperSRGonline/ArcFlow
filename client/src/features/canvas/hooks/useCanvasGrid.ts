import { useEffect } from 'react';
import { Pattern } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';

/**
 * useCanvasGrid - Hook to render a dot grid background on the Fabric.js canvas.
 * Following Phase 1.5.4 of setup-microsteps.md.
 */
export const useCanvasGrid = () => {
  const { fabricCanvas } = useCanvasStore();

  useEffect(() => {
    if (!fabricCanvas) return;

    const gridSize = 20;
    
    // Create a temporary canvas to draw the dot pattern
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = gridSize;
    patternCanvas.height = gridSize;
    const ctx = patternCanvas.getContext('2d');

    if (ctx) {
      // Background of the pattern (matching --color-canvas)
      ctx.fillStyle = '#111120'; 
      ctx.fillRect(0, 0, gridSize, gridSize);

      // The dot (matching --color-grid or more visible for test)
      ctx.fillStyle = '#3A3A5E'; // Brighter for visibility test
      ctx.beginPath();
      ctx.arc(1, 1, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Use Fabric.js Pattern for the background
    const pattern = new Pattern({
      source: patternCanvas,
      repeat: 'repeat'
    });

    fabricCanvas.backgroundColor = pattern;
    fabricCanvas.renderAll();

  }, [fabricCanvas]);
};
