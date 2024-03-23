'use client';

import SubHeader from './components/SubHeader';
import SearchBar from './components/Searchbar';

import { SearchBarProvider } from './context/SearchBarContext';
import Posts from './components/Posts';
import Pagiantion from './components/Pagination';

const ClientDashboard = () => {
    return (
        <SearchBarProvider>
            <div className='relative'>
                <SubHeader />
                <SearchBar />
                <Posts />
                <Pagiantion />
            </div>
        </SearchBarProvider>
    );
};

export default ClientDashboard;
