import type { Metadata } from "next";
import "./global.css";
import AuthProvider from "./providers/AuthProvider";
import AppThirdwebProvider from './providers/ThirdwebProvider';


export const metadata: Metadata = {
  title: "IT WORKS VN Version",
  description: "IT WORKS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Wrap AuthProvider with ThirdWebProvider */}
        <AuthProvider>
          
          <AppThirdwebProvider>
            {children}
            </AppThirdwebProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
