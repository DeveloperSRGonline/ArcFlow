import { useEffect, useRef } from 'react';
import { Point, Rect, Circle, Polygon, Path, IText, Line, Triangle, Group, FabricObject } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { useCanvasShortcuts } from './useCanvasShortcuts';
import { useCanvasSync } from './useCanvasSync';
import { DRAWING_STYLES, VIEWPORT_CONFIG } from '../utils/canvasConstants';

/**
 * useCanvasEvents - Hook to handle canvas interactions like zooming, panning, and drawing.
 * Refactored for scalability.
 */
export const useCanvasEvents = () => {
  const { 
    fabricCanvas, 
    setZoom, 
    activeTool, 
    setActiveTool, 
    addElement, 
    updateElement, 
    setSelectedObjects,
  } = useCanvasStore();
  
  // Initialize specialized sub-hooks
  useCanvasShortcuts();
  useCanvasSync();

  // Drawing state
  const isDrawing = useRef(false);
  const startPoint = useRef<{ x: number, y: number } | null>(null);
  const tempObject = useRef<FabricObject | null>(null);
  const tempHead = useRef<Triangle | null>(null);

  // Panning state
  const isPanning = useRef(false);
  const lastPanningPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!fabricCanvas) return;

    // --- CANVAS CONFIGURATION ---
    fabricCanvas.selection = activeTool === 'select';
    fabricCanvas.defaultCursor = activeTool === 'select' ? 'default' : 'crosshair';
    
    fabricCanvas.forEachObject((obj) => {
      obj.selectable = activeTool === 'select';
      obj.evented = activeTool === 'select';
    });

    // --- EVENT HANDLERS ---

    const handleWheel = (opt: any) => {
      const delta = opt.e.deltaY;
      let zoom = fabricCanvas.getZoom();
      zoom *= VIEWPORT_CONFIG.ZOOM_STEP ** delta;
      
      if (zoom > VIEWPORT_CONFIG.MAX_ZOOM) zoom = VIEWPORT_CONFIG.MAX_ZOOM;
      if (zoom < VIEWPORT_CONFIG.MIN_ZOOM) zoom = VIEWPORT_CONFIG.MIN_ZOOM;

      fabricCanvas.zoomToPoint(new Point(opt.e.offsetX, opt.e.offsetY), zoom);
      setZoom(zoom);
      
      opt.e.preventDefault();
      opt.e.stopPropagation();
    };

    const handleMouseDown = (opt: any) => {
      const e = opt.e;
      const pointer = fabricCanvas.getScenePoint(e);

      // Panning
      if (e.altKey || e.button === 1) {
        isPanning.current = true;
        fabricCanvas.selection = false;
        lastPanningPos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      // Drawing
      if (activeTool !== 'select') {
        if (activeTool === 'text') {
          handleTextCreation(pointer);
          return;
        }

        isDrawing.current = true;
        startPoint.current = { x: pointer.x, y: pointer.y };
        fabricCanvas.selection = false;

        const obj = createTemporaryObject(activeTool, pointer);
        if (obj) {
          tempObject.current = obj;
          fabricCanvas.add(obj);
        }
      }
    };

    const handleMouseMove = (opt: any) => {
      const e = opt.e;
      const pointer = fabricCanvas.getScenePoint(e);

      if (isPanning.current) {
        const vpt = fabricCanvas.viewportTransform;
        if (vpt) {
          vpt[4] += e.clientX - lastPanningPos.current.x;
          vpt[5] += e.clientY - lastPanningPos.current.y;
          fabricCanvas.requestRenderAll();
          lastPanningPos.current = { x: e.clientX, y: e.clientY };
        }
        return;
      }

      if (isDrawing.current && tempObject.current && startPoint.current) {
        updateObjectSize(pointer);
        fabricCanvas.renderAll();
      }
    };

    const handleMouseUp = () => {
      if (isPanning.current) {
        isPanning.current = false;
        fabricCanvas.selection = activeTool === 'select';
      }

      if (isDrawing.current && tempObject.current) {
        finalizeObject();
      }
    };

    const updateSelection = () => {
      const activeObjects = fabricCanvas.getActiveObjects();
      const ids = activeObjects.map((obj) => (obj as any).fabricId).filter(Boolean);
      setSelectedObjects(ids);
    };

    const handleObjectModified = (opt: any) => {
      const target = opt.target;
      if (!target) return;

      const objectsToUpdate = target.type === 'activeSelection' || target.type === 'group' 
        ? target.getObjects() 
        : [target];

      objectsToUpdate.forEach((obj: FabricObject) => {
        const fabricId = (obj as any).fabricId;
        if (!fabricId) return;

        updateElement(fabricId, {
          position: {
            left: obj.left || 0,
            top: obj.top || 0,
            width: obj.getScaledWidth(),
            height: obj.getScaledHeight(),
            angle: obj.angle || 0,
            scaleX: obj.scaleX || 1,
            scaleY: obj.scaleY || 1,
          },
          updatedAt: new Date(),
        });
      });
    };

    // --- HELPER FUNCTIONS ---

    const handleTextCreation = (pointer: Point) => {
      const text = new IText('Type here...', {
        ...DRAWING_STYLES.text,
        left: pointer.x,
        top: pointer.y,
        originX: 'left',
        originY: 'top',
      });
      
      const fabricId = crypto.randomUUID();
      // @ts-ignore
      text.set({ fabricId });
      
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      text.enterEditing();
      text.selectAll();
      
      addElement({
        boardId: 'temp-board',
        fabricId,
        type: 'text',
        position: {
          left: text.left || 0,
          top: text.top || 0,
          width: text.width || 0,
          height: text.height || 0,
          angle: 0,
          scaleX: 1,
          scaleY: 1,
        },
        style: {
          fill: text.fill as string,
          stroke: 'transparent',
          strokeWidth: 0,
          opacity: 1,
          fontFamily: text.fontFamily,
          fontSize: text.fontSize,
        },
        connections: [],
        createdBy: 'user-id',
        updatedAt: new Date(),
        zIndex: fabricCanvas.getObjects().indexOf(text),
      });

      setActiveTool('select');
      fabricCanvas.renderAll();
    };

    const createTemporaryObject = (tool: string, pointer: Point) => {
      const common = { 
        ...DRAWING_STYLES.primary, 
        left: pointer.x, 
        top: pointer.y, 
        selectable: false, 
        evented: false,
        originX: 'left' as const,
        originY: 'top' as const,
      };
      
      switch (tool) {
        case 'rect': return new Rect({ ...common, width: 0, height: 0, rx: 4, ry: 4 });
        case 'circle': return new Circle({ ...common, radius: 0 });
        case 'diamond': return new Polygon([{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }], { ...common, width: 100, height: 100 });
        case 'cylinder': return new Path('M 0 15 a 40 15 0 1 0 80 0 a 40 15 0 1 0 -80 0 l 0 70 a 40 15 0 0 0 80 0 l 0 -70', { ...common, width: 80, height: 100 });
        case 'parallelogram': return new Polygon([{ x: 20, y: 0 }, { x: 100, y: 0 }, { x: 80, y: 100 }, { x: 0, y: 100 }], { ...common, width: 100, height: 100 });
        case 'hexagon': return new Polygon([{ x: 25, y: 0 }, { x: 75, y: 0 }, { x: 100, y: 50 }, { x: 75, y: 100 }, { x: 25, y: 100 }, { x: 0, y: 50 }], { ...common, width: 100, height: 100 });
        case 'cloud': return new Path('M 25 60 a 20 20 0 0 1 20 -20 a 30 30 0 0 1 50 0 a 25 25 0 0 1 0 50 a 25 25 0 0 1 -70 0 a 20 20 0 0 1 0 -30 Z', { ...common, width: 100, height: 100 });
        case 'sticky': return new Rect({ ...DRAWING_STYLES.sticky, left: pointer.x, top: pointer.y, width: 0, height: 0, rx: 2, ry: 2, selectable: false, evented: false, originX: 'left', originY: 'top' });
        case 'arrow': {
          const line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], { stroke: '#5B4FE8', strokeWidth: 2, selectable: false, evented: false, strokeUniform: true, originX: 'left', originY: 'top' });
          const head = new Triangle({ left: pointer.x, top: pointer.y, width: 15, height: 15, fill: '#5B4FE8', originX: 'center', originY: 'center', selectable: false, evented: false, angle: 90 });
          tempHead.current = head;
          fabricCanvas.add(head);
          return line;
        }
        default: return null;
      }
    };

    const updateObjectSize = (pointer: Point) => {
      const start = startPoint.current!;
      const width = pointer.x - start.x;
      const height = pointer.y - start.y;
      const absW = Math.abs(width);
      const absH = Math.abs(height);
      const left = width > 0 ? start.x : pointer.x;
      const top = height > 0 ? start.y : pointer.y;

      const obj = tempObject.current!;
      if (obj instanceof Rect) obj.set({ width: absW, height: absH, left, top });
      else if (obj instanceof Circle) obj.set({ radius: Math.max(absW, absH) / 2, left, top });
      else if (obj instanceof Line) {
        obj.set({ x2: pointer.x, y2: pointer.y });
        if (tempHead.current) {
          const angle = Math.atan2(pointer.y - start.y, pointer.x - start.x);
          tempHead.current.set({ left: pointer.x, top: pointer.y, angle: (angle * 180) / Math.PI + 90 });
        }
      } else {
        obj.set({ scaleX: absW / (obj.width || 100), scaleY: absH / (obj.height || 100), left, top });
      }
    };

    const finalizeObject = () => {
      let obj = tempObject.current!;
      const fabricId = crypto.randomUUID();
      
      if (activeTool === 'arrow' && tempHead.current) {
        const line = obj as Line;
        const head = tempHead.current;
        fabricCanvas.remove(line, head);
        obj = new Group([line, head], { 
          selectable: true, 
          hasControls: true, 
          originX: 'left',
          originY: 'top',
          // @ts-ignore
          fabricId 
        });
        fabricCanvas.add(obj);
        tempHead.current = null;
      } else if (activeTool === 'sticky') {
        const rect = obj as Rect;
        const text = new IText('Note', { ...DRAWING_STYLES.text, fill: '#000000', originX: 'center', originY: 'center', left: rect.left + rect.width / 2, top: rect.top + rect.height / 2 });
        fabricCanvas.remove(rect);
        obj = new Group([rect, text], { 
          selectable: true, 
          hasControls: true, 
          originX: 'left',
          originY: 'top',
          // @ts-ignore
          fabricId 
        });
        fabricCanvas.add(obj);
      } else {
        obj.set({ 
          selectable: true, 
          evented: true, 
          hasControls: true, 
          originX: 'left',
          originY: 'top',
          // @ts-ignore
          fabricId 
        });
      }

      addElement({
        boardId: 'temp-board',
        fabricId,
        type: activeTool as any,
        position: { left: obj.left || 0, top: obj.top || 0, width: obj.getScaledWidth(), height: obj.getScaledHeight(), angle: obj.angle || 0, scaleX: obj.scaleX || 1, scaleY: obj.scaleY || 1 },
        style: { fill: obj.fill as string, stroke: obj.stroke as string, strokeWidth: obj.strokeWidth || 0, opacity: obj.opacity || 1 },
        connections: [], createdBy: 'user-id', updatedAt: new Date(), zIndex: fabricCanvas.getObjects().indexOf(obj),
      });

      fabricCanvas.setActiveObject(obj);
      isDrawing.current = false;
      tempObject.current = null;
      startPoint.current = null;
      setActiveTool('select');
      fabricCanvas.renderAll();
    };

    // --- BIND EVENTS ---
    fabricCanvas.on('mouse:wheel', handleWheel);
    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('mouse:move', handleMouseMove);
    fabricCanvas.on('mouse:up', handleMouseUp);
    fabricCanvas.on('selection:created', updateSelection);
    fabricCanvas.on('selection:updated', updateSelection);
    fabricCanvas.on('selection:cleared', () => setSelectedObjects([]));
    fabricCanvas.on('object:modified', handleObjectModified);

    return () => {
      fabricCanvas.off('mouse:wheel', handleWheel);
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:move', handleMouseMove);
      fabricCanvas.off('mouse:up', handleMouseUp);
      fabricCanvas.off('selection:created', updateSelection);
      fabricCanvas.off('selection:updated', updateSelection);
      fabricCanvas.off('selection:cleared');
      fabricCanvas.off('object:modified', handleObjectModified);
    };
  }, [fabricCanvas, activeTool, setZoom, setActiveTool, addElement, updateElement, setSelectedObjects]);
};
