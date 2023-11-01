"use client"

import { useState } from "react";
export default function Login({showModal, setShowModal}: {showModal: boolean, setShowModal: (showModal: boolean) => void}) {
    if(!showModal){return null}
    return (
      <div className="h-screen w-screen flex justify-center items-center fixed top-0 bg-[rgb(0,0,0,0.3)] z-20">
        <div className="flex justify-center items-center w-2/5  h-5/6 bg-primaryGreen ">
            <button type="button" title="close" onClick={()=>{setShowModal(false)}}>&times;</button>
        </div>
      </div>
    );
  }
  