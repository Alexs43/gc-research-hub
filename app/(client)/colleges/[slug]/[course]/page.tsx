import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import createSupabaseServerClient from "@/utils/supabase";
import { redirect } from "next/navigation";
import { Tables } from "@/types/supabase"

type Year = Tables<'school_year'> & {
  year_id: number;
  start_date: string;
  end_date: string;
};


export default async function Page({ params }: {params: {slug: string, course: string}}) {
  const slug = params.slug;
  const course = params.course;
  const supabase = await createSupabaseServerClient();
  let school_year: Year[];
  const { data: department, error: depError } = await supabase
    .from("colleges")
    .select("*")
    .eq("college_code", slug);
  if (!department || department.length === 0) {
    // Handle empty department or error (e.g., show error message)
    redirect("/404");
  } else {
    const { data: schoolYear, error } = await supabase.from('school_year').select("*")
    school_year = schoolYear || [];
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
        {school_year?.map((year: Year) => (
          <Link
            key={year?.year_id}
            href={`/colleges/${slug}/${course}/${year?.year_id}`}
            className={`bg-gradient-to-r from-transparent to-${department[0].college_color}-600 via-${department[0].college_color}-500 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative`}
          >
            <h1
              className=" font-bold  text-center absolute z-[1] "
              key={year?.year_id}
            >
              Academic Year <br />
              {parseInt(year?.start_date.split("-")[0], 10)} -{" "}
              {parseInt(year?.end_date.split("-")[0], 10) }
            </h1>
            <div
              className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "
              key={year?.year_id}
            ></div>
            <div
              className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  "
              key={year?.year_id}
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
