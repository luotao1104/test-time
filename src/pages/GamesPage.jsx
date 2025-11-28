import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

const GamesPage = () => {
  const games = [
    { id: 'snake', name: '贪吃蛇', description: '经典像素游戏', status: '开始游戏', path: '/games/snake', color: 'bg-green-500' },
    { id: '2048', name: '2048', description: '数字合并游戏', status: '开始游戏', path: '/games/2048', color: 'bg-yellow-500' },
    { id: 'minesweeper', name: '扫雷', description: '经典扫雷游戏', status: '开始游戏', path: '/games/minesweeper', color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white">
      <header className="p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-pink-400" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">小游戏</h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300">休息时放松一下</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <Link key={game.id} to={game.path} className="block group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40 shadow-lg hover:shadow-xl h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-pink-300 transition-colors">{game.name}</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">{game.description}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className={`inline-block px-3 md:px-4 py-1.5 md:py-2 ${game.color}/30 text-${game.color.split('-')[1]}-300 rounded-full text-xs md:text-sm font-medium`}>
                    {game.status}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GamesPage;
