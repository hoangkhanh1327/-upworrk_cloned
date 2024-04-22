'use client';

import { SearchBarProvider } from './context/SearchBarContext';
import Posts from './components/Posts';
import Pagiantion from './components/Pagination';

const ClientDashboard = () => {
    return (
        <SearchBarProvider>
            <div className='relative'>
                {/* <SearchBar /> */}
                <Posts />
                <Pagiantion />
            </div>
        </SearchBarProvider>
    );
};

export default ClientDashboard;
