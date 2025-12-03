import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Gamepad2, Wrench, BarChart3, Lightbulb, Sparkles, Atom, HelpCircle, Globe as GlobeIcon, Network, Terminal } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const HomePage = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const modules = [
    {
      id: 'pomodoro',
      title: '番茄时间',
      description: '专注工作，提高效率',
      icon: Clock,
      color: 'from-red-500 to-orange-500',
      path: '/pomodoro'
    },
    {
      id: 'tarot',
      title: '塔罗占卜',
      description: '探索命运的指引',
      icon: Sparkles,
      color: 'from-purple-600 to-indigo-600',
      path: '/tarot'
    },
    {
      id: 'games',
      title: '小游戏',
      description: '休息时放松一下',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-500',
      path: '/games'
    },
    {
      id: 'physics',
      title: '物理工坊',
      description: '解压的物理模拟实验室',
      icon: Atom,
      color: 'from-blue-600 to-indigo-500',
      path: '/physics'
    },
    {
      id: 'tools',
      title: '实用工具',
      description: '开发者常用工具集',
      icon: Wrench,
      color: 'from-blue-500 to-cyan-500',
      path: '/tools'
    },

    {
      id: 'focus-globe',
      title: '全球热力',
      description: '3D 实时专注可视化',
      icon: GlobeIcon,
      color: 'from-indigo-500 to-blue-500',
      path: '/focus-globe'
    },
    {
      id: 'mind-map',
      title: '思维导图',
      description: '灵感大纲一键生成',
      icon: Network,
      color: 'from-pink-500 to-rose-500',
      path: '/mind-map'
    },
    {
      id: 'terminal',
      title: '黑客终端',
      description: '极客风格命令行',
      icon: Terminal,
      color: 'from-green-500 to-emerald-500',
      path: '/terminal'
    }
  ];

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#header-title', popover: { title: '欢迎来到 Focus Hub', description: '这里是你的专注与创造力工作站。' } },
        { element: '#module-pomodoro', popover: { title: '番茄时间', description: '使用番茄工作法来保持专注，提高效率。' } },
        { element: '#module-tarot', popover: { title: '塔罗占卜', description: '迷茫时，不妨来这里寻找一点指引。' } },
        { element: '#module-games', popover: { title: '小游戏', description: '工作累了？来玩把贪吃蛇或扫雷放松一下。' } },
        { element: '#module-physics', popover: { title: '物理工坊', description: '全新的解压实验室，尽情释放压力！' } },
        { element: '#module-tools', popover: { title: '实用工具', description: '包含 JSON 格式化、Base64 转换等开发者常用工具。' } },
      ]
    });
    driverObj.drive();
  };

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      // Delay slightly to ensure elements are rendered
      setTimeout(() => {
        startTour();
        localStorage.setItem('hasSeenTour', 'true');
      }, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Spline Background */}
      {/* Spline Background */}
      {/* Particles Background */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#a855f7", // Purple-500
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
          className="fixed inset-0 z-0"
        />
      )}
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-slate-900/40 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 md:pt-16 pb-6 md:pb-8 text-center px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="header-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
              Focus Hub
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300">你的专注与创造力工作站</p>
          </motion.div>
          
          <button 
            onClick={startTour}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
            title="开启引导"
          >
            <HelpCircle className="w-5 h-5 text-gray-300" />
          </button>
        </header>

        {/* Module Cards */}
        <main className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link key={module.id} to={module.path} id={`module-${module.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                      style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                    />
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 md:mb-4`}>
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{module.title}</h3>
                      <p className="text-sm md:text-base text-gray-300">{module.description}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center pb-8 text-gray-400 text-sm">
          <p>Focus Hub v2.0 - 专注、创造、成长</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
