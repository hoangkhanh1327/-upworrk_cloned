import CommonHeader from '@/app/components/CommonHeader';
import CommonFooter from '@/app/components/CommonFooter';

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
