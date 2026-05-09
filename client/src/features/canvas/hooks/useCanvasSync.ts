import { useEffect, useCallback } from 'react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { createFabricObject } from '../utils/shapeFactory';

/**
 * useCanvasSync - Specialized hook to keep Fabric.js canvas in sync with the elements store.
 */
export const useCanvasSync = () => {
  const { fabricCanvas, elements } = useCanvasStore();

  const syncCanvasFromStore = useCallback(() => {
    if (!fabricCanvas) return;
    
    // Remove only objects, preserving background/grid
    const objects = fabricCanvas.getObjects();
    fabricCanvas.remove(...objects);
    
    elements.forEach((el) => {
      const obj = createFabricObject(el);
      if (obj) {
        fabricCanvas.add(obj);
      }
    });
    
    fabricCanvas.renderAll();
  }, [fabricCanvas, elements]);

  /**
   * Sync effect: Triggers when elements array changes (e.g. via Undo/Redo).
   */
  useEffect(() => {
    if (!fabricCanvas) return;
    syncCanvasFromStore();
  }, [elements, fabricCanvas, syncCanvasFromStore]);

  return { syncCanvasFromStore };
};
