import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ name, icon, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center space-x-2 py-4 px-1 border-b-4 font-medium text-sm transition-all

${
  isActive
    ? "border-[#5E0006] text-[#5E0006]"
    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
}

`
      }
    >
      {icon}

      <span>{name}</span>
    </NavLink>
  );
}
