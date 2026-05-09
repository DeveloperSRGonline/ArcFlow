import { useEffect } from 'react';
import { useCanvasStore } from '../../../store/useCanvasStore';

/**
 * useCanvasShortcuts - Specialized hook to handle all keyboard interactions.
 */
export const useCanvasShortcuts = () => {
  const { 
    fabricCanvas, 
    removeElement, 
    addElement, 
    undo, 
    redo 
  } = useCanvasStore();

  useEffect(() => {
    if (!fabricCanvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const activeObjects = fabricCanvas.getActiveObjects();
      
      // DELETE
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (activeObjects.length === 0) return;
        activeObjects.forEach((obj) => {
          const fabricId = (obj as any).fabricId;
          if (fabricId) removeElement(fabricId);
          fabricCanvas.remove(obj);
        });
        fabricCanvas.discardActiveObject();
        fabricCanvas.requestRenderAll();
        return;
      }

      // DUPLICATE (Ctrl + D)
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        if (activeObjects.length === 0) return;
        e.preventDefault();
        
        activeObjects.forEach(async (obj) => {
          const cloned = await obj.clone();
          const fabricId = crypto.randomUUID();
          
          cloned.set({
            left: obj.left! + 20,
            top: obj.top! + 20,
            // @ts-ignore
            fabricId,
          });

          fabricCanvas.add(cloned);
          
          addElement({
            boardId: 'temp-board',
            fabricId,
            type: (obj as any).type,
            position: {
              left: cloned.left || 0,
              top: cloned.top || 0,
              width: cloned.getScaledWidth(),
              height: cloned.getScaledHeight(),
              angle: cloned.angle || 0,
              scaleX: cloned.scaleX || 1,
              scaleY: cloned.scaleY || 1,
            },
            style: {
              fill: cloned.fill as string,
              stroke: cloned.stroke as string,
              strokeWidth: cloned.strokeWidth || 0,
              opacity: cloned.opacity || 1,
            },
            connections: [],
            createdBy: 'user-id',
            updatedAt: new Date(),
            zIndex: fabricCanvas.getObjects().indexOf(cloned),
          });
        });
        
        fabricCanvas.discardActiveObject();
        fabricCanvas.requestRenderAll();
        return;
      }

      // UNDO / REDO
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      if (((e.ctrlKey || e.metaKey) && e.key === 'y') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        redo();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fabricCanvas, removeElement, addElement, undo, redo]);
};
