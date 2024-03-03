import type { Metadata } from 'next';
import Header from '@/components/Header';
import './global.css';

export const metadata: Metadata = {
    title: 'Upwork VN Version',
    description: 'Upwork Cloned',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
