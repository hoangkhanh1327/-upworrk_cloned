import _ from 'lodash';
import { Input } from '@/app/components/ui/input';
import { Search } from 'lucide-react';
import React, {  useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';

const FilterSearch = () => {
    const { searchText, setSearchText } = useContext(SearchBarContext);

    const setSearchDebounce = _.debounce((value) => {
        setSearchText?.(value);
    }, 1500);

    return (
        <div className='flex items-center relative py-6'>
            <label
                htmlFor='search'
                className='pl-[48px] pr-[32px] flex items-center group  border-2 border-solid border-[#e4ebe4] hover:border-[#c7d6c7] group-focus-within:border-[#c7d6c7] rounded-[10rem] overflow-hidden relative w-1/2'
            >
                <Search className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer w-6 h-6' />
                <Input
                    defaultValue={searchText}
                    id='search'
                    className='border-none p-0 h-[34px] text-[#001e00] placeholder:text-[#001e00] placeholder:text-sm bg-white text-sm leading-[22px] !ring-transparent !outline-none transition-[border-color]  !shadow-none'
                    placeholder='Tìm kiếm'
                    size={20}
                    onChange={(e) => {
                        setSearchDebounce(e.target.value);
                    }}
                />
            </label>
        </div>
    );
};

export default FilterSearch;
