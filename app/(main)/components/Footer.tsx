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
            { title: 'How to Hire' },
            { title: 'Talent Marketplace' },
            { title: 'Project Catalog' },
            { title: 'Hire an Agency' },
            { title: 'Enterprise' },
            { title: 'Any Hire' },
            { title: 'Contract-to-Hire' },
            { title: 'Direct Contracts' },
            { title: 'Hire Worldwide' },
            { title: 'Hire in the USA' },
        ],
    },
    {
        title: 'For Talent',
        subTitle: [
            {
                title: 'How to Find Work',
            },
            {
                title: 'Direct Contracts',
            },
            {
                title: 'Find Freelance Jobs Worldwide',
            },
            {
                title: 'Find Freelance Jobs in the USA',
            },
            {
                title: 'Win work with ads',
            },
            {
                title: 'Exclusive resources with Freelancer Plus',
            },
        ],
    },
    {
        title: 'Resources',
        subTitle: [
            {
                title: 'Help & Support',
            },
            {
                title: 'Success Stories',
            },
            {
                title: 'Upwork Reviews',
            },
            {
                title: 'Resources',
            },
            {
                title: 'Blog',
            },
            {
                title: 'Community',
            },
            {
                title: 'Affiliate Program',
            },
            {
                title: 'Free Business tools',
            },
        ],
    },
    {
        title: 'Company',
        subTitle: [
            {
                title: 'About Us',
            },
            {
                title: 'Leadership',
            },
            {
                title: 'Investor Relations',
            },
            {
                title: 'Careers',
            },
            {
                title: 'Our Impact',
            },
            {
                title: 'Press',
            },
            {
                title: 'Contact Us',
            },
            {
                title: 'Trust, Safety & Security',
            },
            {
                title: 'Modern Slavery Statement',
            },
        ],
    },
];

const Footer = () => {
    return (
        <footer className='mt-[100px] mb-6 text-white bg-[#001e00] overflow-hidden py-[96px] rounded-[8px] border-t-0'>
            <div className='container'>
                <div className='grid grid-cols-4 gap-4'>
                    {footerData.map((item, index) => (
                        <div key={`footer-navigation-${index}`}>
                            <div className='text-sm font-normal'>
                                {item.title}
                            </div>
                            <div>
                                <ul className='grid my-4 leading-[22px] pl-0'>
                                    {item.subTitle?.map((sub, subIndex) => (
                                        <li key={`sub-${index}-${subIndex}`}>
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
                    <p>© 2024 - 2024 Test® Global Inc.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
