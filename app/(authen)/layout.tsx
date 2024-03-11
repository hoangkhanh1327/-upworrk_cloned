import CommonFooter from '@/components/CommonFooter';
import CommonHeader from '@/components/CommonHeader';

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-screen h-screen flex flex-col'>
            <CommonHeader />
            {children}
            <CommonFooter />
        </div>
    );
}
