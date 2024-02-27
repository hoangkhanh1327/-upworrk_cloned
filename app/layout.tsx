import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from '@/components/Header';
import '@/styles/app.scss'

export const metadata: Metadata = {
  title: "Upwork VN Version",
  description: "Upwork Cloned",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
