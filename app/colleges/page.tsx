import Image from "next/image";
import Link from "next/link";
export default function Colleges() {
  return (
    <main className="py-10">
      <div className="container mx-auto py-5 text-center">
        <h1 className="text-2xl font-bold text-primaryGreen ">
          Gordon College Departments
        </h1>
        <p className="">
        Explore the Gordon College Research Repository, a dynamic academic hub tailored to the unique requirements of students and faculty across diverse departments. Uncover a wealth of defended thesis papers and scholarly works, offering a centralized space for collaborative academic exploration and knowledge discovery, enhancing the educational journey at Gordon College.
        </p>
      </div>
      <div className="container mx-auto flex justify-center flex-wrap gap-x-10  text-white gap-y-10 text-2xl">
        <Link
          href="/colleges/ccs"
          className="bg-gradient-to-r from-transparent to-orange-600 via-orange-500 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className=" font-bold  text-center absolute z-[1] ">
            College of Computer Studies
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  ">
            <Image
              src="/static/images/ccs.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/ceas"
          className="bg-gradient-to-r from-transparent to-blue-600 via-blue-400 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className=" font-bold  text-center absolute z-[1] ">
            College of Education, Arts, and Sciences
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  ">
            <Image
              src="/static/images/ceas.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/cahs"
          className="bg-gradient-to-r from-transparent to-red-600 via-red-400 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className=" font-bold  text-center absolute z-[1] ">
            College of Allied Health Sciences
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  ">
            <Image
              src="/static/images/cahs.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/chtm"
          className="bg-gradient-to-r from-transparent to-pink-600 via-pink-400 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className=" font-bold  text-center absolute z-[1] ">
            College of Hospitality and Tourism Management
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  ">
            <Image
              src="/static/images/chtm.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/cba"
          className="bg-gradient-to-r from-transparent to-yellow-600 via-yellow-400 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className=" font-bold  text-center absolute z-[1] ">
            College of Business and Accountancy
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  ">
            <Image
              src="/static/images/cba.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/graduate-studies"
          className="bg-gradient-to-r from-transparent to-green-600 via-green-400 w-10/12 md:w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className=" font-bold  text-center absolute z-[1] ">
            Insitute of Graduate Studies
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 md:-left-28 -left-14 transform -translate-x-20  ">
            <Image
              src="/static/images/igs.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
