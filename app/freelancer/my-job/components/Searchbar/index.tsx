'use client';

import { FC } from 'react';

import FilterSearch from './FilterSearch';

interface ISearchBar {}

const SearchBar: FC<ISearchBar> = () => {
    return (
        <div>
            <FilterSearch />
        </div>
    );
};

export default SearchBar;
