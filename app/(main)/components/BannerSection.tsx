import Image from 'next/image';
import Link from 'next/link';

const BannerSection = () => {
    return (
        <section className='mt-10 mb-20'>
            <div className='container'>
                <div className='grid grid-cols-12 gap-x-8'>
                    <div className='col-start-1 col-end-6'>
                        <h1 className='text-[80px] leading-[80px] text-[#0cc0df] font-medium mb-3 -tracking-[2px] font-rza '>
                            <span>How work should work</span>
                        </h1>
                        <p className='text-[22px] leading-8 tracking-[.24px] text-[#5e6d55] mb-8 font-medium'>
                            Forget the old rules. You can have the best people.
                            <br />
                            Right now. Right here.
                        </p>
                        <div>
                            <Link
                                href={`#`}
                                className='inline-block bg-[#108a00] hover:bg-[#108a00]/80  rounded-[10rem] px-6 text-base text-white leading-[calc(40px_-_1px)]'
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                    <div className='col-start-8 col-end-12 relative'>
                        <Image
                            fill
                            alt='banner'
                            src={`https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale,w_440,h_300,f_auto,q_auto,dpr_2.0/brontes/hero/searching-talent@2x.png`}
                        />
                    </div>
                </div>
                <div className='mt-[70px]'>
                    <p className='mb-3 text-[#9aaa97] text-base tracking-[.6px]'>
                        Trusted by
                    </p>
                    <div className='grid grid-cols-12 gap-x-8'>
                        <div className='relative h-10'>
                            <Image
                                alt='microsoft'
                                fill
                                src={`images/microsoft.svg`}
                            />
                        </div>
                        <div className='relative h-10'>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
