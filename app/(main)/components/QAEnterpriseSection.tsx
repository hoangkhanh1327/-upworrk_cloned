import Image from 'next/image';
import Link from 'next/link';

const QAEnterpriseSection = () => {
    return (
        <section className='my-12'>
            <div className='flex justify-between gap-x-[96px] rounded-[8px] overflow-hidden bg-[#13544e]'>
                <div className='py-[35px] pl-[35px] pr-[45px]'>
                    <div>
                        <p className='text-white mb-[35px] text-[22px] leading-[130%] font-rza'>
                            Enterprise Suite
                        </p>
                        <h2 className='text-white text-[56px] mb-5 leading-[100%] -tracking-[1.96px] font-rza'>
                            This is how
                            <br />
                            <span className='text-[#91e6b3] stroke-[#91e6b3]'>
                                good companies
                                <br />
                                find good company.
                            </span>
                        </h2>
                        <span className='text-lg leading-[130%] tracking-[.6px] text-white'>
                            Access the top 1% of talent on ITWork, and a full
                            suite of hybrid workforce management tools. This is
                            how innovation works now.
                        </span>
                    </div>
                    <div>
                        <div className='text-lg leading-[110%]'>
                            <div className='flex mt-4 text-lg leading-[110%] text-white'>
                                <Image
                                    className='mr-3 align-middle'
                                    width={20}
                                    height={20}
                                    src={`https://res.cloudinary.com/ITWork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/Skills.svg`}
                                    alt=''
                                />
                                {`Access expert talent to fill your skill gaps`}
                            </div>
                            <div className='flex mt-3 text-lg leading-[110%] text-white'>
                                <Image
                                    className='mr-3 align-middle'
                                    width={20}
                                    height={20}
                                    src={`https://res.cloudinary.com/ITWork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/Briefcase.svg`}
                                    alt=''
                                />
                                {`A Control your workflow: hire, classify and pay your talent`}
                            </div>
                            <div className='flex mt-3 text-lg leading-[110%] text-white'>
                                <Image
                                    className='mr-3 align-middle'
                                    width={20}
                                    height={20}
                                    src={`https://res.cloudinary.com/ITWork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/Support.svg`}
                                    alt=''
                                />
                                {`Partner with ITWork for end-to-end support`}
                            </div>
                        </div>
                        <div>
                            <Link
                                href={`/qa/enterprise`}
                                className='text-[#13544e] mt-[25px] bg-white border-transparent text-center border-2 border-solid inline-flex items-center justify-center rounded-[10rem] text-base leading-10 mx-auto px-8'
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='min-w-[36%] h-[535px] w-[36%] relative'>
                    <Image
                        fill
                        alt='qa-enterprise'
                        src={`https://res.cloudinary.com/ITWork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/enterprise-2023.jpg`}
                    />
                </div>
            </div>
        </section>
    );
};

export default QAEnterpriseSection;
