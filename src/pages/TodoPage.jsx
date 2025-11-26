import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-green-900 text-white">
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium">返回首页</span>
        </Link>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <h1 className="text-5xl font-bold mb-8 text-center">待办清单</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新任务..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            添加
          </button>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/40 transition-all"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed ? 'bg-green-500 border-green-500' : 'border-white/40'
                }`}
              >
                {todo.completed && <Check className="w-4 h-4" />}
              </button>
              <span className={`flex-1 ${todo.completed ? 'line-through opacity-50' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>还没有任务，添加一个开始吧！</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoPage;
