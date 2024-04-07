'use client';

import SubHeader from './components/SubHeader';
import SearchBar from './components/Searchbar';

import { SearchBarProvider } from './context/MyJobSearchBarContext';
import AppliedJobs from './components/AppliedJobs';

const FreelancerDashboard = () => {
    return (
        <SearchBarProvider>
            <div className='relative'>
                <SubHeader />
                <SearchBar />
                <AppliedJobs />
            </div>
        </SearchBarProvider>
    );
};

export default FreelancerDashboard;
