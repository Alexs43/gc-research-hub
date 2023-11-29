"use client";
import Image from "next/image";
import React from "react";
export default function ForbiddenPage() {
  return (
    <div className="flex justify-center gap-36 items-center h-screen w-screen flex-col">
      <div className="aspect-square w-44  relative">
        <Image src="/static/images/gc-logo.png" fill={true} alt="GC Logo" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl text-primaryGreen font-extrabold ">403</h1>
        <h3 className="text-3xl text-primaryGreen font-extrabold">Forbidden</h3>
      </div>
      <p className="text-2xl text-primaryBlack ">
        You don&apos;t have permission to access this page or resource
      </p>
    </div>
  );
}
