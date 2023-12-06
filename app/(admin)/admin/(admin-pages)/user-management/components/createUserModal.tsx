import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
export default  function  CreateUserModal() {
  async function create(formData: FormData){
    "use server";

  }
  return (
    <div className="h-screen w-screen flex justify-center items-center fixed top-0 right-0 bg-[rgb(0,0,0,0.3)] z-30 ">
      <div className="w-1/2 bg-white rounded-xl py-3 px-4">
        <div className="flex justify-between items-center font-semibold text-primaryBlack">
          <h2 className="text-2xl font-bold">Create User</h2>
          <Link href="user-management" className="text-2xl">
            <FontAwesomeIcon icon={faTimes} fixedWidth={true} />
          </Link>
        </div>
        <hr className="border-primaryGreen border" />
        <form action="">
            <label htmlFor="">Email</label>
            {/* first name, middle name, last name, email, contact num, dob, gender, role, college */}
        </form>
      </div>
    </div>
  );
}
