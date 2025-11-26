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
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Wrench className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h1 className="text-5xl font-bold mb-4">实用工具</h1>
          <p className="text-xl text-gray-300">开发者常用工具集</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
              <p className="text-gray-300 mb-4">{tool.description}</p>
              <span className="inline-block px-4 py-2 bg-cyan-500/30 rounded-full text-sm">
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
