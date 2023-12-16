import React from "react";
import Forms from "./forms";
export default function page() {
  return (
    <div className="ml-64 w-full ">
      <div className="container py-14">
      <h1 className='text-4xl text-primaryBlack py-2'>Publish Paper</h1>
            <hr className="border-2 border-primaryGreen" />
     <div className="py-10 px-10">   <Forms /></div>
      </div>
    </div>
  );
}
