import Image from "next/image";
import Link from "next/link";

export default function ABOUT() {
  return (
    <main className="flex-grow">
      <div className="text-center relative h-screen">
        <div className="relative h-full">
          <Image
            src="/static/images/gcabout.png"
            alt="About"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <p className="text-xl font-bold text-center mx-80 mb-4">
            The Gordon College Research Hub is an institutional repository. A service of the Gordon College library, the Research Hub provides an online home for the creative work, and research of the University's faculty, students, and researchers.
            </p>
            <p className="text-xl font-bold text-center mx-80"> 
            The repository can be used to share working papers, copies of published articles, datasets, conference papers, posters, presentations, theses and dissertations, and digital projects. Work that is shared through the repository is openly available for students of Gordon College.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}