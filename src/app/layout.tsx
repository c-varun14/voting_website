import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cambridge elections",
  description: "A voting system build for Cambridge school.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-darkest h-screen flex justify-center items-center w-screen">
        {children}
      </body>
    </html>
  );
}
