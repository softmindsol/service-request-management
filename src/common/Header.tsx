// Header.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { FaSun, FaMoon, FaUserCog } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

interface HeaderProps {
  theme: 'light' | 'dark';
  serviceName: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setShowSettings: (show: boolean) => void;
  showSettings: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, serviceName, setTheme, setShowSettings, showSettings }) => {
  return (
    <header className="sticky top-0 bg-inherit border-b z-10 dark:bg-gray-900 dark:text-white  flex justify-between  items-center">
      <div className="flex items-center gap-2">
        <Link to='/'>
          <img src={theme === "dark" ? "/logo-white.png" : "/logo.png"} alt="Logo" className="h-[60px] w-[60px]" /></Link>

        <h1 className="text-xl font-semibold">{serviceName}</h1>
        <nav>
          <ul className="flex items-center ml-6">
            <li>
              <NavLink to="/order-status" className="hover:underline hover:text-gray-800  transition">
                Orders
              </NavLink>
            </li>
            {/* You can add more nav items here */}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button className='cursor-pointer' variant="ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Button variant="ghost" onClick={() => setShowSettings(!showSettings)} className="cursor-pointer mr-2 hover:bg-gray-100 p-[8px] rounded-[8px] transition-all duration-100 hover:text-gray-700">
          <FaUserCog size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
