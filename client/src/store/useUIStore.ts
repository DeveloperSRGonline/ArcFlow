import { create } from 'zustand';
import type { UIState, UIActions } from '../types/ui';

/**
 * useUIStore manages the visibility of panels, toggles, and UI-specific states.
 * Implementation follows the three-column IDE layout architecture.
 */
export const useUIStore = create<UIState & UIActions>((set) => ({
  // --- INITIAL STATE ---
  leftPanelOpen: true,
  rightPanelOpen: true,
  activeRightPanelTab: 'context',
  isMessCleanupPanelOpen: false,
  isMinimapVisible: true,
  isFocusMode: false,

  // --- ACTIONS ---
  toggleLeftPanel: () => set((state) => ({ leftPanelOpen: !state.leftPanelOpen })),
  setLeftPanel: (isOpen: boolean) => set({ leftPanelOpen: isOpen }),
  
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
  setRightPanel: (isOpen: boolean) => set({ rightPanelOpen: isOpen }),
  
  setActiveRightPanelTab: (tab) => set({ activeRightPanelTab: tab }),
  
  toggleMessCleanupPanel: () => set((state) => ({ isMessCleanupPanelOpen: !state.isMessCleanupPanelOpen })),
  setMessCleanupPanel: (isOpen: boolean) => set({ isMessCleanupPanelOpen: isOpen }),
  
  toggleMinimap: () => set((state) => ({ isMinimapVisible: !state.isMinimapVisible })),
  
  toggleFocusMode: () => set((state) => ({ 
    isFocusMode: !state.isFocusMode,
    // When entering focus mode, we hide panels; when exiting, we restore them.
    leftPanelOpen: state.isFocusMode ? true : false,
    rightPanelOpen: state.isFocusMode ? true : false,
  })),
}));
