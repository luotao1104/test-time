import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Copy, Check, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('json');
  const [copied, setCopied] = useState(false);

  // JSON 格式化工具状态
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // 颜色选择器状态
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [colorFormats, setColorFormats] = useState({
    hex: '#3b82f6',
    rgb: 'rgb(59, 130, 246)',
    rgba: 'rgba(59, 130, 246, 1)',
    hsl: 'hsl(217, 91%, 60%)',
    hsla: 'hsla(217, 91%, 60%, 1)'
  });

  // 二维码生成器状态
  const [qrText, setQrText] = useState('https://example.com');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000');

  // JSON 格式化函数
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      setJsonError('');
    } catch (error) {
      setJsonError('无效的 JSON 格式: ' + error.message);
      setJsonOutput('');
    }
  };

  // JSON 压缩函数
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      setJsonError('');
    } catch (error) {
      setJsonError('无效的 JSON 格式: ' + error.message);
      setJsonOutput('');
    }
  };

  // 复制到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // 颜色转换函数
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateColorFormats = (hex) => {
    setSelectedColor(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColorFormats({
        hex: hex,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`
      });
    }
  };

  // 下载二维码
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const tabs = [
    { id: 'json', name: 'JSON 格式化' },
    { id: 'color', name: '颜色选择器' },
    { id: 'qrcode', name: '二维码生成' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900 text-white">
      <header className="p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <Wrench className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-cyan-400" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">实用工具</h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300">开发者常用工具集</p>
        </div>

        {/* Tab 切换 */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* JSON 格式化工具 */}
        {activeTab === 'json' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">JSON 格式化工具</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">输入 JSON</label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"name": "example", "value": 123}'
                  className="w-full h-40 bg-slate-800/50 border border-white/20 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={formatJson}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors"
                >
                  格式化
                </button>
                <button
                  onClick={minifyJson}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                >
                  压缩
                </button>
                {jsonOutput && (
                  <button
                    onClick={() => copyToClipboard(jsonOutput)}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? '已复制' : '复制'}
                  </button>
                )}
              </div>

              {jsonError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
                  {jsonError}
                </div>
              )}

              {jsonOutput && (
                <div>
                  <label className="block text-sm font-medium mb-2">输出结果</label>
                  <pre className="w-full h-40 bg-slate-800/50 border border-white/20 rounded-lg p-4 text-white font-mono text-sm overflow-auto">
                    {jsonOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 颜色选择器 */}
        {activeTab === 'color' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">颜色选择器</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium mb-2">选择颜色</label>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => updateColorFormats(e.target.value)}
                    className="w-full h-32 rounded-lg cursor-pointer border-2 border-white/20"
                  />
                </div>
                <div 
                  className="w-full md:w-64 h-32 rounded-lg border-2 border-white/20"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>

              <div className="space-y-3">
                {Object.entries(colorFormats).map(([format, value]) => (
                  <div key={format} className="flex items-center gap-3">
                    <span className="w-16 text-sm font-medium uppercase">{format}</span>
                    <input
                      type="text"
                      value={value}
                      readOnly
                      className="flex-1 bg-slate-800/50 border border-white/20 rounded-lg px-4 py-2 text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(value)}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 二维码生成器 */}
        {activeTab === 'qrcode' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">二维码生成器</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">输入文本或链接</label>
                  <textarea
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="输入要生成二维码的文本..."
                    className="w-full h-32 bg-slate-800/50 border border-white/20 rounded-lg p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    大小: {qrSize}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="64"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">二维码颜色</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                    <span className="text-sm font-mono">{qrColor}</span>
                  </div>
                </div>

                <button
                  onClick={downloadQRCode}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  下载二维码
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={qrText}
                    size={qrSize}
                    fgColor={qrColor}
                    level="H"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ToolsPage;
