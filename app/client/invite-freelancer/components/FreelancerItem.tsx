"use client";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FreelancerInfo } from "@/app/types/authentication.types";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { VscFile } from "react-icons/vsc";

interface IFreelancerItem {
  freelancer: FreelancerInfo;
}

const FreelancerItem = ({ freelancer }: IFreelancerItem) => {
  return (
    <div className="mb-6 items-start">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* <h3>Name: {post?.nominee?.username}</h3> */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Thông tin ứng viên
          </h5> */}
          <div className="flex items-center content-center">
            <div className="mr-4">
              <img
                src={
                  freelancer.avatar_url
                    ? freelancer.avatar_url
                    : "/images/others/unknown_avatar.png"
                }
                alt="avatar"
                className="w-[150px] h-[150px] rounded-full"
              />
            </div>
            <div>
              <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">
                {freelancer.username}
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {freelancer.email || "Chưa cập nhật email"}
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
              <span>{freelancer.date_of_birth}</span>
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
              className="text-white bg-blue-500 hover:bg-blue-400"
            >
              <Link
                // target="_blank"
                href={`/client/show-freelancer-info/${freelancer.id}`}
              >
                Mời ứng viên làm việc
              </Link>
            </Button>
          </div>
          {/* {!loading && post?.nominee?.attachment_url && ( */}
        </div>
      </div>
    </div>
  );
};

export default FreelancerItem;
