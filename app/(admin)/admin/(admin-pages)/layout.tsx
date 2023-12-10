import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/toaster";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin | GC Research Hub",
  description: "Admin",
};
export const revalidate = 0;
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
