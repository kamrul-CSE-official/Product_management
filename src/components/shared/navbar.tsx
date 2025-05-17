"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import NavList from "./navItems";
import ThemChangeToggle from "./themeChange";
import Logo from "./logo";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          <Logo
            size="sm"
            className="flex items-center justify-center gap-1"
            sol={false}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavList />

          <ThemChangeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t px-4 py-3 space-y-2">
          <Link
            href="/"
            className="block text-gray-900 dark:text-white hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link
            href="/login"
            className="block text-gray-900 dark:text-white hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          <ThemChangeToggle />
        </div>
      )}
    </header>
  );
}
