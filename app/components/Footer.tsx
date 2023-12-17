import Image from "next/image";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
export default function Footer() {
  return (
    <footer className=" shadow-top pt-5 ">
      <div className="flex flex-col justify-center items-center ">
        <Image
          src="/rh_logo.png"
          alt="GC Research Hub Logo"
          width={100}
          height={100}
        />
        <h1 className="text-2xl text-center font-bold text-fontGreen">
          Gordon College Research Hub
        </h1>
        <p className=" font-light md:w-1/2 w-full md:px-0 px-5 text-center md:text-lg text-sm">
        The GC Research Hub is Gordon College students&apos; exclusive academic companion, offering a specialized repository of defended thesis papers tailored to meet their unique needs, providing a user-friendly digital space with 24/7 accessibility, intuitive navigation, and convenience for both students and professors to explore scholarly work and enhance their academic journey.
        </p>
      </div>
      <div className="flex md:flex-row flex-col text-center justify-around items-center w-2/3 mx-auto py-14">
        <div>
            <FontAwesomeIcon icon={faLocationDot} />
            Olongapo City Sports Complex, East Tapinac
        </div>
      </div>
        <div className="flex justify-center items-center w-full bg-fontGreen text-white ">
            <p className="text-center font-semibold md:text-md text-sm">
            Copyright © 2021 Gordon College Research Hub
            </p>
        </div>
    </footer>
  );
}
