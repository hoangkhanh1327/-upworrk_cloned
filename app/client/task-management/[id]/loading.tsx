import { LoadingSpinner } from '@/app/components/themes/LoadingSpin';

const LoadingTaskPage = () => {
    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
            <LoadingSpinner size={100} color='blue-400'/>
        </div>
    );
};

export default LoadingTaskPage;
