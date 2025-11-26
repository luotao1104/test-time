import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TAROT_CARDS, DIVINATION_TYPES } from '../data/tarotData';

const TarotPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // 随机抽牌
  const drawCards = (count) => {
    setIsDrawing(true);
    setRevealedCards([]);
    
    // 随机选择牌并随机决定正逆位
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).map(card => ({
      ...card,
      isReversed: Math.random() > 0.5
    }));
    
    setDrawnCards(selected);
    
    // 逐张翻牌动画
    selected.forEach((_, index) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, index]);
      }, (index + 1) * 800);
    });
    
    setTimeout(() => {
      setIsDrawing(false);
    }, count * 800 + 500);
  };

  // 重置
  const reset = () => {
    setSelectedType(null);
    setDrawnCards([]);
    setRevealedCards([]);
  };

  // 选择占卜类型
  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-950 text-white">
        <header className="p-4 md:p-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base font-medium">返回首页</span>
          </Link>
        </header>

        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-purple-400 animate-pulse" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              塔罗占卜
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-6">静下心来，选择一种占卜方式</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {DIVINATION_TYPES.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedType(type);
                  drawCards(type.cardCount);
                }}
                className="p-6 bg-white/5 backdrop-blur-lg border border-purple-500/30 rounded-2xl hover:border-purple-500/60 hover:bg-white/10 transition-all duration-300 text-left group"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {type.name}
                </h3>
                <p className="text-sm md:text-base text-gray-400">{type.description}</p>
                <div className="mt-3 text-xs text-purple-400">抽取 {type.cardCount} 张牌</div>
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // 占卜结果页面
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-950 text-white">
      <header className="p-4 md:p-6 flex justify-between items-center">
        <button onClick={reset} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">重新选择</span>
        </button>
        <button
          onClick={() => drawCards(selectedType.cardCount)}
          disabled={isDrawing}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-50"
        >
          <Shuffle className="w-5 h-5" />
          <span>重新抽牌</span>
        </button>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedType.name}</h2>
          <p className="text-gray-400">{selectedType.description}</p>
        </div>

        {/* 卡牌展示 */}
        <div className={`grid gap-6 max-w-5xl mx-auto mb-12 ${
          drawnCards.length === 1 ? 'grid-cols-1 max-w-md' : 
          drawnCards.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 
          'grid-cols-2'
        }`}>
          {drawnCards.map((card, index) => {
            const isRevealed = revealedCards.includes(index);
            const position = selectedType.positions?.[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center"
              >
                {position && (
                  <div className="text-sm text-purple-400 mb-3 font-medium">{position}</div>
                )}
                
                <div className="relative w-full max-w-xs aspect-[2/3] perspective-1000">
                  <AnimatePresence mode="wait">
                    {!isRevealed ? (
                      <motion.div
                        key="back"
                        initial={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl border-2 border-purple-500/50 flex items-center justify-center backface-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="text-6xl animate-pulse">🌙</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="front"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: card.isReversed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl border-2 border-yellow-600 p-6 flex flex-col items-center justify-between backface-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="text-5xl mb-4">{card.emoji}</div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{card.name}</h3>
                          <p className="text-sm text-gray-600">{card.nameEn}</p>
                        </div>
                        {card.isReversed && (
                          <div className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                            逆位
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 卡牌解释 */}
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 w-full max-w-xs"
                  >
                    <div className="bg-white/5 backdrop-blur-lg border border-purple-500/30 rounded-xl p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {card.keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">
                        {card.isReversed ? '逆位含义' : '正位含义'}
                      </h4>
                      <p className="text-sm text-gray-300 mb-3">
                        {card.isReversed ? card.reversed.meaning : card.upright.meaning}
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {card.isReversed ? card.reversed.description : card.upright.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TarotPage;
