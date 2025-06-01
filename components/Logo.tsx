import React from "react";
import LogoSvg from "../assets/logo.svg";

export default function Logo() {
  return (
    <LogoSvg
      width={100}
      height={100}
      style={{ position: "absolute" }}
      className="text-purple-600 dark:text-purple-400"
    />
  );
}
