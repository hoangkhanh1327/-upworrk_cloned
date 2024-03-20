'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, Settings2 } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
    const [isFilterPannelOpen, toggleFilterPannel] = useState(false);
    return (
        <div>
            <div className='flex items-center relative py-6'>
                <label
                    htmlFor='search'
                    className='pl-[48px] pr-[32px] flex items-center group  border-2 border-solid border-[#e4ebe4] hover:border-[#c7d6c7] group-focus-within:border-[#c7d6c7] rounded-[10rem] overflow-hidden relative w-1/2'
                >
                    <Search className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer w-6 h-6' />
                    <Input
                        id='search'
                        className='border-none p-0 h-[34px] text-[#001e00] placeholder:text-[#001e00] placeholder:text-sm bg-white text-sm leading-[22px] !ring-transparent !outline-none transition-[border-color]  !shadow-none'
                        placeholder='Tìm kiếm'
                        size={20}
                    />
                </label>
                <Button
                    onClick={() => toggleFilterPannel((prev) => !prev)}
                    className='bg-transparent inline-flex pl-4 pr-6 items-center group hover:bg-transparent text-[#108a00] active:scale-95 transition-all'
                >
                    <Settings2 className='w-6 h-6 mr-3' />
                    Filters
                </Button>
            </div>
            <div
                className={cn(
                    'border-y border-solid border-[#beccbe] transition-all pt-10 pb-6',
                    isFilterPannelOpen ? 'h-[330px]' : 'h-0'
                )}
            ></div>
        </div>
    );
};

export default SearchBar;
