import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font--poppins'
})

export const metadata: Metadata = {
  title: "Fiesta",
  description: "You're one stop shop for all things events",
  icons:{
    icon: '/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
