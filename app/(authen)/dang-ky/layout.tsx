import CommonHeader from '@/app/components/CommonHeader';

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-screen h-screen overflow-x-hidden flex flex-col'>
            <CommonHeader />
            <main className='container'>{children}</main>
        </div>
    );
}
