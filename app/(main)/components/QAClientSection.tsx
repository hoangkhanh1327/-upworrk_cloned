import Link from 'next/link';

const QAClientSection = () => {
    return (
        <section className='my-12'>
            <div className='bg-qa-client bg-cover bg-top p-[30px] rounded-[8px]'>
                <p className='text-2xl -tracking-[.002em] mb-[100px] text-white font-normal'>
                    For clients
                </p>
                <h2 className='text-[72px] leading-[72px] mb-[30px] text-white -tracking-[1px] font-rza'>
                    <span>
                        Find talent
                        <br />
                        your way
                    </span>
                </h2>
                <div className='grid grid-cols-12 gap-8'>
                    <div className='col-span-5'>
                        <p className='text-lg leading-6 mb-5 text-white'>
                            Work with the largest network of independent
                            professionals and get things done—from quick
                            turnarounds to big transformations.
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-8'>
                    <div className='mt-2.5'>
                        <Link
                            href={`#`}
                            className='bg-[#108a00] hover:bg-white group transition-all p-[15px] flex items-start max-h-[unset] whitespace-[unset] text-left rounded-[8px] m-0 w-full h-full flex-col border-2 border-solid border-transparent'
                        >
                            <span className='mb-5 mt-0 text-[36px] leading-[36px] -tracking-[.002em] block text-white group-hover:text-[#108a00] font-medium'>
                                Post a job
                                <br />
                                and hire a pro
                            </span>
                            <span className='text-lg mt-auto text-left w-full group-hover:text-[#108a00] text-white block -tracking-[.002em]'>
                                <span className='text-lg tracking-[inherit] '>
                                    Talent Marketplace
                                </span>
                                <sup className='text-[8px] leading-[18px] align-top'>
                                    TM
                                </sup>
                                <svg
                                    data-v-e07ebb40=''
                                    width='15'
                                    height='15'
                                    viewBox='0 0 15 15'
                                    fill='#ffffff'
                                    xmlns='http://www.w3.org/2000/svg'
                                    data-qa='arrow'
                                    className='align-middle ml-2 inline-block'
                                >
                                    <path
                                        data-v-e07ebb40=''
                                        d='M7 0.5L5.775 1.725L10.675 6.625H0L0 8.375H10.675L5.775 13.275L7 14.5L14 7.5L7 0.5Z'
                                    ></path>
                                </svg>
                            </span>
                        </Link>
                    </div>
                    <div className='mt-2.5'>
                        <Link
                            href={`#`}
                            className='bg-[#108a00] hover:bg-white group transition-all p-[15px] flex items-start max-h-[unset] whitespace-[unset] text-left rounded-[8px] m-0 w-full h-full flex-col border-2 border-solid border-transparent'
                        >
                            <span className='mb-5 mt-0 text-[36px] leading-[36px] -tracking-[.002em] block text-white group-hover:text-[#108a00] font-medium'>
                                Browse and
                                <br />
                                buy projects
                            </span>
                            <span className='text-lg mt-auto text-left w-full group-hover:text-[#108a00] text-white block -tracking-[.002em]'>
                                <span className='text-lg tracking-[inherit] '>
                                    Project Catalog
                                </span>
                                <sup className='text-[8px] leading-[18px] align-top'>
                                    TM
                                </sup>
                                <svg
                                    data-v-e07ebb40=''
                                    width='15'
                                    height='15'
                                    viewBox='0 0 15 15'
                                    fill='#ffffff'
                                    xmlns='http://www.w3.org/2000/svg'
                                    data-qa='arrow'
                                    className='align-middle ml-2 inline-block'
                                >
                                    <path
                                        data-v-e07ebb40=''
                                        d='M7 0.5L5.775 1.725L10.675 6.625H0L0 8.375H10.675L5.775 13.275L7 14.5L14 7.5L7 0.5Z'
                                    ></path>
                                </svg>
                            </span>
                        </Link>
                    </div>
                    <div className='mt-2.5'>
                        <Link
                            href={`#`}
                            className='bg-[#108a00] hover:bg-white group transition-all p-[15px] flex items-start max-h-[unset] whitespace-[unset] text-left rounded-[8px] m-0 w-full h-full flex-col border-2 border-solid border-transparent'
                        >
                            <span className='mb-5 mt-0 text-[36px] leading-[36px] -tracking-[.002em] block text-white group-hover:text-[#108a00] font-medium'>
                                Get advice from
                                <br />
                                an industry expert
                            </span>
                            <span className='text-lg mt-auto text-left w-full group-hover:text-[#108a00] text-white block -tracking-[.002em]'>
                                <span className='text-lg tracking-[inherit] '>
                                    Consultations
                                </span>
                                <sup className='text-[8px] leading-[18px] align-top'>
                                    TM
                                </sup>
                                <svg
                                    data-v-e07ebb40=''
                                    width='15'
                                    height='15'
                                    viewBox='0 0 15 15'
                                    fill='#ffffff'
                                    xmlns='http://www.w3.org/2000/svg'
                                    data-qa='arrow'
                                    className='align-middle ml-2 inline-block'
                                >
                                    <path
                                        data-v-e07ebb40=''
                                        d='M7 0.5L5.775 1.725L10.675 6.625H0L0 8.375H10.675L5.775 13.275L7 14.5L14 7.5L7 0.5Z'
                                    ></path>
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QAClientSection;
