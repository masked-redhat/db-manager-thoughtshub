import { urbanist } from "@/constants/fonts";
import Image from "next/image";

export default function Footer() {
  return (
    <div
      className={`mt-auto flex gap-2 items-center w-full justify-center flex-wrap text-base font-medium ${urbanist} tracking-wider text-gray-800`}
    >
      <Image
        src="/icon.jpg"
        alt="ThoughtsHub Logo"
        width={20}
        height={20}
        priority
        className="rounded-full ml-auto"
      />
      <p>ThoughtsHub 2025.</p>
    </div>
  );
}
