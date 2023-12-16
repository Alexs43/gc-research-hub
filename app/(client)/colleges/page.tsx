import Image from "next/image";
import Link from "next/link";
import createSupabaseServerClient from "@/utils/supabase";
export default async function Colleges() {
  const supabase = await createSupabaseServerClient();

  const { data: departments, error } = await supabase
    .from("colleges")
    .select("*")
    .order("college_name", { ascending: true });

  return (
    <main className="py-10">
      <div className="container mx-auto py-5 text-center">
        <h1 className="text-2xl font-bold text-primaryGreen ">
          Gordon College Departments
        </h1>
        <p className="">
          Explore the Gordon College Research Repository, a dynamic academic hub
          tailored to the unique requirements of students and faculty across
          diverse departments. Uncover a wealth of defended thesis papers and
          scholarly works, offering a centralized space for collaborative
          academic exploration and knowledge discovery, enhancing the
          educational journey at Gordon College.
        </p>
      </div>
      <div className="container mx-auto flex justify-center flex-wrap gap-x-10  text-white gap-y-10 text-2xl">
        {departments?.map((department: any) => (
          <Link
            key={department.college_id}
            href={`/colleges/${department.college_code}`}
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
