import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

const GamesPage = () => {
  const games = [
    { id: 'snake', name: '贪吃蛇', description: '经典像素游戏', status: '即将推出' },
    { id: '2048', name: '2048', description: '数字合并游戏', status: '即将推出' },
    { id: 'minesweeper', name: '扫雷', description: '经典扫雷游戏', status: '即将推出' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white">
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-pink-400" />
          <h1 className="text-5xl font-bold mb-4">小游戏</h1>
          <p className="text-xl text-gray-300">休息时放松一下</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <div key={game.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
              <p className="text-gray-300 mb-4">{game.description}</p>
              <span className="inline-block px-4 py-2 bg-pink-500/30 rounded-full text-sm">
                {game.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GamesPage;
