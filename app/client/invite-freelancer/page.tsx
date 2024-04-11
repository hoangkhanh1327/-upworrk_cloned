'use client';

import Pagiantion from "../dashboard/components/Pagination";
import SearchBar from "../dashboard/components/Searchbar";
import SubHeader from "../dashboard/components/SubHeader";
import { SearchBarProvider } from "./context/SearchBarContext";

// import SubHeader from './components/SubHeader';
// import SearchBar from './components/Searchbar';

// import { SearchBarProvider } from './context/SearchBarContext';
import Freelancers from './components/Freelancers';
// import Pagiantion from './components/Pagination';

const ListFreelancer = () => {
    return (
        <SearchBarProvider>
            <div className='relative'>
                {/* <SubHeader /> */}
               
                <SearchBar />
            {/* <h1>Huyen nè</h1> */}
                <Freelancers />
                <Pagiantion />
            </div>
        </SearchBarProvider>
    );
};

export default ListFreelancer;
