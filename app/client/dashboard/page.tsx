'use client';

import SubHeader from './components/SubHeader';
import SearchBar from './components/Searchbar';
import { useCallback, useEffect, useState } from 'react';
import { ClientPostList } from '@/app/types/client.types';
import { SearchBarProvider } from './context/SearchBarContext';
import _, { isEmpty } from 'lodash';
import { clientServices } from '@/app/services/client.services';
import Posts from './components/Posts';

const ClientDashboard = () => {
    const [posts, setPosts] = useState<ClientPostList>([]);

    const fecthPosts = useCallback(async (data: any) => {
        try {
            console.log('call api');

            setPosts([
                {
                    id: 1,
                    title: 'test',
                } as any,
            ]);
            // const res = await clientServices.getPosts({
            //     page: 1,
            //     num: 999,
            //     status: 1,
            // });
            // if (res.data && !isEmpty(res.data.data)) {
            //     setPosts(res.data.data);
            // }
        } catch (error) {
            console.log('error', error);
        }
    },[]);

    
    const handleFilterPost = useCallback((data: any) => {
        fecthPosts(data);
    }, [fecthPosts]);

    return (
        <SearchBarProvider>
            <div className='relative'>
                <SubHeader />
                <SearchBar onFilter={handleFilterPost} />
                <Posts posts={posts} />
            </div>
        </SearchBarProvider>
    );
};

export default ClientDashboard;
