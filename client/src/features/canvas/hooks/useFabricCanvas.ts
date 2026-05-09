import { useEffect, useRef } from 'react';
import { Canvas, FabricObject } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';

// Configure global Fabric object selection styling
// Following Phase 1.7.1 of setup-microsteps.md
FabricObject.ownDefaults.borderColor = '#5B4FE8';
FabricObject.ownDefaults.cornerColor = '#FFFFFF';
FabricObject.ownDefaults.cornerStrokeColor = '#5B4FE8';
FabricObject.ownDefaults.cornerSize = 8;
FabricObject.ownDefaults.cornerStyle = 'circle';
FabricObject.ownDefaults.transparentCorners = false;
FabricObject.ownDefaults.padding = 10;
FabricObject.ownDefaults.borderDashArray = [4, 4];
FabricObject.ownDefaults.borderScaleFactor = 2;

/**
 * useFabricCanvas - Hook to initialize and manage the Fabric.js canvas instance.
 * Following Phase 1.5.1 of setup-microsteps.md.
 */
export const useFabricCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setFabricCanvas } = useCanvasStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric Canvas
    const canvas = new Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
      selectionColor: 'rgba(91, 79, 232, 0.15)', // --color-accent-primary with 15% opacity
      selectionBorderColor: '#5B4FE8',           // --color-accent-primary
      selectionLineWidth: 1.5,
    });

    // Store canvas instance in global store
    setFabricCanvas(canvas);

    // Handle Window Resize
    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
      setFabricCanvas(null);
    };
  }, [setFabricCanvas]);

  return { canvasRef };
};
