"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CiSearch, CiUser, CiShoppingCart, CiMenuBurger, CiCircleRemove } from "react-icons/ci";
import { useCart } from "./CartContext";

const Navbar: React.FC = () => {
  const { cartCounts } = useCart();
  const totalCartCount = Object.values(cartCounts).reduce((a, b) => a + b, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full border-b border-slate-400 flex items-center justify-between px-4 py-3 md:h-20 h-auto">
      {/* Brand Title */}
      <div className="title font-bold text-blue-900 text-xl md:text-4xl">
        <Link href="/">SwiftCart</Link>
      </div>

      {/* Navigation Menu for Desktop */}
      <nav className="hidden md:flex">
        <ul className="flex items-center gap-4 font-bold">
          {[
            { label: "Home", href: "/" },
            { label: "Men's", href: "/men" },
            { label: "Women's", href: "/women" },
            { label: "Jewelery", href: "/jewelery" },
            { label: "Electronics", href: "/electronics" },
          ].map((item, index) => (
            <li
              key={index}
              className="hover:underline underline-offset-4 cursor-pointer decoration-blue-900 text-slate-600"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex w-full max-w-xs sm:max-w-md lg:max-w-lg p-2">
      <div className="flex items-center w-full border-2 border-blue-900 rounded-full">
        <CiSearch className="text-blue-900 text-xl ml-4" />
        <input
          type="text"
          placeholder="Search..."
          title="search"
          className="w-full py-2 px-4 rounded-full focus:outline-none"
        />
      </div>
    </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        <CiUser className="text-2xl cursor-pointer" title="Profile" />
        <div className="relative">
          <Link href="/cart" title="Cart">
            <CiShoppingCart className="text-2xl cursor-pointer" />
          </Link>
          {totalCartCount > 0 && (
            <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs rounded-full">
              {totalCartCount}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <CiCircleRemove /> : <CiMenuBurger />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-20 left-0 w-full bg-white shadow-md z-10 md:hidden">
          <ul className="flex flex-col items-center gap-4 py-4 font-bold">
            {[
              { label: "Home", href: "/" },
              { label: "Men's", href: "/men" },
              { label: "Women's", href: "/women" },
              { label: "Jewelery", href: "/jewelery" },
              { label: "Electronics", href: "/electronics" },
            ].map((item, index) => (
              <li
                key={index}
                className="hover:underline underline-offset-4 cursor-pointer decoration-blue-900 text-slate-600"
              >
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
