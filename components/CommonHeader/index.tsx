import Logo from './Logo';

const CommonHeader = () => {
    return (
        <div className=''>
            <header className='container h-16'>
                <div className='flex items-center h-full'>
                    <Logo />
                </div>
            </header>
        </div>
    );
};

export default CommonHeader;
