"use client";

import React, { useEffect } from "react";

import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardTeacher,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
export default function DTContainer() {
  const [data, setData] = React.useState<any>("user");
  const [loading, setLoading] = React.useState<boolean>(true);
  const activeClass = "bg-offWhiteDarker";
  const inactiveClass = "bg-white hover:bg-offWhite";
  const sampleData1: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  const sampleData2: Payment[] = [
    {
      id: "1231123",
      amount: 100,
      status: "success",
      email: "",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="w-full h-full mt-2 flex border rounded-lg shadow-md">
      
      <div className="w-2/12 h-full flex flex-col py-3 px-5 gap-3 border-r">
        <h1 className="text-2xl text-primaryGreen py-2 mb-4">Roles</h1>
        <button
          type="button"
          title="select_data"
          data-value="user"
          onClick={() => {
            setLoading(true);
            setData("user");
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          className={`w-full py-2 px-3 flex justify-start items-center gap-5 text-left text-primaryBlack transition-colors rounded-md font-semibold ${
            data === "user" ? activeClass : inactiveClass
          }`}
        >
          <FontAwesomeIcon icon={faUser} className="" fixedWidth={true} />
          <span className="">User</span>
        </button>
        <button
          type="button"
          title="select_data"
          data-value="faculty"
          onClick={() => {
            setLoading(true);
            setData("faculty");
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          className={`w-full py-2 px-3 flex justify-start items-center gap-5 text-left text-primaryBlack transition-colors rounded-md font-semibold ${
            data === "faculty" ? activeClass : inactiveClass
          }`}
        >
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className=""
            fixedWidth={true}
          />
          <span className="">Faculty</span>
        </button>
        <button
          type="button"
          title="select_data"
          data-value="faculty"
          onClick={() => {
            setLoading(true);
            setData("admin");
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          className={`w-full py-2 px-3 flex justify-start items-center gap-5 text-left text-primaryBlack transition-colors rounded-md font-semibold ${
            data === "admin" ? activeClass : inactiveClass
          }`}
        >
          <FontAwesomeIcon icon={faUserTie} className="" fixedWidth={true} />
          <span className="">Admin</span>
        </button>
      </div>
      <div className="w-full">
        {loading ? (
          <div>Loading...</div>
        ) : data === "user" ? (
          <DataTable data={sampleData1} columns={columns} />
        ) : (
          <DataTable data={sampleData2} columns={columns} />
        )}
      </div>
    </div>
  );
}
