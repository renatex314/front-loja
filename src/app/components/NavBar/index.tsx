"use client";

import { useTooltip } from "@/providers/TooltipProvider";
import Link from "next/link";
import { FaUserAlt, FaUserAstronaut } from "react-icons/fa";
import AppIcon from "../AppIcon";
import { Divider, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import AppLogo from "./AppLogo";
import AccountSection from "./AccountSection";

const NavBar = () => {
  return (
    <div className="flex bg-white h-16 w-full shadow-sm border-b sticky top-0 px-28">
      <AppLogo />
      <AccountSection />
    </div>
  );
};

export default NavBar;
