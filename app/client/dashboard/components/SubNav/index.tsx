import Link from 'next/link';

const SubNav = () => {
    return (
        <div className='relative after:content-[""] after:block after:bg-[#d5e0d5] after:w-full after:h-[2px] after:rounded-[6px]'>
            <nav className='block'>
                <ul className='relative top-[2px] flex overflow-y-hidden overflow-x-auto scrollbar scrollbar-w-[0px] gap-x-6 p-0 m-0 list-none'>
                    <li className='mb-0 list-item'>
                        <Link href={`/client/dashboard`}>All job posts</Link>
                    </li>
                    <li className='mb-0 list-item'>
                        <Link href={`/client/contract`}>All contracts</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SubNav;
