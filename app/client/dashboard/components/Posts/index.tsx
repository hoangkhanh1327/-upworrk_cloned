import { ClientPostList } from '@/app/types/client.types';
import React from 'react';
import PostItem from './PostItem';

interface IPosts {
    posts: ClientPostList;
}
const Posts: React.FC<IPosts> = ({ posts }) => {
    return (
        <section className='py-6 border-b border-solid border-[#d5e0d5]'>
            <div className='flex flex-col'>
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
};

export default Posts;
