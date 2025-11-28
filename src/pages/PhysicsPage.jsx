import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PhysicsPage = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    // Module aliases
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // Create an engine
    const engine = Engine.create();
    engineRef.current = engine;

    // Create a renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#0f172a', // Slate-900
        pixelRatio: window.devicePixelRatio
      }
    });

    // Create ground and walls
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth, 60, { isStatic: true, render: { fillStyle: '#334155' } });
    const leftWall = Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true, render: { fillStyle: '#334155' } });
    const rightWall = Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true, render: { fillStyle: '#334155' } });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    mouse.pixelRatio = window.devicePixelRatio || 1; // Explicitly set pixel ratio

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;
    
    // Allow scrolling on non-canvas elements but prevent on canvas
    render.canvas.style.touchAction = 'none';

    // Run the renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(ground, Matter.Vector.create(window.innerWidth / 2, window.innerHeight + 30));
      Matter.Body.setPosition(rightWall, Matter.Vector.create(window.innerWidth + 30, window.innerHeight / 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
          render.canvas.remove();
      }
    };
  }, []);

  const addShapes = (type) => {
    if (!engineRef.current) return;

    const x = Math.random() * window.innerWidth;
    const y = 50;
    let body;

    const commonOptions = {
        restitution: 0.9,
        render: {
            fillStyle: `hsl(${Math.random() * 360}, 70%, 60%)`
        }
    };

    if (type === 'circle') {
      body = Matter.Bodies.circle(x, y, 20 + Math.random() * 30, commonOptions);
    } else if (type === 'rectangle') {
      body = Matter.Bodies.rectangle(x, y, 40 + Math.random() * 40, 40 + Math.random() * 40, commonOptions);
    } else {
      body = Matter.Bodies.polygon(x, y, 3 + Math.floor(Math.random() * 5), 30 + Math.random() * 20, commonOptions);
    }

    Matter.Composite.add(engineRef.current.world, body);
  };

  const clearShapes = () => {
      if (!engineRef.current) return;
      const bodies = Matter.Composite.allBodies(engineRef.current.world);
      const nonStaticBodies = bodies.filter(body => !body.isStatic);
      Matter.Composite.remove(engineRef.current.world, nonStaticBodies);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={sceneRef} className="absolute inset-0" />
      
      <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors inline-block">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
         <button 
            onClick={clearShapes}
            className="p-3 bg-red-500/80 hover:bg-red-500 backdrop-blur-md rounded-full text-white transition-colors"
            title="清空"
         >
            <RefreshCw className="w-6 h-6" />
         </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20">
        <button
          onClick={() => addShapes('circle')}
          className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-bold transition-transform active:scale-95"
        >
          圆形
        </button>
        <button
          onClick={() => addShapes('rectangle')}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-bold transition-transform active:scale-95"
        >
          方形
        </button>
        <button
          onClick={() => addShapes('polygon')}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-full text-white font-bold transition-transform active:scale-95"
        >
          多边形
        </button>
      </div>
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white/50 text-sm pointer-events-none">
          点击按钮生成物体，用鼠标拖拽互动
      </div>
    </div>
  );
};

export default PhysicsPage;
