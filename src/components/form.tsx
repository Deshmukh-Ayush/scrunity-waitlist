"use client";

import { Inter } from "next/font/google";
import React, { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);
  return (
    <div className="mt-10">
      <h3 className="text-4xl text-neutral-100">Join Waitlist</h3>
      <div className="relative mt-4 w-full max-w-xs">
        <input
          ref={inputRef}
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          className={`${inter.className} text-sm p-2 pr-8 rounded-md bg-neutral-800 text-neutral-100 w-full ring-neutral-500 focus:ring-2 focus:ring-neutral-500 focus:outline-none transition-all duration-200 ease-in-out`}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold border border-neutral-600 rounded px-1 pointer-events-none">
          /
        </span>
      </div>
      <button
        className={`${inter.className} mt-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 py-2 px-4 rounded-md transition-colors duration-200 ease-in-out`}
      >
        Join Waitlist
      </button>
    </div>
  );
};
