import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGauge, faUser, faBuildingColumns, faBook, faCommentDots} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  return (
    <div className="h-screen w-2/12  bg-white rounded-r-lg shadow-right border">
      <div className="relative h-24 aspect-auto  grid place-items-center">
        <Image src="/logo234.png" alt="Research Hub Logo" fill={true} />
      </div>
      <div className="mt-10 px-3">
        <Link
          href="/admin/dashboard "
          className="flex justify-start items-center rounded-md py-3 px-6 font-bold text-darkGray text-xs hover:bg-offWhite  transition-colors border mb-5"
        >
          <FontAwesomeIcon icon={faGauge} className="text-2xl mr-7" />
          Dashboard
        </Link>
        <Link
          href="/admin/user-management "
          className="flex justify-start items-center rounded-md py-3 px-6 font-bold text-darkGray text-xs hover:bg-offWhite  transition-colors border mb-5"
        >
          <FontAwesomeIcon icon={faUser} className="text-2xl mr-7" />
          User Management
        </Link>
        <Link
          href="/admin/dashboard "
          className="flex justify-start items-center rounded-md py-3 px-6 font-bold text-darkGray text-xs hover:bg-offWhite  transition-colors border mb-5"
        >
          <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-7" />
          Manage Colleges
        </Link>
        <Link
          href="/admin/dashboard "
          className="flex justify-start items-center rounded-md py-3 px-6 font-bold text-darkGray text-xs hover:bg-offWhite  transition-colors border mb-5"
        >
          <FontAwesomeIcon icon={faBook} className="text-2xl mr-7" />
          Manage Classes
        </Link>
        <Link
          href="/admin/dashboard "
          className="flex justify-start items-center rounded-md py-3 px-6 font-bold text-darkGray text-xs hover:bg-offWhite  transition-colors border mb-5"
        >
          <FontAwesomeIcon icon={faCommentDots} className="text-2xl mr-7" />
          Manage Requests
        </Link>
        
      </div>
    </div>
  );
}
