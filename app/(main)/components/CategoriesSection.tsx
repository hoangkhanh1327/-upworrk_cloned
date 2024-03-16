import Link from 'next/link';
import { categoriesData } from '../data/categories.data';

const CategoriesSection = () => {
    return (
        <section className='mb-20'>
            <div className='container'>
                <h2 className='mb-3 text-[42px] font-rza mt-[1px] -tracking-[.035em] leading-[48px] font-medium'>
                    Browse talent by category
                </h2>
                <div className='mb-10'>
                    {`Looking for work? `}
                    <Link
                        className='text-link hover:text-[#14a800] font-medium transition-[color] underline'
                        href={`#`}
                    >
                        Browse jobs
                    </Link>
                </div>
                <div className='grid grid-cols-4 gap-y-[15px] gap-x-8'>
                    {categoriesData.map((cd) => (
                        <Link
                            className='block col-span-1 pt-5 px-5 pb-[52px] h-[134px] text-[22px] font-medium cursor-pointer rounded-md no-underline bg-[#f7faf7] hover:bg-[#e4ebe4] border border-solid border-transparent'
                            key={cd.href}
                            href={`/category/${cd.href}`}
                        >
                            <div>
                                <div className='text-[23px] leading-[29px]'>
                                    {cd.title}
                                </div>
                                <div className='font-normal mt-3 flex items-center text-[22px] cursor-pointer'>
                                    <div className='mr-1 inline-flex h-4 w-4 text-[#14a800]'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            aria-hidden='true'
                                            viewBox='0 0 24 24'
                                            role='img'
                                        >
                                            <path
                                                fill='#14a800'
                                                fillRule='evenodd'
                                                vectorEffect='non-scaling-stroke'
                                                stroke='#14a800'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='1.5'
                                                d='M13.142 3.813l1.782 4.802 4.927.275c.243.013.477.104.672.26.194.156.338.37.415.615.077.245.082.508.015.756a1.288 1.288 0 01-.391.633L16.726 14.4l1.282 4.993c.06.252.047.517-.038.76a1.285 1.285 0 01-.437.606c-.2.15-.439.234-.684.24a1.174 1.174 0 01-.693-.21L12 17.976 7.854 20.77a1.175 1.175 0 01-.69.214 1.178 1.178 0 01-.684-.233 1.283 1.283 0 01-.441-.599 1.36 1.36 0 01-.047-.757l1.272-4.972-3.826-3.268a1.288 1.288 0 01-.391-.633 1.349 1.349 0 01.015-.756 1.28 1.28 0 01.415-.615c.195-.156.429-.247.672-.26l4.927-.275 1.782-4.802c.092-.24.25-.446.454-.59a1.177 1.177 0 011.376-.001c.204.145.361.35.454.59z'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className='mr-10 text-[#5e6d55] text-base pt-[2px] cursor-pointer'>{cd.star}/5</span>
                                    <span className='text-[#5e6d55] text-base pt-[2px] cursor-pointer'>{cd.skill} skills</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
