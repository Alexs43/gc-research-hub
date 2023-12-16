import Image from "next/image";
import Link from "next/link";
export default function CHTM() {
  return (
    <main>
      <div className="container mx-auto py-5 text-center">
        <h1 className="text-2xl font-bold text-primaryGreen ">
          Gordon College Departments
        </h1>
        <p className="">
        As you embark on your academic journey at Gordon College, each department is committed to providing a supportive and enriching environment. We encourage you to explore the distinctive offerings of each department and engage actively in your chosen field of study.
        </p>
      </div>
      <div className="container mx-auto flex justify-center gap-5 items-center flex-wrap text-white text-2xl">
        <Link
          href="/colleges/ccs"
          className="bg-gradient-to-r from-transparent to-pink-600 via-pink-500 w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className="font-bold text-center absolute z-[1] ">
            BS Computer Science
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 -left-28 transform -translate-x-20  ">
            <Image
              src="/static/images/chtm.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/ccs"
          className="bg-gradient-to-r from-transparent to-pink-600 via-pink-500 w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className="font-bold text-center absolute z-[1] ">
            BS Entertainment and Multimedia Computing
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 -left-28 transform -translate-x-20  ">
            <Image
              src="/static/images/chtm.webp"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/ccs"
          className="bg-gradient-to-r from-transparent to-pink-600 via-pink-500 w-1/3 rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className="font-bold text-center absolute z-[1] ">
            BS Information Technology
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
          <div className="relative aspect-square w-[17rem] h-72 -top-10 -left-28 transform -translate-x-20  ">
            <Image
              src="/static/images/chtm.webp"
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
