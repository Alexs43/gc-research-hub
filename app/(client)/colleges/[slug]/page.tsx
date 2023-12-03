import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import createSupabaseServerClient from "@/utils/supabase";
export default async function Page({ params }: any) {
  const slug = params.slug;
  const supabase = await createSupabaseServerClient();
  const { data: department, error: depError } = await supabase
    .from("colleges")
    .select("*")
    .eq("college_code", slug);
  let courses;
  if (depError) {
    return <div>error</div>;
  } else {
    const coursesQuery = await supabase
      .from("courses")
      .select("*")
      .eq("college_id", department[0].college_id)
      .order("course_name", { ascending: true });
    courses = coursesQuery.data;
  }
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
            key={course?.course_id}
            href="/colleges/ccs"
            className={`bg-gradient-to-r from-transparent to-${department[0].college_color}-600 via-${department[0].college_color}-500 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative`}
          >
            <h1
              className=" font-bold  text-center absolute z-[1] "
              key={course?.course_id}
            >
              {course?.course_name}
            </h1>
            <div
              className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "
              key={course?.course_id}
            ></div>
            <div
              className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  "
              key={course?.course_id}
            >
              <Image
                src={`/static/images/${department[0].college_logo_name}`}
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
