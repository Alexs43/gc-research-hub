import Link from "next/link";

export default function AUTHORS() {
  return (
    <main>
      <div className="container mx-auto flex justify-center gap-5 items-center flex-wrap text-white text-2xl">
        <Link
          href=""
          className="bg-white w-1/3 rounded-3xl overflow-hidden h-56 grid place-items-center text-center border shadow-md relative"
        >
          <h1 className="font-bold text-center absolute z-[1] ">
            Alexandra Baduria
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
        </Link>
        <Link
          href=""
          className="bg-white w-1/3 rounded-3xl overflow-hidden h-56 grid place-items-center text-center border shadow-md relative"
        >
          <h1 className="font-bold text-center absolute z-[1] ">
            Marquisha Azia Aguirre
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
        </Link>
        <Link
          href=""
          className="bg-white w-1/3 rounded-3xl overflow-hidden h-56 grid place-items-center text-center border shadow-md relative"
        >
          <h1 className="font-bold text-center absolute z-[1] ">
            Junel Sachi Sain
          </h1>
          <div className="h-full w-full bg-[rgb(0,0,0,0.2)] absolute top-0 right-0 "></div>
        </Link>
      </div>
    </main>
  );
}
