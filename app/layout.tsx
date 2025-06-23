import type { Metadata } from "next";
import "./globals.css";
import Layout_ from "./ModifiedLayout";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Admin Panel - ThoughtsHub",
  description: "Admin panel for ThoughtsHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-fira antialiased h-screen">
        <Providers>
          <Layout_>{children}</Layout_>
        </Providers>
      </body>
    </html>
  );
}
