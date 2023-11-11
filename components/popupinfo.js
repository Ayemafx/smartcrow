// components/Popup.js
"use client";
import React, { useRef } from "react";
import { useState } from 'react';
import { ReactSVG } from 'react-svg';

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
      <div className="w-full max-w-md max-h-screen bg-white rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100">
      {/* Header text */}
      <h1 className="text-h text-gray-700 font-bold flex justify-center">Follow Below Instructions</h1>
      <div>
      <ReactSVG src="/assets/images/moreinfo.svg" className="mb-5" />
      <h3 className="text-m text-gray-700 m-2">{text}</h3>
      </div>
    </div>
  </div>
      
    
  );
};

export default PopupInfo;
