"use client";

import React, { useContext } from "react";
// import PostItem from './PostItem';
import { SearchBarContext } from "../context/SearchBarContext";
import FreelancersSkeleton from "./FreelancersSkeleton";
import FreelancerItem from "./FreelancerItem";
// import PostSkeleton from './PostSkeleton';

const Freelancers = () => {
  const { freelancers, isGettingFreelancers } = useContext(SearchBarContext);
  console.log("freelancers", freelancers);
  return (
    <section className="py-6 border-b border-solid border-[#d5e0d5]">
      <h1>Danh sách các ứng viên</h1>
      <div className="flex flex-col">
        {isGettingFreelancers
          ? [...Array(5)].map((_, index) => (
              <FreelancersSkeleton key={`freelancer-skeleton-${index}`} />
            ))
          : freelancers.map((free) => (
              <FreelancerItem key={free.id} freelancer={free} />
            ))}
      </div>
    </section>
  );
};

export default Freelancers;

// 'use client';

// import React, { useContext } from 'react';
// import PostItem from './PostItem';
// import { SearchBarContext } from '../../context/SearchBarContext';
// import PostSkeleton from './PostSkeleton';

// interface IPosts {}
// const Posts: React.FC<IPosts> = () => {

//     return (
//         <section className='py-6 border-b border-solid border-[#d5e0d5]'>
//             <div className='flex flex-col'>
//                 {isGettingPosts
//                     ? [...Array(5)].map((_, index) => (
//                           <PostSkeleton key={`post-skeleton-${index}`} />
//                       ))
//                     : posts.map((post) => (
//                           <PostItem key={post.id} post={post} />
//                       ))}
//             </div>
//         </section>
//     );
// };
