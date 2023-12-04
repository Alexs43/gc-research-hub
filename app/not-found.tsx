"use client";
import Image from "next/image";
import React from "react";
import "./globals.css";
export default function NotFound() {
  return (
    <div className="flex justify-center gap-36 items-center h-screen w-screen flex-col">
      <div className="aspect-square w-44  relative">
        <Image src="/static/images/gc-logo.png" fill={true} alt="GC Logo" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl text-primaryGreen font-extrabold ">404</h1>
        <h3 className="text-3xl text-primaryGreen font-extrabold">Page Not Found</h3>
      </div>
      <p className="text-2xl text-primaryBlack ">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
