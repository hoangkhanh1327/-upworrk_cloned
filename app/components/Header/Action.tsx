import Link from 'next/link';
import { Button } from '../ui/button';
import SearchBox from './SearchBox';

const Action = () => {
    return (
        <div className='ml-auto flex items-center'>
            <SearchBox />
            <Link href={'/dang-ky'} className='mx-6 text-sm font-medium'>Đăng ký</Link>
            <Button className='rounded-full bg-primary-color hover:bg-primary-color/50' asChild>
                <Link href={'/dang-nhap'} className='text-sm font-medium'>Đăng nhập</Link>
            </Button>
        </div>
    );
};

export default Action;
