import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href={`/`} className='mr-6'>
            <Image alt='logo' src={'/images/logo.png'} width={82} height={22.5}/>
        </Link>
    );
};

export default Logo;
