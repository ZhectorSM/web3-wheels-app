"use client";
import Link from "next/link";
import { Connect } from "./ui/Connect";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Header = () => {

const pathname = usePathname();
  return (
    <nav className="relative bg-black z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <p className="text-white flex items-center gap-1 font-bold text-xl">
                    {/* <CarIcon /> */}
                    <Image src="/Logo.png" alt="Web3 Wheels" width={30} height={30} /> 
                  Web3 Wheels
                </p>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/mint-cars">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/mint-cars" ? " text-white" : ""
                    }`}
                  >
                    Mint A Car
                  </p>
                </Link>
                <Link href="/car-shop">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/car-shop" ? " text-white" : ""}`}
                  >
                    Car Shop
                  </p>
                </Link>
                <Link href="/book-ride">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/book-ride" ? " text-white" : ""}`}
                  >
                    Book A Ride
                  </p>
                </Link>
                <Link href="/dashboard">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/dashboard" ? " text-white" : ""}`}
                  >
                    Dashboard
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="ml-10 flex items-baseline space-x-4">
              <Connect />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
