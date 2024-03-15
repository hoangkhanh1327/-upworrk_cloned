import CommonFooter from '@/components/CommonFooter';
import CommonHeader from '@/components/CommonHeader';

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-screen h-screen overflow-x-hidden flex flex-col'>
            <CommonHeader />
            <main className='mx-auto px-20 py-5 flex-1'>{children}</main>
            <CommonFooter />
        </div>
    );
}
