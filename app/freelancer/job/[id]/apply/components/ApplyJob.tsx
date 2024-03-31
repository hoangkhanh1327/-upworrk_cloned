"use client";

import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { format } from "date-fns";
import { FileIcon, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { VscFile } from "react-icons/vsc";
import { EditPostContext } from "../context/ApplyPostContext";
import FormApplyJob from "./FormApplyJob";
import { DetailClientPost } from "@/app/types/client.types";

interface IEditPostDetail {
  // post: DetailClientPost
  postId: string
}

const ApplyJob: React.FC<IEditPostDetail> = ({postId}) => {
  const { post, loading, handleGetPostDetail } =
    useContext(EditPostContext);

  useEffect(() => {
    if (postId) {
      handleGetPostDetail?.(postId);
    }
  }, [post?.id]);
  const handleApplyJob = () => {
     
  };

  return (
    <>
      <section className="px-20">
        <div>
          <h2 className="text-4xl font-semibold -tracking-[1px]">
            Ứng tuyển công việc
          </h2>
        </div>
        <div className="my-8 border border-solid border-[#d5e0d5] rounded-[16px]">
          <article>
            <header className="p-8 border-b border-solid border-[#d5e0d5] flex items-center justify-between">
              {loading ? (
                <Skeleton className="w-full h-7" />
              ) : (
                <>
                  <h3 className="text-2xl font-medium">{post?.title || ""}</h3>
                 
                </>
              )}
            </header>

            <div className="p-8 pb-0">
              <h3 className="text-lg font-medium mb-2">Mô tả ngắn</h3>
              <div className="flex items-center justify-between">
                {loading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <>
                    <p>{post?.desc}</p>
                  </>
                )}
              </div>
            </div>

            <div className="p-8 pb-10">
              <h3 className="text-lg font-medium mb-2">Nội dung</h3>
              <div className="flex items-center justify-between">
                {loading ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <>
                    <p>{post?.content}</p>
                    
                  </>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="px-20">
        {post && <FormApplyJob job={post} handleApplyJob={handleApplyJob} />}
      </section>
    </>
  );
};

export default ApplyJob;
