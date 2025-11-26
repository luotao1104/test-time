import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Gamepad2, Wrench, BarChart3, Lightbulb, Sparkles } from 'lucide-react';

const HomePage = () => {
  const modules = [
    {
      id: 'pomodoro',
      title: '番茄钟',
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
      id: 'tools',
      title: '实用工具',
      description: '开发者常用工具集',
      icon: Wrench,
      color: 'from-blue-500 to-cyan-500',
      path: '/tools'
    },
    {
      id: 'todo',
      title: '待办清单',
      description: '管理你的任务',
      icon: BarChart3,
      color: 'from-green-500 to-teal-500',
      path: '/todo'
    },
    {
      id: 'ambient',
      title: '白噪音',
      description: '沉浸式专注环境',
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500',
      path: '/ambient'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="pt-12 md:pt-16 pb-6 md:pb-8 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Focus Hub
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300">你的专注与创造力工作站</p>
        </motion.div>
      </header>

      {/* Module Cards */}
      <main className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Link key={module.id} to={module.path}>
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
  );
};

export default HomePage;
