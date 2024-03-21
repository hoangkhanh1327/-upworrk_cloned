'use client';

import SubHeader from './components/SubHeader';
import SearchBar from './components/Searchbar';
import { useEffect, useState } from 'react';
import { ClientPostList } from '@/app/types/client.types';
import { SearchBarProvider } from './context/SearchBarContext';
import _ from 'lodash';
import { clientServices } from '@/app/services/client.services';

const ClientDashboard = () => {
    const [posts, setPosts] = useState<ClientPostList>([]);

    const fecthPosts = async (data: any) => {
        try {
            const res = await clientServices.getPosts({
                page: 1,
                num: 999,
                status: 1,
            });
            console.log('res', res);
        } catch (error) {
            console.log('error', error);
        }
    };

    const deboundFetch = _.debounce(fecthPosts, 1500);

    const handleFilterPost = async (data: any) => {
        deboundFetch(data);
    };

    return (
        <SearchBarProvider>
            <div className='relative'>
                <SubHeader />
                <SearchBar onFilter={handleFilterPost} />
                Client Dashboard
            </div>
        </SearchBarProvider>
    );
};

export default ClientDashboard;
