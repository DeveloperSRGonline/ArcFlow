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

  // --- ACTIONS ---

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
    set((state) => ({
      elements: [...state.elements, element],
    })),

  /**
   * Updates an existing element in the canvas state.
   */
  updateElement: (fabricId: string, updates: Partial<CanvasElement>) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.fabricId === fabricId ? { ...el, ...updates } : el
      ),
    })),

  /**
   * Removes an element from the canvas state.
   */
  removeElement: (fabricId: string) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.fabricId !== fabricId),
      selectedObjects: state.selectedObjects.filter((id) => id !== fabricId),
    })),

  /**
   * Resets the canvas UI state to defaults.
   */
  resetCanvas: () => set({
    activeTool: 'select',
    zoom: 1.0,
    selectedObjects: [],
    elements: [],
  }),
}));
