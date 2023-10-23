import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="shadow-xl z-10 absolute w-full md:py-0 py-2">
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
        <div className="md:block hidden">
          <button title="user" type="button">
            <Image
              className="rounded-full"
              src="/image-placeholder.jpg"
              width={50}
              height={50}
              alt="User placeholder"
            />
          </button>
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
      <div className="hidden md:block bg-primaryGreen text-white font-bold ">
        <ul className="flex justify-around items-center">
          <li className=" hover:bg-white hover:text-black h-full w-full py-5  transition-colors">
            <Link className="w-full flex justify-center" href="/">HOME</Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-5  transition-colors">
            <Link className="w-full flex justify-center" href="/colleges">COLLEGES</Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-5  transition-colors">
            <Link className="w-full flex justify-center" href="/authors">AUTHOR</Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-5  transition-colors">
            <Link className="w-full flex justify-center" href="/about">ABOUT</Link>
          </li>
          <li className=" hover:bg-white hover:text-black h-full w-full py-5  transition-colors">
            <Link className="w-full flex justify-center" href="/faqs">FAQs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
