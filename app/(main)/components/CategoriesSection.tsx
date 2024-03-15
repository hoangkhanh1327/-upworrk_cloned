import Link from 'next/link';

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
                <div className='grid grid-col-4 gap-y-[15px] gap-x-8'>
                    <div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
