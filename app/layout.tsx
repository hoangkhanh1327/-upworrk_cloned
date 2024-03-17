import type { Metadata } from 'next';
import './global.css';

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
                {children}
            </body>
        </html>
    );
}
