import React from "react";
import Image from "next/image";
const ForbiddenPage: React.FC = () => {
  return (
    <div className="flex justify-around items-center h-screen w-screen flex-col">
      <div className="aspect-square w-44  relative">
        <Image src="/static/images/gc-logo.png" fill={true} alt="GC Logo" />
      </div>
      <div>
        <h1 className="text-7xl text-primaryGreen font-extrabold ">403</h1>
        <h3 className="text-3xl text-primaryGreen font-extrabold">Forbidden</h3>
      </div>
      <p className="text-2xl text-primaryBlack ">You don&apos;t have permission to access this page or resource</p>
    </div>
  );
};

export default ForbiddenPage;
