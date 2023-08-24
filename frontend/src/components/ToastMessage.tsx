import React from 'react';

const ToastMessage: React.FC<{ type: 'success' | 'error'; message: string }> = ({ type, message }) => {
  const toastClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  return (
    <div className={`fixed bottom-4 right-4 p-2 rounded-md text-white ${toastClasses[type]}`}>
      {message}
    </div>
  );
};

export default ToastMessage;
