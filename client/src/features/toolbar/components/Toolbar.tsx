import React from 'react';
import { 
  MousePointer2, 
  Square, 
  Circle, 
  Diamond,
  Database,
  Hexagon,
  Cloud,
  StickyNote,
  ArrowUpRight, 
  Type,
  } from 'lucide-react';
  import { useCanvasStore } from '../../../store/useCanvasStore';
  import type { CanvasTool } from '../../../types/canvas';
  import './Toolbar.scss';

  /**
   * Custom Parallelogram Icon
   */
  const ParallelogramIcon = ({ size = 18 }: { size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M7 20h14L17 4H3l4 16z" />
    </svg>
  );

  /**
   * Toolbar Component - Phase 1.6.1, 1.6.2, 1.6.3 & 1.6.4
   * Contains buttons for each architecture tool with Lucide icons.
   */
  const Toolbar: React.FC = () => {
    const { activeTool, setActiveTool } = useCanvasStore();

    const tools = [
      { id: 'select' as CanvasTool, label: 'Select', icon: <MousePointer2 size={18} /> },
      { id: 'rect' as CanvasTool, label: 'Box', icon: <Square size={18} /> },
      { id: 'circle' as CanvasTool, label: 'Node', icon: <Circle size={18} /> },
      { id: 'diamond' as CanvasTool, label: 'Decision', icon: <Diamond size={18} /> },
      { id: 'cylinder' as CanvasTool, label: 'Database', icon: <Database size={18} /> },
      { id: 'parallelogram' as CanvasTool, label: 'Input/Output', icon: <ParallelogramIcon size={18} /> },
      { id: 'hexagon' as CanvasTool, label: 'Hexagon', icon: <Hexagon size={18} /> },
      { id: 'cloud' as CanvasTool, label: 'Cloud / API', icon: <Cloud size={18} /> },
      { id: 'arrow' as CanvasTool, label: 'Connect', icon: <ArrowUpRight size={18} /> },
      { id: 'text' as CanvasTool, label: 'Text', icon: <Type size={18} /> },
      { id: 'sticky' as CanvasTool, label: 'Sticky Note', icon: <StickyNote size={18} /> },
    ];
  return (
    <div className="toolbar">
      {tools.map((tool) => (
        <button 
          key={tool.id} 
          className={`toolbar-item ${activeTool === tool.id ? 'active' : ''}`}
          title={tool.label}
          onClick={() => setActiveTool(tool.id)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
