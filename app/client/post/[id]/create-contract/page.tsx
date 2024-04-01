'use client';

import { SearchBarProvider } from "@/app/client/dashboard/context/SearchBarContext";
import CreateFormContract from "./components/FormCreate";
import Pagiantion from "@/app/client/dashboard/components/Pagination";


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
