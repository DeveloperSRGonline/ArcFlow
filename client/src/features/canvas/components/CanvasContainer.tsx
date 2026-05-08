import React from 'react';
import { useFabricCanvas } from '../hooks/useFabricCanvas';
import { useCanvasEvents } from '../hooks/useCanvasEvents';
import './CanvasContainer.scss';

/**
 * CanvasContainer - Host component for the Fabric.js canvas.
 * Encapsulates the canvas element and its lifecycle hooks.
 */
const CanvasContainer: React.FC = () => {
  const { canvasRef } = useFabricCanvas();
  useCanvasEvents();

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasContainer;
