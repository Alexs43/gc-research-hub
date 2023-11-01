import Image from "next/image";
import Link from "next/link";
export default function Colleges() {
  return (
    <main>
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
      <div className="container mx-auto flex justify-center">
        <Link
          href="/colleges/ccs"
          className="bg-gradient-to-r from-transparent to-orange-600 via-orange-500 w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className="text-2xl font-bold text-primaryBlack text-center absolute z-10 ">
            College of Computer Studies
          </h1>
          <div className="relative w-72 h-72 -top-10 -left-28 transform -translate-x-20  ">
            <Image
              src="/static/images/ccs-logo.svg"
              alt="Gordon College Logo"
              fill={true}
              className=" opacity-20"
            />
          </div>
        </Link>
        <Link
          href="/colleges/ceas"
          className="bg-gradient-to-r from-transparent to-blue-600 via-blue-400 w-1/3  rounded-3xl overflow-hidden h-56 grid place-items-center text-center border  shadow-md relative"
        >
          <h1 className="text-2xl font-bold text-primaryBlack text-center absolute z-10 ">
            College of Education, Arts, and Sciences
          </h1>
          <div className="relative w-72 h-72 -top-10 -left-28 transform -translate-x-20  ">
            <Image
              src="/static/images/ccs-logo.svg"
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
