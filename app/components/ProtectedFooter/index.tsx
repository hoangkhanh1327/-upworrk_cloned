import Image from 'next/image';
import Link from 'next/link';

interface IFooterData {
    title: string;
    subTitle?: IFooterData[];
}
const footerData: IFooterData[] = [
    {
        title: 'For Clients',
        subTitle: [
            { title: 'About Us' },
            { title: 'Feedback' },
            { title: 'Community' },
        ],
    },
    {
        title: 'For Talent',
        subTitle: [
            {
                title: 'Trust, Safety & Security',
            },
            {
                title: 'Help & Support',
            },
            {
                title: 'Upwork Foundation',
            },
        ],
    },
    {
        title: 'Resources',
        subTitle: [
            {
                title: 'Terms of Service',
            },
            {
                title: 'Privacy Policy',
            },
            {
                title: 'CA Notice at Collection',
            },
            {
                title: 'Cookie Settings',
            },
        ],
    },
    {
        title: 'Company',
        subTitle: [
            {
                title: 'Accessibility',
            },
            {
                title: 'Desktop App',
            },
            {
                title: 'Cookie Policy',
            },
            {
                title: 'Enterprise Solutions',
            },
        ],
    },
];

const ProtectedFooter = () => {
    return (
        <footer className='mt-[100px] container mb-6 text-white bg-[#001e00] overflow-hidden pt-[64px] pb-[48px] rounded-[8px] border-t-0'>
            <div className='container'>
                <div className='w-4/5 mx-auto'>
                    <div className='grid grid-cols-4 gap-4'>
                        {footerData.map((item, index) => (
                            <div key={`footer-navigation-${index}`}>
                                <div>
                                    <ul className='grid my-4 leading-[22px] pl-0 gap-y-2'>
                                        {item.subTitle?.map((sub, subIndex) => (
                                            <li
                                                key={`sub-${index}-${subIndex}`}
                                            >
                                                <Link
                                                    href={`#`}
                                                    className='text-white text-sm hover:underline'
                                                >
                                                    {sub.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-6 mb-4 py-4 border-b border-solid border-[#9aaa97]'>
                        <div className='flex items-center gap-4'>
                            <div className='m-0 text-white text-sm leading-[15px] font-bold'>
                                Follow Us
                            </div>
                            <ul className='flex items-center gap-2 list-none p-0 m-0'>
                                <li className='m-0'>
                                    <span className='flex items-center justify-center w-10 h-10 border border-solid border-white bg-transparent rounded-full'>
                                        <div className='relative w-6 h-6'>
                                            <Image
                                                src={`/images/home-page/footer/facebook.svg`}
                                                fill
                                                alt=''
                                            />
                                        </div>
                                    </span>
                                </li>
                                <li className='m-0'>
                                    <span className='flex items-center justify-center w-10 h-10 border border-solid border-white bg-transparent rounded-full'>
                                        <div className='relative w-6 h-6'>
                                            <Image
                                                src={`/images/home-page/footer/linkin.svg`}
                                                fill
                                                alt=''
                                            />
                                        </div>
                                    </span>
                                </li>
                                <li className='m-0'>
                                    <span className='flex items-center justify-center w-10 h-10 border border-solid border-white bg-transparent rounded-full'>
                                        <div className='relative w-6 h-6'>
                                            <Image
                                                src={`/images/home-page/footer/twitter.svg`}
                                                fill
                                                alt=''
                                            />
                                        </div>
                                    </span>
                                </li>
                                <li className='m-0'>
                                    <span className='flex items-center justify-center w-10 h-10 border border-solid border-white bg-transparent rounded-full'>
                                        <div className='relative w-6 h-6'>
                                            <Image
                                                src={`/images/home-page/footer/youtube.svg`}
                                                fill
                                                alt=''
                                            />
                                        </div>
                                    </span>
                                </li>
                                <li className='m-0'>
                                    <span className='flex items-center justify-center w-10 h-10 border border-solid border-white bg-transparent rounded-full'>
                                        <div className='relative w-6 h-6'>
                                            <Image
                                                src={`/images/home-page/footer/instagram.svg`}
                                                fill
                                                alt=''
                                            />
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className='text-center text-[11px] font-medium leading-[22px]'>
                            © 2024 - 2024 Test® Global Inc.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ProtectedFooter;
