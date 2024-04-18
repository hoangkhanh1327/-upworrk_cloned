"use client";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FreelancerInfo } from "@/app/types/authentication.types";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";
import { format, compareAsc } from "date-fns";
import { Invite } from "@/app/types/freelancer.type";
import { freelancerServices } from "@/app/services/freelancer.services";
import constants from "@/app/utils/constants";
import { notification } from "antd";
import { commonServices } from "@/app/services/common.services";
import { AuthContext } from "@/app/providers/AuthProvider";
// import InviteFreelancerDialog from "./dialog/InviteFreelancerDialog";

interface IInviteItem {
  invite: Invite;
}
type NotificationType = "success" | "info" | "warning" | "error";

const InviteItem = ({ invite }: IInviteItem) => {
  const [showInviteModal, setShowInviteModal] = React.useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const { user } = useContext(AuthContext);

  const sendNotification = async (data: any) => {
    try {
      // setIsGettingPosts(true);
      const res = await commonServices.sendNotication(data);
      if (res.status === 200) {
        console.log("send notification success", res);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      // setIsGettingPosts(false);
    }
  };

  const openNotification = (type: NotificationType, msg: string) => {
    api[type]({
      message: "Thông Báo",
      description: msg,
    });
  };

  const handleAcceptInvite = async (id: number) => {
    console.log("id", id);
    const res = await freelancerServices.handleResponseInvite(
      id,
      constants.ACCEPT_INVITE
    );
    try {
      if (res.status === 200) {
        sendNotification({
          title: "Thông báo",
          message: `${user?.username} đã đồng ý lời mời làm việc của bạn 😍`,
          linkable: `client/post/${invite.job_id}`,
          smail: 1,
          imagefile: null,
          user_type: "client",
          user_id: invite.client_id,
        });
        openNotification("success", "Đồng ý lời mời thành công");
      } else {
        openNotification("error", res.message || "Đã có lỗi xảy ra");
      }
      // if(res)
    } catch (error) {
      openNotification("error", res.message || "Đã có lỗi xảy ra");
    }
  };
  const handleRejectInvite = async (id: number) => {
    const res = await freelancerServices.handleResponseInvite(
      id,
      constants.REJECT_INVITE
    );
    try {
      if (res.status === 200) {
        sendNotification({
          title: "Thông báo",
          message: `${user?.username} đã từ chối lời mời làm việc của bạn 😂`,
          linkable: `client/post/${invite.job_id}`,
          smail: 1,
          imagefile: null,
          user_type: "client",
          user_id: invite.client_id,
        });
        openNotification("success", "Từ chối lời mời thành công");
      } else {
        openNotification("error", res.message || "Đã có lỗi xảy ra");
      }
      // if(res)
    } catch (error) {
      openNotification("error", res.message || "Đã có lỗi xảy ra");
    }
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
                  href={`freelancer/job/${invite.job_id}`}
                >
                  Chi tiết công việc
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                className="text-white bg-green-500 hover:bg-green-400 cursor-pointer mr-4"
                onClick={() => {
                  handleAcceptInvite(invite.id);
                }}
              >
                <span>Chấp nhận lời mời làm việc</span>
              </Button>
              <Button
                asChild
                variant="default"
                className="text-white bg-red-400 hover:bg-red-200 cursor-pointer"
                onClick={() => {
                  handleRejectInvite(invite.id);
                }}
              >
                <span>Từ chối lời mời làm việc</span>
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
