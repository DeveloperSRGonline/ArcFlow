/**
 * UIState defines the visibility and status of various UI components
 * as specified in PRD Section 4.5 and 5.2.3.
 */
export interface UIState {
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  activeRightPanelTab: 'context' | 'assist';
  isMessCleanupPanelOpen: boolean;
  isMinimapVisible: boolean;
  isFocusMode: boolean;
}

/**
 * UIActions defines the methods to toggle or set UI states.
 */
export interface UIActions {
  toggleLeftPanel: () => void;
  setLeftPanel: (isOpen: boolean) => void;
  toggleRightPanel: () => void;
  setRightPanel: (isOpen: boolean) => void;
  setActiveRightPanelTab: (tab: 'context' | 'assist') => void;
  toggleMessCleanupPanel: () => void;
  setMessCleanupPanel: (isOpen: boolean) => void;
  toggleMinimap: () => void;
  toggleFocusMode: () => void;
}
