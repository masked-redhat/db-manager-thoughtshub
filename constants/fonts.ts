import { Manrope, Space_Grotesk, Urbanist } from "next/font/google";

const spaceGrotesk_ = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

const urbanist_ = Urbanist({
    variable: "--font-urban",
    subsets: ["latin"],
});

const manrope_ = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"]
})

export const spaceGrotesk = spaceGrotesk_.className
export const urbanist = urbanist_.className
export const manrope = manrope_.className