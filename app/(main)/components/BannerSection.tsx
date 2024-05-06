import Image from 'next/image';
import Link from 'next/link';

const BannerSection = () => {
    return (
        <section className='mt-10 mb-20'>
            <div className='container'>
                <div className='grid grid-cols-12 gap-x-8'>
                    <div className='col-start-1 col-end-6'>
                        <h1 className='text-[40px] leading-[80px] text-[#0cc0df] font-medium mb-3 -tracking-[2px] font-rza '>
                            <span>ITWORKS ỨNG DỤNG TÌM VIỆC CÔNG NGHỆ THÔNG TIN </span>
                        </h1>
                        <p className='text-[22px] leading-8 tracking-[.24px] text-[#5e6d55] mb-8 font-medium'>
                        IT Work cho phép người dùng dễ dàng duyệt và đăng bài viết tuyển dụng công việc, tạo điều kiện kết nối mượt mà giữa nhà tuyển dụng và freelancer.
                            <br />
                        </p>
                        <div>
                            <Link
                                href={`#`}
                                className='inline-block bg-[#108a00] hover:bg-[#108a00]/80  rounded-[10rem] px-6 text-base text-white leading-[calc(40px_-_1px)]'
                            >
                                Tạo tài khoản ngay
                            </Link>
                        </div>
                    </div>
                    <div className='col-start-8 col-end-12 relative'>
                        <Image
                            fill
                            alt='banner'
                            src={`https://timviecits.id.vn/storage/banner.webp`}
                        />
                    </div>
                </div>
                <div className='mt-[70px]'>
                    <p className='mb-3 text-[#9aaa97] text-base tracking-[.6px]'>
                        Đáng tin tưởng với <span>smart contract</span>
                    </p>
                    <div className='grid grid-cols-6 gap-x-2'>
                        <div className='relative h-40'>
                            <Image
                                alt='microsoft'
                                fill
                                src={`https://timviecits.id.vn/storage/tincay.png`}
                            />
                        </div>
                        {/* <div className='relative h-10'>
                            <Image
                                alt='microsoft'
                                fill
                                src={`images/airbnb.svg`}
                            />
                        </div>
                        <div className='relative h-10'>
                            <Image
                                alt='microsoft'
                                fill
                                src={`images/bissell.svg`}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
