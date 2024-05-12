import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center h-fit">
        <h1 className="text-6xl font-extrabold bg-zinc-900 text-transparent bg-clip-text">
          Web3 Wheels
        </h1>
        <p className="text-xl text-gray-600">Travel Smarter</p>
        <div className="flex gap-4 mt-8">
          <Link href="/mint-cars">
            <p className="text-lg p-1 px-2 rounded-lg font-medium  border-zinc-900 border text-gray-100 bg-zinc-800 hover:bg-zinc-900 hover:shadow-sm hover:shadow-black transition duration-75 active:bg-zinc-800  active:translate-y-0.5">
              Mint Cars
            </p>
          </Link>
          <Link href="/cars">
            <p className="text-lg p-1 px-2 rounded-lg font-medium border-zinc-900 border text-zinc-900 bg-gray-100 hover:bg-gray-200 hover:shadow-sm hover:shadow-gray-200 transition duration-75 active:bg-gray-100  active:translate-y-0.5">
              Cars List
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
