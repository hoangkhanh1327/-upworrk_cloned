import type { Metadata } from "next";
import "./global.css";
import AuthProvider from "./providers/AuthProvider";
import AppThirdwebProvider from "./providers/ThirdwebProvider";
import { Toaster } from "./components/ui/toaster";
import NotificationProvider from "./providers/NotificationProvider";
import "react-datepicker/dist/react-datepicker.css";

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
          <NotificationProvider>
            <Toaster />
            <AppThirdwebProvider>{children}</AppThirdwebProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
