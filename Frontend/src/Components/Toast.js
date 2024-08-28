import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const showToast = () => {
    toast.success('This is a test notification!');
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </div>
  );
};

export default Toast;
