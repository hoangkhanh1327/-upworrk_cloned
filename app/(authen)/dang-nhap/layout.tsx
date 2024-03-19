import AuthenHeader from '@/app/components/AuthenHeader';
import AuthenFooter from '@/app/components/AuthenFooter';

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-screen h-screen overflow-x-hidden flex flex-col'>
            <AuthenHeader />
            <main className='mx-auto px-20 py-5 flex-1'>{children}</main>
            <AuthenFooter />
        </div>
    );
}
