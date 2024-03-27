'use client';

import { Button } from '@/app/components/ui/button';
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Remind = () => {
    const [accountType, setAccountType] = useState('');

    useEffect(() => {
        const accountType = Cookies.get('account_type');
        setAccountType(accountType || '');
    }, []);

    return (
        <div className=''>
            <h2 className='text-center mt-20 px-[200px] font-semibold text-5xl'>
                Vui lòng hoàn thành thông tin tài khoản của bạn để có thể sử
                dụng ứng dụng một cách tốt nhất
            </h2>
            <div className='my-20 text-center'>
                <BookOpenText className='inline-block w-40 h-40' />
            </div>
            <div className='flex items-center justify-end mt-40 gap-x-4'>
                <Button
                    asChild
                    className='rounded-[16rem] bg-white hover:bg-white text-black border border-solid border-stone-600'
                >
                    <Link
                        href={
                            accountType === 'client'
                                ? `/client/dashboard`
                                : '/freelancer/dashboard'
                        }
                    >
                        Bỏ qua
                    </Link>
                </Button>
                <Button
                    asChild
                    className='rounded-[16rem] bg-primary-color hover:bg-primary-color/80 text-white'
                >
                    <Link href={`/profile`}>Hoàn thành hồ sơ</Link>
                </Button>
            </div>
        </div>
    );
};

export default Remind;
