'use client';

import { cn } from '@/lib/utils';
import { FC, useState } from 'react';

import FilterTags from './FilterTags';
import FilterPannel from './FilterPannel';
import FilterSearch from './FilterSearch';

interface ISearchBar {}

const SearchBar: FC<ISearchBar> = () => {
    const [isFilterPannelOpen, toggleFilterPannel] = useState(false);
    return (
        <div>
            <FilterSearch
                isFilterPannelOpen={isFilterPannelOpen}
                toggleFilterPannel={toggleFilterPannel}
            />
            <div
                className={cn(
                    'border-y border-solid border-[#beccbe] transition-all ',
                    isFilterPannelOpen
                        ? 'h-[330px] pt-10 pb-6'
                        : 'p-0 h-0 overflow-hidden'
                )}
            >
                <FilterPannel />
                <FilterTags />
            </div>
        </div>
    );
};

export default SearchBar;
