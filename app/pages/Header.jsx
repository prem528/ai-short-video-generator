"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../about/_components/toggle-theme";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const userRole = user?.publicMetadata?.role; // Assuming role is stored in publicMetadata
  const redirectPath = userRole === "admin" ? "/admin" : "/dashboard";

  const handleButtonClick = () => {
    setIsLoading(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold text-white gap-2"
          >
            <Image src={"/logo.png"} width={100} height={50} alt="logo" />
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Video Generator
            </h2>
          </Link>
          <div className="font-semibold text-lg hidden md:flex space-x-8">
            <Link
              href="#features"
              className="text-blue-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-blue-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-blue-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-blue-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <Link href={redirectPath} onClick={handleButtonClick}>
              <Button
                className={`rounded-full shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 flex items-center`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Get Started"
                )}
              </Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
