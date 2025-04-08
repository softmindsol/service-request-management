// Header.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { FaSun, FaMoon, FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";

interface HeaderProps {
  theme: 'light' | 'dark';
  serviceName: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setShowSettings: (show: boolean) => void;
  showSettings: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, serviceName, setTheme, setShowSettings, showSettings }) => {
  return (
    <header className="sticky top-0 bg-inherit border-b z-10 p-1 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to='/'>
          <img src={theme === "dark" ? "/logo-white.png" : "/logo.png"} alt="Logo" className="h-20 w-20" /></Link>
        
        <h1 className="text-xl font-semibold">{serviceName}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Button variant="ghost" onClick={() => setShowSettings(!showSettings)}>
          <FaUserCog />
        </Button>
      </div>
    </header>
  );
};

export default Header;
