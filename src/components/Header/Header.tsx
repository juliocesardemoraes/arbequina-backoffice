import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-center gap-4 mb-4 mt-4">
        <Link href={"/"}>
          <Image
            src="./logo.svg"
            width={50}
            height={50}
            alt="website logo"
          ></Image>
        </Link>
        <h1>Arbequina-Minimarket</h1>
      </nav>
    </header>
  );
}
