"use client";
import Link from "next/link";
import { Connect } from "./ui/Connect";
import { usePathname } from "next/navigation";
const Header = () => {

const pathname = usePathname();

  return (
    <nav className="bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <p className="text-white font-bold text-xl">web3 wheels</p>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/mint-cars">
                    <p className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/mint-cars' ? ' text-white' : ''}`}>
                      Mint Cars
                    </p>
                  </Link>
                  <Link href="/cars">
                    <p className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/cars' ? ' text-white' : ''}`}>
                      Cars List
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
