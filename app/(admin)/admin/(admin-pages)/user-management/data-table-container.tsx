"use client";

import React, { useEffect } from "react";

import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardTeacher,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
export const revalidate = 0;
import { supabase } from "@/utils/supabaseBrowser";
export default function DTContainer() {
  const [data, setData] = React.useState<any>("user");
  const [loading, setLoading] = React.useState<boolean>(true);
  const activeClass = "bg-offWhiteDarker";
  const inactiveClass = "bg-white hover:bg-offWhite";

  const [studentData, setStudentData] = React.useState<Student[]>([]);
  useEffect(() => {
    getStudentData();
  }, []);
  async function getStudentData() {
    setLoading(true)
    const { data, error } = await supabase
      .from("student")
      .select(
        "student_id, year_level, block, course_id, college_id, person(first_name, last_name, middle_name, role, email, contact_number, gender, date_of_birth)"
      )
      .eq("person.role", "student");

    if (error) console.log("error", error);
    setLoading(false)
    const students = data?.map((student: any) => {
      return {
        id: student.student_id,
        full_name: `${student.person?.first_name} ${student.person?.last_name}`,
        email: student.person?.email,
        year_level: student.year_level,
        college_id: student.college_id,
        action: student.student_id,
      };
    });

    setStudentData(students|| []);
  }
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
          <div className="w-full flex items-center justify-center h-full text-2xl font-bold ">Loading...</div>
        ) : data === "user" ? (
          <DataTable data={studentData} columns={columns} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
