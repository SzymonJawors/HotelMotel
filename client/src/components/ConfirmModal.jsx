import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all scale-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            Anuluj
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
          >
            Tak, usuń
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;