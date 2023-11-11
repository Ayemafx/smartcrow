// components/Popup.js
"use client";
import React, { useRef } from "react";
import { useState } from 'react';

const Popup = ({ header, text, closeModal, isOpen}) => {

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
      <div className="w-full max-w-md bg-white rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100 border-2 border-black">
      {/* Icon */}
      <div className="flex justify-center text-center mb-4">
        <img src="/assets/images/error.png" alt="Paste Image" className="h-7 w-7" /> 
      </div>

      

      {/* Header text */}
      <h2 className="text-black text-xl  mb-4 flex justify-center">{header}</h2>

      {/* Horizontal dividing line */}
      <hr className="border-black my-4 w-16 mx-auto" />

      {/* Normal text */}
      <p className="text-black flex justify-center">{text}</p>
    </div>
  </div>
      
    
  );
};

export default Popup;
