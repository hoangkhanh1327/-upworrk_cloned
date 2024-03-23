import React, { useContext } from 'react';
import PostItem from './PostItem';
import { SearchBarContext } from '../../context/SearchBarContext';

interface IPosts {}
const Posts: React.FC<IPosts> = () => {
    const { posts } = useContext(SearchBarContext);
    
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
