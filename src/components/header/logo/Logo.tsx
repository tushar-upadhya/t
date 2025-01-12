import logo from "@/assets/logo.png";
import React from "react";
import { Link } from "react-router";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-center md:text-left md:flex-row md:items-start md:gap-4">
      <Link to={"/"}>
        <img
          src={logo}
          alt="Logo"
          className="object-contain w-12 h-12 mx-auto md:mx-0"
        />
      </Link>
      <div className="text-sm font-bold text-slate-800">
        <span className="block">e-Telephone Directory 2025</span>
        <span className="text-xs sm:text-sm">
          All India Institute Of Medical Sciences
        </span>
      </div>
    </div>
  );
};

export default Logo;
