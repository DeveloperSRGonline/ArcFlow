import { useEffect } from 'react';
import { Point } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';

/**
 * useCanvasEvents - Hook to handle canvas interactions like zooming and panning.
 * Following Phase 1.5.3 of setup-microsteps.md.
 */
export const useCanvasEvents = () => {
  const { fabricCanvas, setZoom } = useCanvasStore();

  useEffect(() => {
    if (!fabricCanvas) return;

    // --- ZOOMING (Mouse Wheel) ---
    fabricCanvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = fabricCanvas.getZoom();
      zoom *= 0.999 ** delta;
      
      // Limit zoom between 0.1 and 4.0 as per PRD
      if (zoom > 4) zoom = 4;
      if (zoom < 0.1) zoom = 0.1;

      fabricCanvas.zoomToPoint(new Point(opt.e.offsetX, opt.e.offsetY), zoom);
      setZoom(zoom);
      
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // --- PANNING (Middle Mouse or Alt + Drag) ---
    let isPanning = false;
    let lastX = 0;
    let lastY = 0;

    fabricCanvas.on('mouse:down', (opt) => {
      const e = opt.e;
      // Check if it's a mouse/pointer event that has clientX and altKey/button
      if ('clientX' in e && (e.altKey || e.button === 1)) {
        isPanning = true;
        fabricCanvas.selection = false;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });

    fabricCanvas.on('mouse:move', (opt) => {
      const e = opt.e;
      if (isPanning && 'clientX' in e) {
        const vpt = fabricCanvas.viewportTransform;
        if (!vpt) return;
        
        vpt[4] += e.clientX - lastX;
        vpt[5] += e.clientY - lastY;
        
        fabricCanvas.requestRenderAll();
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });

    fabricCanvas.on('mouse:up', () => {
      isPanning = false;
      fabricCanvas.selection = true;
    });

    return () => {
      fabricCanvas.off('mouse:wheel');
      fabricCanvas.off('mouse:down');
      fabricCanvas.off('mouse:move');
      fabricCanvas.off('mouse:up');
    };
  }, [fabricCanvas, setZoom]);
};
