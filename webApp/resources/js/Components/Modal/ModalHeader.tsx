import React from 'react';

interface ModalHeaderProps {
  onCancel: () => void;
  onSubmit: (e: React.MouseEvent) => void;
  isSubmitDisabled: boolean;
}

/**
 * 投稿モーダルのヘッダー部分
 * キャンセルボタンと投稿ボタンを含みます
 */
const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  onCancel, 
  onSubmit, 
  isSubmitDisabled 
}) => {
  return (
    <div className="flex justify-between items-center p-3 border-b sticky top-0 bg-white z-10">
      <button
        className="text-gray-400 hover:text-gray-600 text-lg px-2 py-1"
        onClick={onCancel}
        aria-label="閉じる"
      >
        キャンセル
      </button>
      <button
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium text-sm"
        disabled={isSubmitDisabled}
      >
        投稿
      </button>
    </div>
  );
};

export default ModalHeader;
