import Image from 'next/image';

interface QABussinessDataItem {
    icon: any;
    title: string;
    subTitle: string;
}
const QABussinessData: QABussinessDataItem[] = [
    {
        title: 'Proof of quality',
        subTitle:
            'Check any pro’s work samples, client reviews, and identity verification.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                aria-hidden='true'
                viewBox='0 0 24 24'
                role='img'
            >
                <path
                    vectorEffect='non-scaling-stroke'
                    stroke='var(--icon-color, #001e00)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                    d='M12 21a9 9 0 100-18 9 9 0 000 18z'
                ></path>
                <path
                    vectorEffect='non-scaling-stroke'
                    stroke='var(--icon-color, #001e00)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                    d='M11.7 7l1.2 3.2 3.5.2-2.7 2.2.9 3.4-2.9-1.9L8.8 16l.9-3.4L7 10.4l3.4-.2L11.7 7z'
                    clipRule='evenodd'
                ></path>
            </svg>
        ),
    },
    {
        title: 'No cost until you hire',
        subTitle:
            'Interview potential fits for your job, negotiate rates, and only pay for work you approve.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                aria-hidden='true'
                viewBox='0 0 24 24'
                role='img'
            >
                <path
                    vectorEffect='non-scaling-stroke'
                    stroke='var(--icon-color, #001e00)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M9.72 13.91A2.08 2.08 0 0012 15.7a2.08 2.08 0 002.28-1.79 1.68 1.68 0 00-1.13-1.56c-.62-.23-1.93-.55-2.54-.83a1.56 1.56 0 01-.89-1.43A2.08 2.08 0 0112 8.3a2.08 2.08 0 012.28 1.79M12 8.3V7m0 10v-1.3'
                ></path>
                <path
                    vectorEffect='non-scaling-stroke'
                    stroke='var(--icon-color, #001e00)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M12 21a9 9 0 100-18 9 9 0 000 18z'
                ></path>
            </svg>
        ),
    },
    {
        title: 'Safe and secure',
        subTitle:
            'Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.',
        icon: (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                aria-hidden='true'
                viewBox='0 0 24 24'
                role='img'
            >
                <path
                    vectorEffect='non-scaling-stroke'
                    stroke='var(--icon-color, #001e00)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M12 21a9 9 0 100-18 9 9 0 000 18z'
                ></path>
                <path
                    vectorEffect='non-scaling-stroke'
                    stroke='var(--icon-color, #001e00)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M15.5 9.51l-4.98 4.98-2.02-2.01'
                ></path>
            </svg>
        ),
    },
];
const QABussiness = () => {
    return (
        <section className='mt-[100px]'>
            <div className='flex'>
                <div className='mr-[29px] w-[65%] bg-[#f2f7f2] rounded-[8px] pl-[30px] py-[48px]'>
                    <div>
                        <h2 className='my-[30px] pr-[100px] text-[72px] leading-[72px] -tracking-[1px] font-rza'>
                            <span>
                                Why businesses
                                <br />
                                turn to Upwork
                            </span>
                        </h2>
                        <div className='pr-[285px]'>
                            {QABussinessData.map((data, index) => (
                                <div
                                    className='flex'
                                    key={`qa-bussiness-${index}`}
                                >
                                    <div className='mt-[5px] mr-[15px]'>
                                        <div className='inline-flex w-6 h-6 text-[#001e00]'>
                                            {data.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='mb-2.5 text-[36px] leading-[100%]'>
                                            {data.title}
                                        </h3>
                                        <p className='mb-[30px]'>
                                            {data.subTitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-end justify-end flex-1 bg-[#14a800] rounded-[8px] py-[48px] pr-[30px]'>
                    <div className='relative items-end pl-[30px]'>
                        <h3 className='mb-[30px] text-[33px] leading-[100%] text-white'>
                            <span>
                                {`We’re`}
                                <br />
                                {`the world’s work`}
                                <br />
                                {`marketplace`}
                            </span>
                        </h3>
                        <div className='flex'>
                            <div className='inline-flex w-8 h-8 text-white'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    aria-hidden='true'
                                    viewBox='0 0 24 24'
                                    role='img'
                                >
                                    <path
                                        fill='#fff'
                                        fillRule='evenodd'
                                        vectorEffect='non-scaling-stroke'
                                        stroke='#fff'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='1.5'
                                        d='M13.142 3.813l1.782 4.802 4.927.275c.243.013.477.104.672.26.194.156.338.37.415.615.077.245.082.508.015.756a1.288 1.288 0 01-.391.633L16.726 14.4l1.282 4.993c.06.252.047.517-.038.76a1.285 1.285 0 01-.437.606c-.2.15-.439.234-.684.24a1.174 1.174 0 01-.693-.21L12 17.976 7.854 20.77a1.175 1.175 0 01-.69.214 1.178 1.178 0 01-.684-.233 1.283 1.283 0 01-.441-.599 1.36 1.36 0 01-.047-.757l1.272-4.972-3.826-3.268a1.288 1.288 0 01-.391-.633 1.349 1.349 0 01.015-.756 1.28 1.28 0 01.415-.615c.195-.156.429-.247.672-.26l4.927-.275 1.782-4.802c.092-.24.25-.446.454-.59a1.177 1.177 0 011.376-.001c.204.145.361.35.454.59z'
                                        clipRule='evenodd'
                                    ></path>
                                </svg>
                            </div>
                            <div className='ml-[15px]'>
                                <h3 className='mb-2.5 text-[33px] leading-[100%] text-white'>
                                    {`4.9/5`}
                                </h3>
                                <p className='p-0 text-base leading-[22px] text-white'>{`Clients rate professionals on Upwork`}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='inline-flex w-8 h-8 text-white relative'>
                                <Image
                                    fill
                                    src={`/images/home-page/group.svg`}
                                    alt=''
                                />
                            </div>
                            <div className='ml-[15px]'>
                                <h3 className='mb-2.5 text-[38px] leading-[39px] text-white font-medium'>
                                    {`Award winner`}
                                </h3>
                                <p className='p-0 text-base leading-[22px] text-white'>{`G2’s 2021 Best Software Awards`}</p>
                            </div>
                        </div>
                        <Image
                            width={866}
                            height={1388}
                            className='absolute top-0 -left-8 translate-x-[-268px] translate-y-[-225px] rotate-[-5deg]  align-middle'
                            src={`/images/home-page/person-with-headset.webp`}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QABussiness;
