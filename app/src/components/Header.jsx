"use client";
import Link from "next/link";
import { Connect } from "./ui/Connect";
import { usePathname } from "next/navigation";
import CarIcon from "./ui/CarIcon";
const Header = () => {

const pathname = usePathname();
  return (
    <nav className="bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <p className="text-white flex gap-1 font-bold text-xl">
                    <CarIcon />
                  Web3 Wheels
                </p>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/mint-car">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/mint-car" ? " text-white" : ""
                    }`}
                  >
                    MINT A CAR
                  </p>
                </Link>
                <Link href="/car-shop">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/car-shop" ? " text-white" : ""}`}
                  >
                    CAR SHOP
                  </p>
                </Link>
                <Link href="/book-ride">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/book-ride" ? " text-white" : ""}`}
                  >
                    BOOK A RIDE
                  </p>
                </Link>
                <Link href="/dashboard">
                  <p
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/dashboard" ? " text-white" : ""}`}
                  >
                    DASHBOARD
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
