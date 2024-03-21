'use client';

import { cn } from '@/lib/utils';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

import FilterTags from './FilterTags';
import FilterPannel from './FilterPannel';
import FilterSearch from './FilterSearch';
import { SearchBarContext } from '../../context/SearchBarContext';

interface FilterData {
    visibility: string;
    status: string[];
    type: string;
}
interface ISearchBar {
    onFilter: (data: FilterData) => void;
}

const SearchBar: FC<ISearchBar> = ({ onFilter }) => {
    const [isFilterPannelOpen, toggleFilterPannel] = useState(false);
    const { searchText, status, type, visibility } =
        useContext(SearchBarContext);

    const filterParams = useMemo(() => {
        return { searchText, status, type, visibility };
    }, [searchText, status, type, visibility]);

    useEffect(() => {
        onFilter?.(filterParams);
    }, [filterParams, onFilter]);

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
