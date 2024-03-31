'use client';

import Pagiantion from "../dashboard/components/Pagination";
import SearchBar from "../dashboard/components/Searchbar";
import SubHeader from "../dashboard/components/SubHeader";
import { SearchBarProvider } from "../dashboard/context/SearchBarContext";
import CreateFormContract from "./components/FormCreate";


const CreateContract = () => {
    return (
        <SearchBarProvider>
            <div className='relative'>
                {/* <SubHeader /> */}
                {/* <SearchBar /> */}
                {/* <Posts /> */}
                <CreateFormContract/>
                <Pagiantion />
            </div>
        </SearchBarProvider>
    );
};

export default CreateContract;
