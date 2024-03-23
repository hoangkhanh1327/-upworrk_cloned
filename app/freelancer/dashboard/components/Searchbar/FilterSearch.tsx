import _ from 'lodash';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, Settings2 } from 'lucide-react';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';

interface IFilterSearch {
    isFilterPannelOpen: boolean;
    toggleFilterPannel: Dispatch<SetStateAction<boolean>>;
}

const FilterSearch: React.FC<IFilterSearch> = ({
    isFilterPannelOpen,
    toggleFilterPannel,
}) => {
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
                        setSearchDebounce(e.target.value)
                    }}
                />
            </label>
            <Button
                onClick={() => toggleFilterPannel((prev) => !prev)}
                className={cn(
                    'bg-transparent inline-flex pl-4 pr-6 items-center group hover:bg-transparent  active:scale-95 transition-all',
                    !isFilterPannelOpen ? 'text-[#001e00]' : 'text-[#108a00]'
                )}
            >
                <Settings2 className='w-6 h-6 mr-3' />
                Filters
            </Button>
        </div>
    );
};

export default FilterSearch;
