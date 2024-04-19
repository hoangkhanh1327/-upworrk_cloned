'use client';

import SubHeader from './components/SubHeader';
import SearchBar from './components/Searchbar';

import { SearchBarProvider } from './context/MyJobSearchBarContext';
import AppliedJobs from './components/AppliedJobs';
import Pagiantion from './components/Pagination';

const FreelancerDashboard = () => {
    return (
        <SearchBarProvider>
            <div className='relative'>
                <SubHeader />
                <SearchBar />
                <AppliedJobs />
                <Pagiantion />
            </div>
        </SearchBarProvider>
    );
};

export default FreelancerDashboard;
