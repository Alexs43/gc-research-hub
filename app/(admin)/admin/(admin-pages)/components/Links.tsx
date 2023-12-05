"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGauge,
  faUser,
  faBuildingColumns,
  faBook,
  faCommentDots,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
export default function Links() {
  const activeClass = "bg-primaryGreen text-white";
  const inactiveClass = "text-darkGray hover:bg-offWhite transition-colors";
  const pathname = usePathname();
  return (
    <div className="mt-10 px-3">
      <Link
        href="/admin/dashboard "
        className={
          `flex justify-start items-center rounded-md py-3 px-6 font-bold transition-colors border mb-5 text-xs ` +
          `${pathname === "/admin/dashboard" ? activeClass : inactiveClass}`
        }
      >
        <FontAwesomeIcon icon={faGauge} className="text-2xl mr-7" />
        Dashboard
      </Link>
      <Link
        href="/admin/user-management "
        className={
          `flex justify-start items-center rounded-md py-3 px-6 font-bold transition-colors border mb-5 text-xs ` +
          `${
            pathname === "/admin/user-management" ? activeClass : inactiveClass
          }`
        }
      >
        <FontAwesomeIcon icon={faUser} className="text-2xl mr-7" />
        User Management
      </Link>
      <Link
        href="/admin/college-management "
        className={
          `flex justify-start items-center rounded-md py-3 px-6 font-bold transition-colors border mb-5 text-xs ` +
          `${
            pathname === "/admin/college-management"
              ? activeClass
              : inactiveClass
          }`
        }
      >
        <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-7" />
        Manage Colleges
      </Link>
      <Link
        href="/admin/class-management "
        className={
          `flex justify-start items-center rounded-md py-3 px-6 font-bold transition-colors border mb-5 text-xs ` +
          `${
            pathname === "/admin/class-management" ? activeClass : inactiveClass
          }`
        }
      >
        <FontAwesomeIcon icon={faBook} className="text-2xl mr-7" />
        Manage Classes
      </Link>
      <Link
        href="/admin/requests "
        className={
          `flex justify-start items-center rounded-md py-3 px-6 font-bold transition-colors border mb-5 text-xs ` +
          `${pathname === "/admin/requests" ? activeClass : inactiveClass}`
        }
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-2xl mr-7" />
        Manage Requests
      </Link>
    </div>
  );
}
