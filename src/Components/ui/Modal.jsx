// Modal.js
import React from "react";



const Modal = ({ show, onHide, size, centered, children }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onHide}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full ${size === "lg" ? "max-w-4xl" : "max-w-md"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
