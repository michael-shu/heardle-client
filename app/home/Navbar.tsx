import React from "react";
import Link from "next/link";
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0 shadow-lg">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-x-4">
            <Image alt="logo" src="/logo.svg" width={50} height={75} className="rounded-full" />
            <h1 className="text-white text-2xl font-semibold">Heardle</h1>
          </div>
          <ul className="hidden md:flex gap-x-8 text-white">
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home">
                Home
              </Link>
            </li>
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home/user">
                User
              </Link>
            </li>
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home/play">
                Play
              </Link>
            </li>
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;