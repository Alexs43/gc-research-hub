import Image from "next/image";
import Link from "next/link";

export default function ABOUT() {
  return (
    <main className="flex-grow">
      <div className="container mx-auto py-5 text-center relative">
        <div className="relative h-96">
          <Image
            src="/static/images/about pic.jpg"
            alt="About"
            layout="fill" 
            objectFit="cover" 
            quality={100} 
          />
          <h1 className="absolute inset-x-0 bottom-0 flex items-center justify-center text-4xl font-bold text-white">
            About
          </h1>
        </div>
        <div className="py-8">
          <p className="text-xl">
            Welcome, Gordon College students, to the exclusive GC Research Hub, your tailored academic companion! Nestled within our hub is a specialized repository crafted just for you, containing a wealth of defended thesis papers curated to meet the unique needs of the Gordon College community. Bid farewell to the days of sifting through endless resources; we've designed a digital space where everything you require is at your fingertips. It's like having a personal research assistant available 24/7! With user-friendly features and intuitive navigation, exploring scholarly work is now a breeze. Whether you're a student in search of references or a professor staying abreast of the latest research, our repository is your dedicated space for all things thesis-related. Embrace the convenience, dive into knowledge, and make the most of your academic journey with the GC Research Hub exclusively for Gordon College students.
          </p>
        </div>
      </div>
    </main>
  );
}
