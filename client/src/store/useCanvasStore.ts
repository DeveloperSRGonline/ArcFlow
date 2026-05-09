import { create } from 'zustand';
import type { CanvasElement, CanvasState, CanvasActions, CanvasTool } from '../types/canvas';

/**
 * useCanvasStore manages the global state of the drawing canvas.
 * It tracks the currently selected tool, zoom level, selected objects, and canvas elements.
 */
export const useCanvasStore = create<CanvasState & CanvasActions>((set) => ({
  // --- INITIAL STATE ---
  activeTool: 'select',
  zoom: 1.0,
  selectedObjects: [],
  elements: [],
  fabricCanvas: null,
  undoStack: [],
  redoStack: [],

  // --- ACTIONS ---

  /**
   * Saves the current elements state to the undo stack.
   * Limits history to 100 levels.
   */
  saveHistory: () => set((state) => {
    // Don't save if the last state is identical (to prevent spam)
    const lastState = state.undoStack[state.undoStack.length - 1];
    if (lastState && JSON.stringify(lastState) === JSON.stringify(state.elements)) {
      return state;
    }

    const newUndoStack = [...state.undoStack, [...state.elements]];
    if (newUndoStack.length > 100) {
      newUndoStack.shift(); // Remove oldest
    }

    return {
      undoStack: newUndoStack,
      redoStack: [], // Clear redo stack on new action
    };
  }),

  /**
   * Undoes the last action by restoring the previous state from undoStack.
   */
  undo: () => set((state) => {
    if (state.undoStack.length === 0) return state;

    const previousElements = state.undoStack[state.undoStack.length - 1];
    const newUndoStack = state.undoStack.slice(0, -1);
    const newRedoStack = [[...state.elements], ...state.redoStack];

    if (newRedoStack.length > 100) {
      newRedoStack.pop();
    }

    return {
      elements: previousElements,
      undoStack: newUndoStack,
      redoStack: newRedoStack,
    };
  }),

  /**
   * Redoes the last undone action by restoring state from redoStack.
   */
  redo: () => set((state) => {
    if (state.redoStack.length === 0) return state;

    const nextElements = state.redoStack[0];
    const newRedoStack = state.redoStack.slice(1);
    const newUndoStack = [...state.undoStack, [...state.elements]];

    if (newUndoStack.length > 100) {
      newUndoStack.shift();
    }

    return {
      elements: nextElements,
      undoStack: newUndoStack,
      redoStack: newRedoStack,
    };
  }),

  /**
   * Updates the active tool (e.g., 'rect', 'circle', 'pencil').
   */
  setActiveTool: (tool: CanvasTool) => set({ activeTool: tool }),

  /**
   * Sets the zoom level. PRD suggests 10% (0.1) to 400% (4.0).
   */
  setZoom: (zoom: number) => set({ zoom: Math.min(Math.max(zoom, 0.1), 4) }),

  /**
   * Tracks which objects are currently selected on the canvas.
   * Stores their unique fabricIds.
   */
  setSelectedObjects: (ids: string[]) => set({ selectedObjects: ids }),

  /**
   * Adds a new element to the canvas state.
   */
  addElement: (element: CanvasElement) =>
    set((state) => {
      // Manual saveHistory logic here to avoid double set() if we can, 
      // but let's keep it simple and just use the state.
      const newUndoStack = [...state.undoStack, [...state.elements]];
      if (newUndoStack.length > 100) newUndoStack.shift();

      return {
        elements: [...state.elements, element],
        undoStack: newUndoStack,
        redoStack: [],
      };
    }),

  /**
   * Updates an existing element in the canvas state.
   */
  updateElement: (fabricId: string, updates: Partial<CanvasElement>) =>
    set((state) => {
      const newUndoStack = [...state.undoStack, [...state.elements]];
      if (newUndoStack.length > 100) newUndoStack.shift();

      return {
        elements: state.elements.map((el) =>
          el.fabricId === fabricId ? { ...el, ...updates } : el
        ),
        undoStack: newUndoStack,
        redoStack: [],
      };
    }),

  /**
   * Removes an element from the canvas state.
   */
  removeElement: (fabricId: string) =>
    set((state) => {
      const newUndoStack = [...state.undoStack, [...state.elements]];
      if (newUndoStack.length > 100) newUndoStack.shift();

      return {
        elements: state.elements.filter((el) => el.fabricId !== fabricId),
        selectedObjects: state.selectedObjects.filter((id) => id !== fabricId),
        undoStack: newUndoStack,
        redoStack: [],
      };
    }),

  /**
   * Sets the fabric.Canvas instance.
   */
  setFabricCanvas: (canvas) => set({ fabricCanvas: canvas }),

  /**
   * Resets the canvas UI state to defaults.
   */
  resetCanvas: () => set({
    activeTool: 'select',
    zoom: 1.0,
    selectedObjects: [],
    elements: [],
    fabricCanvas: null,
  }),
}));
