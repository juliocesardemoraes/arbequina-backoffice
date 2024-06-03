
import Image from "next/image";
import LogoImage from "../assets/logoImage.svg"

export default function Home() {
  return (
    <main>
      <div className="container p-6">
        <span className="relative flex items-center">
        <div className="mr-10">
        <LogoImage style={{ height: "52px", width: "52px"}}
        />
        </div>
      <h1 className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-2xl whitespace-nowrap">
        Arbequina - Minimarket
      </h1>
        </span>
      </div>
    </main>
  );
}
