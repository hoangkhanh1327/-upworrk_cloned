"use client";

import DetailUserInfo from "@/app/(protected)/show-detail-info/[user_type]/[user_id]/components/DetailUserInfo";
import React from "react";

interface IFreelancerInfo {
  params: {
    user_id: string;
    user_type: string;
  };
}
const UserDetail: React.FC<IFreelancerInfo> = ({ params }) => {
  return <DetailUserInfo userId={params.user_id} userType={params.user_type} />;
};

export default UserDetail;
