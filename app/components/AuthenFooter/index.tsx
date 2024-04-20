import Link from 'next/link';

const CommonFooter = () => {
    return (
        <div className=''>
            <footer className='container bg-blue-500 py-12 rounded-lg mb-3'>
                <p className='text-center'>
                    <small className='text-white text-lg'>
                        © 2024 ITWork® Global VietNam❤️
                    </small>
                    <small className='text-white text-lg leading-[1.454]'>•</small>
                    {/* <Link
                        className='text-white font-semibold no-underline text-lg'
                        href={'/chinh-sach-bao-mat'}
                    >
                        Chính sách bảo mật
                    </Link> */}
                </p>
            </footer>
        </div>
    );
};

export default CommonFooter;
