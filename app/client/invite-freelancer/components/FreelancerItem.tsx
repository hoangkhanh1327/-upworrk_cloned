"use client";
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
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Thông tin ứng viên
          </h5>
          {/* </a> */}
          <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">
            {freelancer.username}
          </p>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            {freelancer.email}
          </p>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <strong>Thư giới thiệu:</strong>
            {/* {post?.nominee?.cover_letter} */}
          </p>
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Kỹ năng</h3>
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
          {/* {!loading && post?.nominee?.attachment_url && ( */}
          <div className="mb-6 flex items-center">
            <h3 className="text-lg font-medium min-w-[130px]">File đính kèm</h3>
            <div className="flex items-center gap-x-3 pl-3">
              <Link
                href="https://www.google.com/"
                // {
                //   post?.nominee.attachment_url
                // }
                target="_blank"
              >
                <div className="upload-file">
                  <div className="flex px-3 py-3">
                    <div className="upload-file-thumbnail !p-0 w-8 h-8">
                      {
                        <FileIcon>
                          <VscFile />
                        </FileIcon>
                      }
                    </div>
                    <div className="upload-file-info min-h-[2rem]">
                      <h6 className="upload-file-name">
                        {/* {`${post?.nominee?.username}`} */}
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerItem;
