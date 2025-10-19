import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import QueryProvider from "./providers/QueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon App - Next.js Routing",
  description: "A Pokemon collection app demonstrating Next.js routing and navigation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
        <header className="shadow-lg" style={{ backgroundColor: '#134686' }}>
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-white text-xl font-bold hover:opacity-80 transition-opacity"
                >
                  Pokemon Collection
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-white hover:opacity-80 px-3 py-2 rounded-md text-sm font-medium transition-opacity"
                >
                  Main List
                </Link>
              </div>
            </div>
          </nav>
        </header>

          <main className="min-h-screen" style={{ backgroundColor: '#fdf4e3' }}>
            {children}
          </main>

          <footer className="text-white py-8" style={{ backgroundColor: '#134686' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  © 2025 Pokemon App - Next.js Routing Exercise | Juan Cruz Mateos FIUNMdP
                </p>
              </div>
            </div>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
