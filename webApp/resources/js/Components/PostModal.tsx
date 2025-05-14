import React from 'react';

interface PostModalProps {
  content: string;
  setContent: (val: string) => void;
  errors: { content?: string };
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ content, setContent, errors, onSubmit, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
        onClick={onClose}
        aria-label="閉じる"
      >×</button>
      <h2 className="text-xl font-bold mb-4">新規投稿</h2>
      <form onSubmit={onSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-2"
          placeholder="本文"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
          autoFocus
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">投稿する</button>
        {errors.content && <div className="text-red-500 text-sm mt-2">{errors.content}</div>}
      </form>
    </div>
  </div>
);

export default PostModal;
