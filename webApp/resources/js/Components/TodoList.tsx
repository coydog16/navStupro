import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface TodoListProps {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
      setShowModal(false);
    }
  };
  const handleRemove = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
    setSelectedIdx(null);
  };
  const handleDone = (idx: number) => {
    const todo = todos[idx];
    Inertia.post('/posts', { content: `「${todo}」をやった！` });
    setTodos(todos.filter((_, i) => i !== idx));
    setSelectedIdx(null);
  };

  return (
    <div className="mt-2 w-full">
      <div className="font-bold text-sm text-gray-600 mb-1 flex items-center">
        やること
        <button
          type="button"
          className="ml-2 bg-blue-500 text-white rounded px-2 py-0.5 text-xs hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >追加</button>
      </div>
      <ul className="space-y-1">
        {todos.map((todo, idx) => (
          <li key={idx} className="flex items-center justify-between bg-gray-100 rounded px-2 py-1 text-sm">
            {selectedIdx === idx ? (
              <div className="flex flex-1 items-center gap-2">
                <span className="flex-1">{todo}</span>
                <button onClick={() => handleDone(idx)} className="bg-blue-500 text-white rounded px-2 py-1 text-xs">やった！</button>
                <button onClick={() => handleRemove(idx)} className="bg-gray-300 text-gray-700 rounded px-2 py-1 text-xs">やらなかった</button>
              </div>
            ) : (
              <button type="button" className="flex-1 text-left cursor-pointer bg-transparent border-none p-0" onClick={() => setSelectedIdx(idx)}>
                {todo}
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* 追加用モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xs shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="閉じる"
            >×</button>
            <h2 className="text-lg font-bold mb-4">やること追加</h2>
            <form onSubmit={handleAdd}>
              <input
                className="w-full border rounded p-2 mb-2"
                placeholder="ToDoを入力..."
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">追加</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
