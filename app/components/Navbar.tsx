"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Login from "./login";
import { useState } from "react";
export default function Navbar() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <nav className="shadow-xl z-10 relative w-full md:py-0 py-2">
      <div className="flex justify-around items-center">
        <div className="md:hidden block">
          <button title="menu" type="button">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="logo flex items-center ">
          <div className="relative md:w-24 md:h-24 h-14  w-14">
            <Image src="/rh_logo.png" alt="Research Hub Logo" fill={true} />
          </div>
          <Link
            href="/"
            className="font-bold text-lg md:text-2xl text-primaryGreen"
          >
            GC Research Hub
          </Link>
        </div>
        <form action="" className="relative md:w-1/3 w-full md:block hidden">
          <input
            type="text"
            title="search"
            placeholder="Search"
            className="border-2 border-black rounded-full px-3 py-1 w-full md:block hidden"
          />
          <button
            title="search"
            type="submit"
            className="absolute top-1/2 transform -translate-y-1/2 right-5"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className="flex gap-5 p-2">
          <button
            className="ring-1 ring-primaryGreen text-primaryBlack font-semibold py-2 px-3 transition-all hover:ring-2 hover:ring-primaryGreen hover:text-primaryGreen  h-fit rounded-sm"
            type="button"
            title="signup"
            onClick={()=>{location.href="/signup"}}
          >
            Sign Upasdasda
          </button>
          <button
            className="bg-primaryGreen ring-primaryGreen ring-1 hover:bg-white hover:text-primaryGreen hover:ring-2 transition-all  duration-300 text-white font-semibold py-2 px-3  h-fit w-24 rounded-sm"
            type="button"
            title="login"
            onClick={() => setShowModal(true)}
          >
            Log In
          </button>
        </div>
      </div>
      {/* absolute top-0 h-screen w-1/3*/}
      <div className="hidden md:block bg-primaryGreen text-white font-bold   md:h-auto  md:relative md:w-full">
        {/* h-screen flex-col*/}
        <ul className="flex   md:flex-row  md:h-auto  justify-around items-center">
          <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
            <Link className="w-full flex justify-center" href="/">
              HOME
            </Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
            <Link className="w-full flex justify-center" href="/colleges">
              COLLEGES
            </Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
            <Link className="w-full flex justify-center" href="/authors">
              AUTHOR
            </Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
            <Link className="w-full flex justify-center" href="/about">
              ABOUT
            </Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
            <Link className="w-full flex justify-center" href="/faqs">
              FAQs
            </Link>
          </li>
        </ul>
      </div>
      <Login setShowModal={setShowModal} showModal={showModal}/>
    </nav>
  );
}
