/**
 * CanvasTool represents the available tools in the ArchFlow canvas.
 */
export type CanvasTool =
  | 'select'
  | 'rect'
  | 'circle'
  | 'diamond'
  | 'cylinder'
  | 'parallelogram'
  | 'hexagon'
  | 'cloud'
  | 'arrow'
  | 'dashed-arrow'
  | 'bidirectional-arrow'
  | 'pencil'
  | 'text'
  | 'sticky'
  | 'image'
  | 'embed';

/**
 * CanvasElement represents a single object on the canvas,
 * following the Element Model in PRD Section 7.2.
 */
export interface CanvasElement {
  _id?: string;
  boardId: string;
  fabricId: string;
  type: CanvasTool;
  label?: string;
  position: {
    left: number;
    top: number;
    width: number;
    height: number;
    angle: number;
    scaleX: number;
    scaleY: number;
  };
  style: {
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    fontFamily?: string;
    fontSize?: number;
  };
  connections: string[]; // Array of fabricIds
  contextLayer?: {
    notes?: string;
    links?: Array<{
      url: string;
      title: string;
      favicon?: string;
      addedBy: string;
      addedAt: Date;
    }>;
    codeSnippets?: Array<{
      id: string;
      name: string;
      language: string;
      code: string;
      createdBy: string;
      updatedAt: Date;
    }>;
    fileRefs?: Array<{
      fileId: string;
      name: string;
      size: number;
      mimeType: string;
      s3Key: string;
      uploadedBy: string;
      uploadedAt: Date;
    }>;
    comments?: Array<{
      id: string;
      userId: string;
      text: string;
      replies: any[];
      reactions: Record<string, number>;
      resolved: boolean;
      createdAt: Date;
    }>;
  };
  lockedBy?: string;
  zIndex: number;
  groupId?: string;
  createdBy: string;
  updatedAt: Date;
}

/**
 * CanvasState defines the structure of the canvas-related state.
 */
export interface CanvasState {
  activeTool: CanvasTool;
  zoom: number;
  selectedObjects: string[]; // Array of fabricIds
  elements: CanvasElement[];
}

/**
 * CanvasActions defines the methods available to update the canvas state.
 */
export interface CanvasActions {
  setActiveTool: (tool: CanvasTool) => void;
  setZoom: (zoom: number) => void;
  setSelectedObjects: (ids: string[]) => void;
  addElement: (element: CanvasElement) => void;
  updateElement: (fabricId: string, updates: Partial<CanvasElement>) => void;
  removeElement: (fabricId: string) => void;
  resetCanvas: () => void;
}
