import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';

const AmbientSoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-yellow-900 text-white">
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-amber-400" />
          <h1 className="text-5xl font-bold mb-4">白噪音</h1>
          <p className="text-xl text-gray-300 mb-8">沉浸式专注环境</p>
          <div className="inline-block px-6 py-3 bg-amber-500/30 rounded-full">
            即将推出
          </div>
        </div>
      </main>
    </div>
  );
};

export default AmbientSoundPage;
