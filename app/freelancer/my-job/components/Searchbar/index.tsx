'use client';

import { FC } from 'react';

import FilterSearch from './FilterSearch';
import FilterPannel from './FilterPannel';

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
