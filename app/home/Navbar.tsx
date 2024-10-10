'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-teal-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Branding */}
        <div className="flex items-center gap-x-3">
          <Image alt="logo" src="/logo.svg" width={50} height={50} className="rounded-full" />
          <h1 className="text-white text-3xl font-bold tracking-wide">Heardle</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white text-lg">
          <Link href="/home" className="hover:text-gray-300 transition duration-300">Home</Link>
          <Link href="/home/user" className="hover:text-gray-300 transition duration-300">User</Link>
          <Link href="/home/play" className="hover:text-gray-300 transition duration-300">Play</Link>
          <Link href="/home/about" className="hover:text-gray-300 transition duration-300">About</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={handleToggle} className="focus:outline-none">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-900 transition-all duration-300">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li className="text-white hover:text-gray-300">
              <Link href="/home">Home</Link>
            </li>
            <li className="text-white hover:text-gray-300">
              <Link href="/home/user">User</Link>
            </li>
            <li className="text-white hover:text-gray-300">
              <Link href="/home/play">Play</Link>
            </li>
            <li className="text-white hover:text-gray-300">
              <Link href="/home/about">About</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
