import { LoadingSpinner } from '@/app/components/themes/LoadingSpin';

const LoadingDetailPage = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <LoadingSpinner size={100} />
        </div>
    );
};

export default LoadingDetailPage;
