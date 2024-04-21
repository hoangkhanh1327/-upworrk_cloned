"use client";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FreelancerInfo } from "@/app/types/authentication.types";

import Link from "next/link";
import React from "react";
import { format, compareAsc } from "date-fns";
import InviteFreelancerDialog from "./dialog/InviteFreelancerDialog";

interface IFreelancerItem {
  freelancer: FreelancerInfo;
}

const FreelancerItem = ({ freelancer }: IFreelancerItem) => {
  const [showInviteModal, setShowInviteModal] = React.useState<boolean>(false);
  const handleInviteFreelancer = (freelancer: FreelancerInfo) => {
    setShowInviteModal(true);
    console.log("invite freelancer", freelancer);
  };

  return (
    <>
      <div className="mb-6 items-start">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center content-center">
              <div className="mr-4">
                <img
                  src={
                    freelancer?.avatar_url
                      ? freelancer?.avatar_url.toString()
                      : "/images/others/unknown_avatar.png"
                  }
                  alt="avatar"
                  className="w-[150px] h-[150px] rounded-full"
                />
              </div>
              <div>
                <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">
                  {freelancer?.username}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  {freelancer?.email || "Chưa cập nhật email"}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  {freelancer.phone_num || "Chưa cập nhật số điện thoại"}
                </p>
              </div>
            </div>
            {/* address */}
            <div className="m-2">
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                <strong>Giới tính </strong>
                <span>{freelancer.sex == "1" ? "Nam" : "Nữ"}</span>
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                <strong>Ngày sinh: </strong>

                <span>
                  {" "}
                  {freelancer?.date_of_birth &&
                    format(freelancer.date_of_birth, "dd/MM/yyyy")}
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                <strong>Địa chỉ: </strong>
                <span>{freelancer.address}</span>
              </p>
            </div>
            {/* intro */}
            <div className="m-2">
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                <strong>Giới thiệu: </strong>
                <span>{freelancer.intro}</span>
              </p>
            </div>

            <div>
              <div className="mb-6">
                <span className="text-lg font-medium mb-2">Kỹ năng</span>
                <div className="flex items-center gap-x-3">
                  {freelancer?.skill?.map((s) => (
                    <div
                      key={`selected-skill-${s.id}`}
                      className="cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white"
                      onClick={() => {}}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center content-center">
              <Button
                asChild
                variant="default"
                className="text-white bg-blue-500 hover:bg-blue-400 mr-4"
              >
                <Link
                  // target="_blank"
                  href={`/client/show-freelancer-info/${freelancer.id}`}
                >
                  Chi tiết ứng viên
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                className="text-white bg-blue-500 hover:bg-blue-400 cursor-pointer"
                onClick={() => {
                  handleInviteFreelancer(freelancer);
                }}
              >
                <span>Mời ứng viên làm việc</span>
              </Button>
            </div>
            {/* {!loading && post?.nominee?.attachment_url && ( */}
          </div>
        </div>
      </div>

      <InviteFreelancerDialog
        isOpen={showInviteModal}
        freelancer={freelancer}
        onClose={() => setShowInviteModal(false)}
      />
    </>
  );
};

export default FreelancerItem;
