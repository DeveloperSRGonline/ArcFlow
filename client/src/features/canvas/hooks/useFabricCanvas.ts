import { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';

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
      backgroundColor: '#111120', // --color-canvas from PRD
      preserveObjectStacking: true,
      selectionColor: 'rgba(91, 79, 232, 0.2)', // --color-accent-primary with alpha
      selectionBorderColor: '#5B4FE8',
      selectionLineWidth: 2,
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
