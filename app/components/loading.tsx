import { LoadingSpinner } from '@/app/components/themes/LoadingSpin';

const LoadingComponent = () => {
    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
            <LoadingSpinner size={100} />
        </div>
    );
};

export default LoadingComponent;
