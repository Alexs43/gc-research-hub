"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Login from "./login";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseBrowser";
export default function Navbar() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getSession();
      setUser(user);
      console.log(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const logout = await supabase.auth.signOut();

    window.location.reload();
  };
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
          <Link href="/" className="font-bold text-lg md:text-2xl">
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
        <div className="md:block hidden relative">
          {/* <button
            title="user"
            type="button"
            onClick={() => {
              setShowUserModal(!showUserModal);
            }}
          >
            <Image
              className="rounded-full"
              src="/image-placeholder.jpg"
              width={50}
              height={50}
              alt="User placeholder"
            />
          </button> */}
          {user?.data?.session ? (
            <button
              title="user"
              type="button"
              onClick={() => {
                setShowUserModal(!showUserModal);
              }}
            >
              <Image
                className="rounded-full"
                src="/image-placeholder.jpg"
                width={50}
                height={50}
                alt="User placeholder"
              />
            </button>
          ) : (
            <button
              title="user"
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
              className="py-2 px-3 bg-primaryGreen text-white rounded-sm font-semibold hover:bg-white outline outline-2 hover:text-primaryGreen  hover:outline-primaryGreen transition-colors duration-300"
            >
              Log In
            </button>
          )}
          {showUserModal && (
            <div
              id="popup"
              className="flex flex-col bg-offWhite   shadow-md absolute z-10 md:w-48 top-full right-0 "
            >
              <button
                className="py-4 px-10 font-semibold text-primaryGreen hover:bg-primaryGreen hover:text-white transition-all"
                title="My Account"
                onClick={() => {}}
              >
                My Account
              </button>
              <button
                className="py-4 px-10 font-semibold text-primaryGreen hover:bg-primaryGreen hover:text-white transition-all"
                title="Logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="md:hidden  flex justify-center gap-3 items-center">
          <button className="text-lg" type="button" title="search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button title="user" type="button">
            <Image
              className="rounded-full"
              src="/image-placeholder.jpg"
              width={40}
              height={40}
              alt="User placeholder"
            />
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
        
          {/* <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
            <Link className="w-full flex justify-center" href="/faqs">
              FAQs
            </Link>
          </li> */}
          {user?.data?.session && (
            <>
            <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
              <Link
                className="w-full flex justify-center"
                href="/students/classes"
              >
                CLASSES
              </Link>
            </li>
              <li className=" hover:bg-white hover:text-black h-full w-full py-2  transition-colors">
              <Link className="w-full flex justify-center" href="/submit-paper">
                SUBMIT A PAPER
              </Link>
            </li>
            </>
          )}
        </ul>
      </div>
      <Login setShowModal={setShowModal} showModal={showModal} />
    </nav>
  );
}
