import React from 'react';
import './MainLayout.scss';

import CanvasContainer from '../../features/canvas/components/CanvasContainer';

interface MainLayoutProps {
  children?: React.ReactNode;
}

/**
 * MainLayout - Implements the three-column dark IDE layout
 * strictly following PRD Section 4.5.
 */
const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="layout-container">
      {/* Top Bar (56px): Board name, avatars, AI buttons, share, export */}
      <header className="top-bar">
        <div className="board-info">
          <h2>Untitled Architecture</h2>
        </div>
        {/* Avatars and AI Buttons will be injected here */}
      </header>

      <div className="main-content">
        {/* Left Panel (240px): Toolbox - shapes, connectors, templates */}
        <aside className="left-panel">
          <div className="panel-header">Toolbox</div>
          <div className="toolbox-content">
            {/* Shape tools will be here */}
          </div>
        </aside>

        {/* Center: Infinite canvas with dot grid */}
        <main className="canvas-area canvas-wrapper">
          <CanvasContainer />
        </main>

        {/* Right Panel (320px): Context Layer - properties, notes, code, etc. */}
        <aside className="right-panel">
          <div className="panel-header">Context Layer</div>
          <div className="context-content">
            {/* Properties and AI Assist tabs will be here */}
          </div>
        </aside>
      </div>

      {/* Bottom Bar (40px): Zoom, page selector, coordinates */}
      <footer className="bottom-bar">
        <div className="zoom-controls">
          <span className="zoom-text">Zoom: 100%</span>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
