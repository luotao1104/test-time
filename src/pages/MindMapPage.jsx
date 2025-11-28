import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const initialText = `Focus Hub
  番茄钟
    专注工作
    提高效率
  小游戏
    贪吃蛇
    2048
    扫雷
  实用工具
    JSON格式化
    Base64转换`;

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'left';
    node.sourcePosition = 'right';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const textToElements = (text) => {
  const lines = text.split('\n');
  const nodes = [];
  const edges = [];
  const stack = []; // Stores { id, indent }

  lines.forEach((line, index) => {
    if (!line.trim()) return;

    const indent = line.search(/\S/);
    const label = line.trim();
    const id = `node-${index}`;

    nodes.push({
      id,
      data: { label },
      position: { x: 0, y: 0 }, // Position will be calculated by dagre
      type: 'default',
      style: { 
        background: '#1e293b', 
        color: '#fff', 
        border: '1px solid #94a3b8',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        fontSize: '14px'
      }
    });

    // Find parent
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length > 0) {
      const parent = stack[stack.length - 1];
      edges.push({
        id: `edge-${parent.id}-${id}`,
        source: parent.id,
        target: id,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: { stroke: '#94a3b8' }
      });
    }

    stack.push({ id, indent });
  });

  return getLayoutedElements(nodes, edges);
};

const MindMapPage = () => {
  const [text, setText] = useState(initialText);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = textToElements(text);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [text, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex h-screen w-full bg-slate-900 text-white overflow-hidden">
      {/* Sidebar / Editor */}
      <div className="w-1/3 h-full border-r border-white/10 flex flex-col bg-slate-800/50 backdrop-blur-md z-10">
        <div className="p-4 border-b border-white/10 flex items-center gap-4">
           <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
           </Link>
           <h1 className="text-xl font-bold flex items-center gap-2">
             <Sparkles className="w-5 h-5 text-purple-400" />
             灵感思维导图
           </h1>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <p className="text-sm text-gray-400 mb-2">
            在下方输入大纲，右侧自动生成导图。使用缩进（空格）来表示层级。
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 w-full bg-slate-900/50 border border-white/10 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
            placeholder="输入你的想法..."
          />
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MindMapPage;
