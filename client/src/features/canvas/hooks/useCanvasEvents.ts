import { useEffect, useRef } from 'react';
import { Point, Rect, Circle, Polygon, Path, IText, Line, Triangle, Group, FabricObject } from 'fabric';
import { useCanvasStore } from '../../../store/useCanvasStore';

/**
 * useCanvasEvents - Hook to handle canvas interactions like zooming, panning, and drawing.
 */
export const useCanvasEvents = () => {
  const { fabricCanvas, setZoom, activeTool, setActiveTool, addElement } = useCanvasStore();
  
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

    // Disable fabric selection if we are in drawing mode
    fabricCanvas.selection = activeTool === 'select';
    fabricCanvas.defaultCursor = activeTool === 'select' ? 'default' : 'crosshair';
    
    // Ensure all objects are selectable only in select mode
    fabricCanvas.forEachObject((obj) => {
      obj.selectable = activeTool === 'select';
      obj.evented = activeTool === 'select';
    });

    // --- ZOOMING (Mouse Wheel) ---
    const handleWheel = (opt: any) => {
      const delta = opt.e.deltaY;
      let zoom = fabricCanvas.getZoom();
      zoom *= 0.999 ** delta;
      
      if (zoom > 4) zoom = 4;
      if (zoom < 0.1) zoom = 0.1;

      fabricCanvas.zoomToPoint(new Point(opt.e.offsetX, opt.e.offsetY), zoom);
      setZoom(zoom);
      
      opt.e.preventDefault();
      opt.e.stopPropagation();
    };

    // --- MOUSE DOWN ---
    const handleMouseDown = (opt: any) => {
      const e = opt.e;
      const pointer = fabricCanvas.getScenePoint(e);

      // PANNING (Middle Mouse or Alt + Drag)
      if (e.altKey || e.button === 1) {
        isPanning.current = true;
        fabricCanvas.selection = false;
        lastPanningPos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      // DRAWING
      if (activeTool !== 'select') {
        if (activeTool === 'text') {
          const text = new IText('Type here...', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 16,
            fill: '#F0F0FF',
            originX: 'left' as const,
            originY: 'top' as const,
          });
          
          const fabricId = crypto.randomUUID();
          // @ts-ignore
          text.set({ fabricId });
          
          fabricCanvas.add(text);
          fabricCanvas.setActiveObject(text);
          text.enterEditing();
          text.selectAll();
          
          // Add to store
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
          return;
        }

        isDrawing.current = true;
        startPoint.current = { x: pointer.x, y: pointer.y };
        fabricCanvas.selection = false;

        let obj: FabricObject | null = null;
        const commonStyle = {
          left: pointer.x,
          top: pointer.y,
          fill: '#5B4FE822',
          stroke: '#5B4FE8',
          strokeWidth: 2,
          strokeUniform: true,
          selectable: false,
          evented: false,
          originX: 'left' as const,
          originY: 'top' as const,
        };

        switch (activeTool) {
          case 'rect':
            obj = new Rect({ ...commonStyle, width: 0, height: 0, rx: 4, ry: 4 });
            break;
          case 'circle':
            obj = new Circle({ ...commonStyle, radius: 0 });
            break;
          case 'diamond':
            obj = new Polygon([
              { x: 50, y: 0 },
              { x: 100, y: 50 },
              { x: 50, y: 100 },
              { x: 0, y: 50 }
            ], { ...commonStyle, width: 100, height: 100 });
            break;
          case 'cylinder': {
            const pathData = 'M 0 15 a 40 15 0 1 0 80 0 a 40 15 0 1 0 -80 0 l 0 70 a 40 15 0 0 0 80 0 l 0 -70';
            obj = new Path(pathData, { ...commonStyle, width: 80, height: 100 });
            break;
          }
          case 'parallelogram':
            obj = new Polygon([
              { x: 20, y: 0 },
              { x: 100, y: 0 },
              { x: 80, y: 100 },
              { x: 0, y: 100 }
            ], { ...commonStyle, width: 100, height: 100 });
            break;
          case 'hexagon':
            obj = new Polygon([
              { x: 25, y: 0 },
              { x: 75, y: 0 },
              { x: 100, y: 50 },
              { x: 75, y: 100 },
              { x: 25, y: 100 },
              { x: 0, y: 50 }
            ], { ...commonStyle, width: 100, height: 100 });
            break;
          case 'cloud': {
            const pathData = 'M 25 60 a 20 20 0 0 1 20 -20 a 30 30 0 0 1 50 0 a 25 25 0 0 1 0 50 a 25 25 0 0 1 -70 0 a 20 20 0 0 1 0 -30 Z';
            obj = new Path(pathData, { ...commonStyle, width: 100, height: 100 });
            break;
          }
          case 'sticky':
            obj = new Rect({
              ...commonStyle,
              fill: '#F5A623', // Sticky yellow
              stroke: '#D48C00',
              width: 0,
              height: 0,
              rx: 2,
              ry: 2,
            });
            break;
          case 'arrow': {
            obj = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
              stroke: '#5B4FE8',
              strokeWidth: 2,
              selectable: false,
              evented: false,
              strokeUniform: true,
            });
            const head = new Triangle({
              left: pointer.x,
              top: pointer.y,
              width: 15,
              height: 15,
              fill: '#5B4FE8',
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
              angle: 90,
            });
            tempHead.current = head;
            fabricCanvas.add(head);
            break;
          }
        }

        if (obj) {
          tempObject.current = obj;
          fabricCanvas.add(obj);
        }
      }
    };

    // --- MOUSE MOVE ---
    const handleMouseMove = (opt: any) => {
      const e = opt.e;
      const pointer = fabricCanvas.getScenePoint(e);

      // PANNING
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

      // DRAWING
      if (isDrawing.current && tempObject.current && startPoint.current) {
        const width = pointer.x - startPoint.current.x;
        const height = pointer.y - startPoint.current.y;
        
        // Handle drawing in any direction
        const left = width > 0 ? startPoint.current.x : pointer.x;
        const top = height > 0 ? startPoint.current.y : pointer.y;
        const absW = Math.abs(width);
        const absH = Math.abs(height);

        switch (activeTool) {
          case 'rect': {
            const rect = tempObject.current as Rect;
            rect.set({ width: absW, height: absH, left, top });
            break;
          }
          case 'circle': {
            const circle = tempObject.current as Circle;
            const radius = Math.max(absW, absH) / 2;
            circle.set({ radius, left, top });
            break;
          }
          case 'diamond': {
            const diamond = tempObject.current as Polygon;
            diamond.set({ 
              scaleX: absW / 100, 
              scaleY: absH / 100, 
              left, 
              top 
            });
            break;
          }
          case 'cylinder': {
            const cylinder = tempObject.current as Path;
            cylinder.set({ 
              scaleX: absW / 80, 
              scaleY: absH / 100, 
              left, 
              top 
            });
            break;
          }
          case 'parallelogram':
          case 'hexagon':
          case 'cloud': {
            const shape = tempObject.current as FabricObject;
            shape.set({ 
              scaleX: absW / 100, 
              scaleY: absH / 100, 
              left, 
              top 
            });
            break;
          }
          case 'sticky': {
            const rect = tempObject.current as Rect;
            rect.set({ width: absW, height: absH, left, top });
            break;
          }
          case 'arrow': {
            const line = tempObject.current as Line;
            line.set({ x2: pointer.x, y2: pointer.y });
            
            if (tempHead.current) {
              const head = tempHead.current;
              const angle = Math.atan2(pointer.y - startPoint.current.y, pointer.x - startPoint.current.x);
              head.set({
                left: pointer.x,
                top: pointer.y,
                angle: (angle * 180) / Math.PI + 90,
              });
            }
            break;
          }
        }
        fabricCanvas.renderAll();
      }
    };

    // --- MOUSE UP ---
    const handleMouseUp = () => {
      if (isPanning.current) {
        isPanning.current = false;
        fabricCanvas.selection = activeTool === 'select';
      }

      if (isDrawing.current && tempObject.current) {
        let obj = tempObject.current;
        const fabricId = crypto.randomUUID();
        
        // Finalize Arrow
        if (activeTool === 'arrow' && tempHead.current) {
          const line = obj as Line;
          const head = tempHead.current;
          
          fabricCanvas.remove(line);
          fabricCanvas.remove(head);
          
          obj = new Group([line, head], {
            selectable: true,
            hasControls: true,
            // @ts-ignore
            fabricId
          });
          fabricCanvas.add(obj);
          tempHead.current = null;
        } else if (activeTool === 'sticky') {
          const rect = obj as Rect;
          const text = new IText('Note', {
            fontSize: 16,
            fontFamily: 'Inter, system-ui, sans-serif',
            fill: '#000000',
            originX: 'center',
            originY: 'center',
            left: rect.left + rect.width / 2,
            top: rect.top + rect.height / 2,
          });
          
          fabricCanvas.remove(rect);
          obj = new Group([rect, text], {
            selectable: true,
            hasControls: true,
            // @ts-ignore
            fabricId
          });
          fabricCanvas.add(obj);
        } else {
          obj.set({
            selectable: true,
            evented: true,
            hasControls: true,
            // @ts-ignore
            fabricId
          });
        }

        // Add to store
        addElement({
          boardId: 'temp-board',
          fabricId,
          type: activeTool as any,
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
          createdBy: 'user-id',
          updatedAt: new Date(),
          zIndex: fabricCanvas.getObjects().indexOf(obj),
        });

        fabricCanvas.setActiveObject(obj);
        isDrawing.current = false;
        tempObject.current = null;
        startPoint.current = null;
        
        // Auto-switch back to select tool
        setActiveTool('select');
        
        fabricCanvas.renderAll();
      }
    };

    fabricCanvas.on('mouse:wheel', handleWheel);
    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('mouse:move', handleMouseMove);
    fabricCanvas.on('mouse:up', handleMouseUp);

    return () => {
      fabricCanvas.off('mouse:wheel', handleWheel);
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:move', handleMouseMove);
      fabricCanvas.off('mouse:up', handleMouseUp);
    };
  }, [fabricCanvas, setZoom, activeTool, setActiveTool, addElement]);
};
