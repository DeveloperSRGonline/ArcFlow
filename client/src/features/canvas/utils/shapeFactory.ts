import { Rect, Circle, Polygon, Path, IText, Line, Triangle, Group, FabricObject } from 'fabric';
import type { CanvasElement } from '../../../types/canvas';

/**
 * ShapeFactory - Utility class to handle creation and conversion of Fabric objects.
 */
export const createFabricObject = (el: CanvasElement): FabricObject | null => {
  let obj: FabricObject | null = null;
  
  const commonStyle = {
    left: el.position.left,
    top: el.position.top,
    width: el.position.width / el.position.scaleX,
    height: el.position.height / el.position.scaleY,
    angle: el.position.angle,
    scaleX: el.position.scaleX,
    scaleY: el.position.scaleY,
    fill: el.style.fill,
    stroke: el.style.stroke,
    strokeWidth: el.style.strokeWidth,
    opacity: el.style.opacity,
    strokeUniform: true,
    originX: 'left' as const,
    originY: 'top' as const,
    // @ts-ignore
    fabricId: el.fabricId,
  };

  switch (el.type) {
    case 'rect':
      obj = new Rect({ ...commonStyle, rx: 4, ry: 4 });
      break;
    case 'circle':
      obj = new Circle({ ...commonStyle, radius: (el.position.width / el.position.scaleX) / 2 });
      break;
    case 'diamond':
      obj = new Polygon([
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 }
      ], { ...commonStyle });
      break;
    case 'cylinder': {
      const pathData = 'M 0 15 a 40 15 0 1 0 80 0 a 40 15 0 1 0 -80 0 l 0 70 a 40 15 0 0 0 80 0 l 0 -70';
      obj = new Path(pathData, { ...commonStyle });
      break;
    }
    case 'parallelogram':
      obj = new Polygon([
        { x: 20, y: 0 },
        { x: 100, y: 0 },
        { x: 80, y: 100 },
        { x: 0, y: 100 }
      ], { ...commonStyle });
      break;
    case 'hexagon':
      obj = new Polygon([
        { x: 25, y: 0 },
        { x: 75, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 100 },
        { x: 25, y: 100 },
        { x: 0, y: 50 }
      ], { ...commonStyle });
      break;
    case 'cloud': {
      const pathData = 'M 25 60 a 20 20 0 0 1 20 -20 a 30 30 0 0 1 50 0 a 25 25 0 0 1 0 50 a 25 25 0 0 1 -70 0 a 20 20 0 0 1 0 -30 Z';
      obj = new Path(pathData, { ...commonStyle });
      break;
    }
    case 'sticky': {
      const rect = new Rect({ 
        ...commonStyle, 
        left: 0, 
        top: 0, 
        rx: 2, 
        ry: 2 
      });
      const text = new IText(el.label || '', {
        fontSize: 16,
        fontFamily: 'Inter, system-ui, sans-serif',
        fill: '#000000',
        originX: 'center',
        originY: 'center',
        left: (el.position.width / el.position.scaleX) / 2,
        top: (el.position.height / el.position.scaleY) / 2,
      });
      obj = new Group([rect, text], {
        ...commonStyle,
      });
      break;
    }
    case 'arrow': {
      const line = new Line([0, 0, el.position.width, el.position.height], {
        stroke: el.style.stroke,
        strokeWidth: el.style.strokeWidth,
        strokeUniform: true,
      });
      const head = new Triangle({
        left: el.position.width,
        top: el.position.height,
        width: 15,
        height: 15,
        fill: el.style.stroke,
        originX: 'center',
        originY: 'center',
        angle: el.position.angle,
      });
      obj = new Group([line, head], {
        ...commonStyle,
        // @ts-ignore
        fabricId: el.fabricId
      });
      break;
    }
    case 'text':
      obj = new IText(el.label || 'Type here...', {
        ...commonStyle,
        fontFamily: el.style.fontFamily,
        fontSize: el.style.fontSize,
      });
      break;
  }

  return obj;
};
