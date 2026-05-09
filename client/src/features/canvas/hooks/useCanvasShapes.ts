import { useCallback } from 'react';
import { Rect, Circle, Polygon, Path, FabricObject } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';

/**
 * useCanvasShapes - Hook providing functions to add basic architecture shapes.
 * Following Phase 1.6.2.
 */
export const useCanvasShapes = () => {
  const { fabricCanvas, addElement } = useCanvasStore();

  /**
   * Helper to add a Fabric object and track it in the store.
   */
  const addFabricObject = useCallback((obj: FabricObject, type: any) => {
    if (!fabricCanvas) return;

    const fabricId = crypto.randomUUID();
    // @ts-ignore - adding custom property to fabric object
    obj.set({ fabricId });

    fabricCanvas.add(obj);
    fabricCanvas.setActiveObject(obj);
    fabricCanvas.renderAll();

    // Add to global store
    addElement({
      boardId: 'temp-board', // TODO: Get actual board ID
      fabricId,
      type,
      position: {
        left: obj.left || 0,
        top: obj.top || 0,
        width: obj.getScaledWidth(),
        height: obj.getScaledHeight(),
        angle: obj.angle || 0,
        scaleX: obj.scaleX || 1,
        scaleY: obj.scaleY || 1,
      },
      style: {
        fill: obj.fill as string,
        stroke: obj.stroke as string,
        strokeWidth: obj.strokeWidth || 0,
        opacity: obj.opacity || 1,
      },
      connections: [],
      createdBy: 'user-id', // TODO: Get actual user ID
      updatedAt: new Date(),
      zIndex: fabricCanvas.getObjects().indexOf(obj),
    });
  }, [fabricCanvas, addElement]);

  const addRectangle = useCallback(() => {
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 120,
      height: 80,
      fill: '#5B4FE822',
      stroke: '#5B4FE8',
      strokeWidth: 2,
      rx: 4, // Rounded corners
      ry: 4,
    });
    addFabricObject(rect, 'rect');
  }, [addFabricObject]);

  const addCircle = useCallback(() => {
    const circle = new Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: '#00C9A722',
      stroke: '#00C9A7',
      strokeWidth: 2,
    });
    addFabricObject(circle, 'circle');
  }, [addFabricObject]);

  const addDiamond = useCallback(() => {
    const size = 100;
    const diamond = new Polygon([
      { x: size / 2, y: 0 },
      { x: size, y: size / 2 },
      { x: size / 2, y: size },
      { x: 0, y: size / 2 }
    ], {
      left: 200,
      top: 200,
      fill: '#F5A62322',
      stroke: '#F5A623',
      strokeWidth: 2,
    });
    addFabricObject(diamond, 'diamond');
  }, [addFabricObject]);

  const addCylinder = useCallback(() => {
    // Cylinder is represented as a Path for simplicity in MVP
    const w = 80;
    const h = 100;
    const rx = w / 2;
    const ry = 15;
    
    const pathData = `
      M 0 ${ry}
      a ${rx} ${ry} 0 1 0 ${w} 0
      a ${rx} ${ry} 0 1 0 -${w} 0
      l 0 ${h}
      a ${rx} ${ry} 0 0 0 ${w} 0
      l 0 -${h}
    `;
    
    const cylinder = new Path(pathData, {
      left: 250,
      top: 250,
      fill: '#E85B5B22',
      stroke: '#E85B5B',
      strokeWidth: 2,
    });
    addFabricObject(cylinder, 'cylinder');
  }, [addFabricObject]);

  return {
    addRectangle,
    addCircle,
    addDiamond,
    addCylinder,
  };
};
