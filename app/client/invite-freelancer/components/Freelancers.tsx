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
       <h1 className="text-sm font-bold">Danh sách ứng viên đề xuất</h1>
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

