// components/Popup.js
"use client";
import React, { useRef } from "react";
import { useState } from 'react';

const PopupInfo = ({text, closeModal, isOpen}) => {

    const [myheader, setHeader] = useState("TBD");
    const [mytext, setText] = useState("TBD");

    const modalRef = useRef();

    const handleClose = (e) => {
      if (modalRef.current === e.target) {
        closeModal();
      }};
    

  return (
               
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50  ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClose}
      ref={modalRef}>
      <div className="w-full max-w-md bg-gray-400 rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100 border-2 border-black">
      {/* Header text */}
      <h2 className="text-m  mb-4 flex justify-center text-black">{text}</h2>
    </div>
  </div>
      
    
  );
};

export default PopupInfo;
