"use client";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FreelancerInfo } from "@/app/types/authentication.types";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { format, compareAsc } from "date-fns";
import { Invite } from "@/app/types/freelancer.type";
// import InviteFreelancerDialog from "./dialog/InviteFreelancerDialog";

interface IInviteItem {
  invite: Invite;
}

const InviteItem = ({ invite }: IInviteItem) => {
  const [showInviteModal, setShowInviteModal] = React.useState<boolean>(false);
  const handleInviteFreelancer = (invite: Invite) => {
    setShowInviteModal(true);
    console.log("invite freelancer", invite);
  };

  return (
    <>
      <div className="mb-6 items-start">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center content-center">
              <div className="mr-4">
                {/* <img
                  src={
                    freelancer.avatar_url
                      ? freelancer.avatar_url.toString()
                      : "/images/others/unknown_avatar.png"
                  }
                  alt="avatar"
                  className="w-[150px] h-[150px] rounded-full"
                /> */}
              </div>
              <div>
                <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">
                  {invite.title}
                </p>
              </div>
            </div>
            {/* address */}
            <div className="m-2">
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {invite.mail_invite}
              </p>
            </div>
            {/* intro */}

            <div className="flex items-center content-center">
              <Button
                asChild
                variant="default"
                className="text-white bg-blue-500 hover:bg-blue-400 mr-4"
              >
                <Link
                  // target="_blank"
                  href={`/job/${invite.job_id}`}
                >
                  Chi tiết công việc
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                className="text-white bg-blue-500 hover:bg-blue-400 cursor-pointer"
                // onClick={() => {
                //   handleInviteFreelancer(freelancer);
                // }}
              >
                <span>Chấp nhận lời mời làm việc</span>
              </Button>
            </div>
            {/* {!loading && post?.nominee?.attachment_url && ( */}
          </div>
        </div>
      </div>

      {/* <InviteFreelancerDialog
        isOpen={showInviteModal}
        freelancer={freelancer}
        onClose={() => setShowInviteModal(false)}
      /> */}
    </>
  );
};

export default InviteItem;
