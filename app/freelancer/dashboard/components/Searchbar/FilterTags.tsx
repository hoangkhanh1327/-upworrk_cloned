import { XCircleIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

const FilterTags = () => {
    return (
        <div className='mt-4'>
            <Button className='flex items-center border-none bg-transparent hover:bg-transparent text-[#108a00] hover:text-[#108a00]/90 pt-1 mt-2'>
                <XCircleIcon className='w-6 h-6 mr-1' />
                Clear all filter
            </Button>
        </div>
    );
};

export default FilterTags;
