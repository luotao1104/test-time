import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';

const AmbientSoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-yellow-900 text-white">
      <header className="p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center">
          <Lightbulb className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-amber-400" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">白噪音</h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8">沉浸式专注环境</p>
          <div className="inline-block px-5 md:px-6 py-2 md:py-3 bg-amber-500/30 rounded-full text-sm md:text-base">
            即将推出
          </div>
        </div>
      </main>
    </div>
  );
};

export default AmbientSoundPage;
