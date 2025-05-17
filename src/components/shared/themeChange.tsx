"use client";

import React from "react";
import { useModeAnimation } from "react-theme-switch-animation";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

function ThemChangeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

  return (
    <>
      <Button variant="ghost" ref={ref} onClick={toggleSwitchTheme}>
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  );
}

export default ThemChangeToggle;
