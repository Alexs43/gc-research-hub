"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabaseBrowser";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const slug = params.slug;
  const [courses, setCourses] = useState<any>();
  const [department, setDepartment] = useState<any>();

  useEffect(() => {
    async function getDepartment() {
      let { data: department, error } = await supabase
        .from("colleges")
        .select("*")
        .eq("college_code", slug);

      if (error) console.log(error);
      else {
        setDepartment(department);
        console.log(department);
      }
    }
    async function getCourses() {
      let { data: courses, error } = await supabase
        .from("courses")
        .select("*")
        .eq("college_id", department[0].college_id)
        .order("course_name", { ascending: true });

      if (error) console.log(error);
      else {
        setCourses(courses);
        console.log("asdasdas");
      }
    }

    getDepartment();
    getCourses();
  }, []);

  return (
    <main className="py-10">
      <div className="container mx-auto py-5 text-center">
        <h1 className="text-2xl font-bold text-primaryGreen ">
          Gordon College Departments
        </h1>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
          excepturi nobis eius, aperiam consectetur, quas, modi sed sapiente
          tempore suscipit ut explicabo voluptatibus dolor. Nobis dolores unde
          rem iure nihil!
        </p>
      </div>
      <div className="container mx-auto flex justify-center flex-wrap gap-x-10  text-white gap-y-10 text-2xl">
        {courses?.map((course: any) => (
          <Link
            key={department.college_id}
            href="/colleges/ccs"
            className={`bg-gradient-to-r from-transparent to-${department.college_color}-600 via-${department.college_color}-500 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative`}
          >
            <h1
              className=" font-bold  text-center absolute z-[1] "
              key={department.college_id}
            >
              {department.college_name}
            </h1>
            <div
              className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "
              key={department.college_id}
            ></div>
            <div
              className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  "
              key={department.college_id}
            >
              <Image
                src={`/static/images/${department.college_logo_name}`}
                alt="Gordon College Logo"
                fill={true}
                className=" opacity-20"
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
