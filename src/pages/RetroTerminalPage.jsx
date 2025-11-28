import React from 'react';
import Terminal from 'react-console-emulator';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RetroTerminalPage = () => {
  const navigate = useNavigate();
  const terminalRef = React.useRef(null);

  const commands = {
    help: {
      description: '显示所有可用命令',
      fn: () => {
        return `
可用命令:
  help          - 显示帮助信息
  clear         - 清空屏幕
  goto <page>   - 跳转页面 (例如: goto home, goto games)
  date          - 显示当前日期和时间
  whoami        - 显示当前用户
  about         - 关于 Focus Hub
        `;
      }
    },
    clear: {
      description: '清空屏幕',
      fn: () => {
        terminalRef.current.clearStdout();
      }
    },
    goto: {
      description: '跳转到指定页面',
      usage: 'goto <page>',
      fn: (page) => {
        const routes = {
          home: '/',
          pomodoro: '/pomodoro',
          tarot: '/tarot',
          games: '/games',
          physics: '/physics',
          globe: '/focus-globe',
          mindmap: '/mind-map',
          todo: '/todo',
          tools: '/tools',
          ambient: '/ambient'
        };

        if (routes[page]) {
          navigate(routes[page]);
          return `正在跳转到 ${page}...`;
        } else {
          return `错误: 未知页面 '${page}'。可用页面: ${Object.keys(routes).join(', ')}`;
        }
      }
    },
    date: {
      description: '显示当前日期和时间',
      fn: () => new Date().toLocaleString()
    },
    whoami: {
      description: '显示当前用户',
      fn: () => 'Guest User (Focus Hub Explorer)'
    },
    about: {
      description: '关于 Focus Hub',
      fn: () => 'Focus Hub v2.0 - 您的专注与创造力工作站。由 React 构建。'
    }
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col relative">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="p-2 bg-green-900/30 hover:bg-green-900/50 rounded text-green-500 transition-colors inline-block border border-green-500/30">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="flex-1 p-4 md:p-8 pt-16">
        <Terminal
          ref={terminalRef}
          commands={commands}
          welcomeMessage={'欢迎来到 Focus Hub 终端系统 v2.0.0\n输入 "help" 查看可用命令。'}
          promptLabel={'guest@focus-hub:~$'}
          style={{
            backgroundColor: '#000000',
            minHeight: '100%',
            maxHeight: '100%',
            overflow: 'auto',
            borderRadius: '0'
          }}
          contentStyle={{ color: '#00ff00', fontSize: '16px', fontFamily: 'monospace' }}
          promptLabelStyle={{ color: '#00ff00', fontWeight: 'bold' }}
          inputTextStyle={{ color: '#00ff00', fontWeight: 'normal' }}
          noDefaults
        />
      </div>
    </div>
  );
};

export default RetroTerminalPage;
