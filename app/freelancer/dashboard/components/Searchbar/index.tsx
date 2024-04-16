'use client';

import { cn } from '@/lib/utils';
import { FC, useState } from 'react';

import FilterPannel from './FilterPannel';
import FilterSearch from './FilterSearch';

interface ISearchBar {}

const SearchBar: FC<ISearchBar> = () => {
    return (
        <div>
            <FilterSearch />
            <FilterPannel />
        </div>
    );
};

export default SearchBar;
