import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';

const ToolsPage = () => {
  const tools = [
    { id: 'json', name: 'JSON 格式化', description: '格式化和验证 JSON', status: '即将推出' },
    { id: 'color', name: '颜色选择器', description: '多格式颜色转换', status: '即将推出' },
    { id: 'qrcode', name: '二维码生成', description: '生成二维码', status: '即将推出' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900 text-white">
      <header className="p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <Wrench className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-cyan-400" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">实用工具</h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300">开发者常用工具集</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-white/20">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{tool.name}</h3>
              <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">{tool.description}</p>
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-cyan-500/30 rounded-full text-xs md:text-sm">
                {tool.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ToolsPage;
