import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { LockKeyhole } from 'lucide-react';
import { useRef } from 'react';

interface ILoginFormStep2 {
    username: string;
    handleLogin: (data: string) => void;
}

const LoginFormStep2: React.FC<ILoginFormStep2> = ({
    username,
    handleLogin,
}) => {
    const passwordRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className='px-12 py-4 mt-8 overflow-x-hidden min-w-[500px] max-w-[570px] mx-auto border border-solid border-[#d5e0d5] rounded-2xl'>
            <div className='px-8'>
                <h1 className='text-[28px] mt-6 mb-6 leading-8 text-center font-semibold'>
                    Welcome
                </h1>

                <h4 className='mt-6 mb-3 pb-2 overflow-hidden text-ellipsis whitespace-nowrap text-base text-center'>
                    {username}
                </h4>

                <div>
                    <div className='relative border-2 border-solid border-[#e4ebe4] rounded-lg mb-6'>
                        <LockKeyhole className='w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2' />
                        <Input
                            ref={passwordRef}
                            defaultValue={'abc123'}
                            type='password'
                            className='w-full !border-0 focus-visible:!ring-transparent focus-visible:!ring-offset-0 pl-12 pr-4 !py-2 '
                        />
                    </div>

                    <Button
                        onClick={() =>
                            passwordRef.current?.value &&
                            handleLogin(passwordRef.current?.value)
                        }
                        className='block w-full bg-[#108a00] hover:bg-[#108a00]/80  rounded-[10rem] '
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginFormStep2;
