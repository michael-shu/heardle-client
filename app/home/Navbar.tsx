import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0 shadow-lg">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-x-4">
            <Image alt="logo" src="/logo.svg" width={50} height={75} className="rounded-full" />
            <h1 className="text-white text-2xl font-semibold">Heardle</h1>
          </div>

          {/* Hamburger Menu */}
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>

          {/* Menu Links */}
          <ul className="hidden md:flex gap-x-8 text-white md:block" id="menu">
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home">Home</Link>
            </li>
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home/user">User</Link>
            </li>
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home/play">Play</Link>
            </li>
            <li className="hover:text-gray-300 transition duration-300">
              <Link href="/home/about">About</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul className="bg-emerald-800 text-white absolute left-0 top-20 w-full hidden" id="menu">
        <li className="hover:bg-emerald-700 p-4">
          <Link href="/home">Home</Link>
        </li>
        <li className="hover:bg-emerald-700 p-4">
          <Link href="/home/user">User</Link>
        </li>
        <li className="hover:bg-emerald-700 p-4">
          <Link href="/home/play">Play</Link>
        </li>
        <li className="hover:bg-emerald-700 p-4">
          <Link href="/home/about">About</Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <style jsx>{`
        #menu-toggle:checked + label + #menu {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
