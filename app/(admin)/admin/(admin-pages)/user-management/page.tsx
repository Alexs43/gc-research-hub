import React from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import DTContainer from "./data-table-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CreateUserModal from './components/createUserModal';
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}
async function getFaculty(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1231123",
      amount: 100,
      status: "success",
      email: "m@example.com",
    },
    // ...
  ];
}
type Props = {
  searchParams: Record<string, string> | undefined | null;
};
export default async function page({searchParams} : Props) {
  const modal = searchParams?.addUser;
  const data = await getData();

  return (
    <div className=" w-full px-10 py-14  overflow-hidden">
      <h1 className="text-4xl text-primaryBlack py-2">User Management</h1>
      <hr className="border-2 border-primaryGreen" />
      <div className="w-full flex justify-end">
        <Link href="user-management/?addUser=true" className="bg-primaryGreen py-2 px-3 rounded-md shadow-sm text-white font-semibold text-sm mt-2">
          <FontAwesomeIcon icon={faPlus} fixedWidth={true} />
          Add User
        </Link>
        {modal && (<CreateUserModal/>)}
      </div>
      <DTContainer />
    </div>
  );
}
