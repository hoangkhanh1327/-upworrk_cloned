import Link from 'next/link';

const CommonFooter = () => {
    return (
        <div className=''>
            <footer className='container bg-[#001e00] py-12 rounded-lg mb-3'>
                <p className='text-center'>
                    <small className='text-white text-[11px]'>
                        © 2015 - 2024 Upwork® Global Inc.
                    </small>
                    <small className='text-white text-[11px] leading-[1.454]'>•</small>
                    <Link
                        className='text-white font-semibold no-underline text-[11px]'
                        href={'/chinh-sach-bao-mat'}
                    >
                        Chính sách bảo mật
                    </Link>
                </p>
            </footer>
        </div>
    );
};

export default CommonFooter;
