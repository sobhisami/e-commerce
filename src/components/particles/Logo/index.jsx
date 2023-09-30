"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { StyledLogo } from "./style";
import { PATHS } from "@/constant/path";

const Logo = () => {
  return (
    <StyledLogo>
      <Link href={PATHS.HOME}>
        <img src="/assets/logo.png" alt="Brand" loading="lazy" />
        <h1>Brand</h1>
      </Link>
    </StyledLogo>
  );
};

export default Logo;
