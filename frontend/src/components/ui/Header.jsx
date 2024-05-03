"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Adjust this value based on your needs
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center border-b transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-opacity-30" : "bg-opacity-100"
      }`}
    >
      <Link className="flex items-start justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold text-gray-800 ml-2">
          CrimeWatch.AI
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/demo"
        >
          Demo
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/analytics"
        >
          Analytics
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/contact"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};
function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
