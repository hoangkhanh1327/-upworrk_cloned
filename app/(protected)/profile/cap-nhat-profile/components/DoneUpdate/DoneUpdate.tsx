'use client';

import { Button } from '@/app/components/ui/button';
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DoneUpdate = () => {
    const [accountType, setAccountType] = useState('');
    const router = useRouter();

    useEffect(() => {
        const accountType = Cookies.get('account_type');
        setAccountType(accountType || '');
    }, []);

    return (
        <div className=''>
            <h2 className='text-center mt-20 px-[200px] font-semibold text-5xl'>
                Cảm ơn bạn đã cập nhật thông tin cho chúng tôi. Vui lòng ấn tiếp tục để tiếp tục sử dụng ứng dụng.
            </h2>
            <div className='text-center'>
                <img className='inline-block w-200 '  src={"https://timviecits.id.vn/storage/greentick.gif"}></img>
            </div>
            <div className='flex items-center justify-end mt-40 gap-x-4'>
              
                <Button
                    asChild
                    className='rounded-[16rem] bg-primary-color hover:bg-primary-color/80 text-white'
                >
                    <Link href={`/${accountType}/dashboard`}>Tiếp tục</Link>
                </Button>
            </div>
        </div>
    );
};

export default DoneUpdate;
