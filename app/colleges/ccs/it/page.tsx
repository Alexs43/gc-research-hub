import Image from "next/image";
import Link from "next/link";

export default function IT() {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold mb-4">IT Research Paper</h1>
        <div className="grid grid-cols-4 gap-4">
          <Link href="/colleges/ccs/cs">
            <div className="rounded-md overflow-hidden bg-white shadow-lg">
              <Image
                src="/static/images/ccs.png"
                alt="Book"
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="px-4 py-2">
                <h3 className="text-base font-semibold">[Book title]</h3>
                <p className="text-sm text-gray-500">
                  [Short description of the book]
                </p>
              </div>
            </div>
          </Link>
          <Link href="/colleges/ccs/cs">
            <div className="rounded-md overflow-hidden bg-white shadow-lg">
              <Image
                src="/static/images/ccs.png"
                alt="Book"
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="px-4 py-2">
                <h3 className="text-base font-semibold">[Book title]</h3>
                <p className="text-sm text-gray-500">
                  [Short description of the book]
                </p>
              </div>
            </div>
          </Link>
          <Link href="/colleges/ccs/cs">
            <div className="rounded-md overflow-hidden bg-white shadow-lg">
              <Image
                src="/static/images/ccs.png"
                alt="Book"
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="px-4 py-2">
                <h3 className="text-base font-semibold">[Book title]</h3>
                <p className="text-sm text-gray-500">
                  [Short description of the book]
                </p>
              </div>
            </div>
          </Link>
          <Link href="/colleges/ccs/cs">
            <div className="rounded-md overflow-hidden bg-white shadow-lg">
              <Image
                src="/static/images/ccs.png"
                alt="Book"
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="px-4 py-2">
                <h3 className="text-base font-semibold">[Book title]</h3>
                <p className="text-sm text-gray-500">
                  [Short description of the book]
                </p>
              </div>
            </div>
          </Link>
          <Link href="/colleges/ccs/cs">
            <div className="rounded-md overflow-hidden bg-white shadow-lg">
              <Image
                src="/static/images/ccs.png"
                alt="Book"
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="px-4 py-2">
                <h3 className="text-base font-semibold">[Book title]</h3>
                <p className="text-sm text-gray-500">
                  [Short description of the book]
                </p>
              </div>
            </div>
          </Link>
          <Link href="/colleges/ccs/cs">
            <div className="rounded-md overflow-hidden bg-white shadow-lg">
              <Image
                src="/static/images/ccs.png"
                alt="Book"
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              <div className="px-4 py-2">
                <h3 className="text-base font-semibold">[Book title]</h3>
                <p className="text-sm text-gray-500">
                  [Short description of the book]
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
