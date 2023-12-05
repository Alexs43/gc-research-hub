"use server";
import React from "react";
import Image from "next/image";

import Logout from "./Logout";
import Links from "./Links";
export default async function Navbar() {
  return (
    <div className="h-screen w-2/12  bg-white rounded-r-lg shadow-right  flex flex-col justify-between items-center py-10">
      <div className="relative w-1/2 aspect-square  grid place-items-center">
        <Image src="/rh_logo.png" alt="Research Hub Logo" fill={true} />
      </div>
      <Links />
      <div className="w-full flex justify-center">
        <Logout />
      </div>
    </div>
  );
}
