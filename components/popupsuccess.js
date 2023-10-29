// components/Popup.js
"use client";
import React, { useRef } from "react";
import { useState } from 'react';

const PopupSuccess = ({ header, text, closeModal, isOpen}) => {

    const [myheader, setHeader] = useState("TBD");
    const [mytext, setText] = useState("TBD");

    const modalRef = useRef();

    const handleClose = (e) => {
      if (modalRef.current === e.target) {
        closeModal();
      }};
    

  return (
               
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClose}
      ref={modalRef}>
      <div className="w-full max-w-md bg-gray-200 rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100 border-2 border-black">
      {/* Header text */}
      <h2 className="text-xl mb-4 flex justify-center text-black">{header}</h2>
      {/* Horizontal dividing line */}
      <hr className="border-black my-4" />
      {/* Icon */}
      <div className="flex justify-center text-center mb-4">
        <img src="/assets/images/success.png" alt="Paste Image" className="h-7 w-7" /> 
      </div>

      

      

      
    </div>
  </div>
      
    
  );
};

export default PopupSuccess;
