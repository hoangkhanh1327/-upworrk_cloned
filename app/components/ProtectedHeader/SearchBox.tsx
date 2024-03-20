import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const SearchBox = () => {
    return (
        <div className='flex min-w-[250px] w-[250px] items-center border-2 border-stone-200 border-solid rounded-[20px] overflow-hidden relative'>
            <Search className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
            <Input
                className='h-8 pl-10 border-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-base text-base'
                placeholder='Tìm kiếm'
                size={20}
            />
        </div>
    );
};

export default SearchBox;
