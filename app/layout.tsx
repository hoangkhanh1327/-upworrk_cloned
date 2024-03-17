import type { Metadata } from 'next';
import './global.css';
import AuthProvider from './context/AuthProvider';

export const metadata: Metadata = {
    title: 'IT WORKS VN Version',
    description: 'IT WORKS',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
