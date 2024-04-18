"use client";

import React, { useContext } from "react";
// import PostItem from './PostItem';
import { SearchBarContext } from "../context/SearchBarContext";
import InvitesSkeleton from "./InvitesSkeleton";
import InviteItem from "./InviteItem";
// import PostSkeleton from './PostSkeleton';

const ListInvite = () => {
  const { invites, isGettingInvite } = useContext(SearchBarContext);
  console.log("invites", invites);
  return (
    <section className="py-6 border-b border-solid border-[#d5e0d5]">
      <h1>Danh sách lời mời</h1>
      <div className="flex flex-col">
        {isGettingInvite
          ? [...Array(5)].map((_, index) => (
              <InvitesSkeleton key={`invite-skeleton-${index}`} />
            ))
          : invites?.map((invite) => (
              <InviteItem key={invite.id} invite={invite} />
            ))}
      </div>
    </section>
  );
};

export default ListInvite;

