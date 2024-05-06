"use client";

import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { freelancerServices } from "@/app/services/freelancer.services";
import { DetailClientPost } from "@/app/types/client.types";
import { format } from "date-fns";
import { FileIcon, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VscFile } from "react-icons/vsc";
import AppliedTable from "./AppliedTable";
import InviteTable from "./InviteTable";

interface IPostDetail {
  postId: string;
}

const PostDetail: React.FC<IPostDetail> = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<DetailClientPost | null>(null);
  useEffect(() => {
    const fetchPostData = async (postId: string) => {
      try {
        setLoading(true);
        const res = await freelancerServices.getPost(postId);
        if (res.data) {
          setPost(res.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (postId) {
      fetchPostData(postId);
    }
  }, [postId]);

  return (
    <section className="px-20">
      <div>
        <h2 className="text-4xl font-semibold -tracking-[1px]">
          Chi tiết công việc
        </h2>
      </div>
      <div className="my-8 border border-solid border-[#d5e0d5] rounded-[16px]">
        <article>
          <header className="p-8 border-b border-solid border-[#d5e0d5] flex items-center justify-between">
            {loading ? (
              <Skeleton className="w-full h-7" />
            ) : (
              <h3 className="text-2xl font-medium">{post?.title || ""}</h3>
            )}
          </header>

          <div className="p-8 pb-0">
            <h3 className="text-lg font-medium mb-2">Mô tả ngắn</h3>
            <div className="flex items-center justify-between">
              {loading ? (
                <Skeleton className="w-full h-4" />
              ) : (
                <p>{post?.desc}</p>
              )}
            </div>
          </div>

          <div className="p-8 pb-0">
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

          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Kỹ năng</h3>
              <div className="flex items-center gap-x-3">
                {loading ? (
                  <>
                    <Skeleton className="w-20 h-7" />
                    <Skeleton className="w-20 h-7" />
                    <Skeleton className="w-20 h-7" />
                  </>
                ) : (
                  post?.skills.map((s) => (
                    <div
                      key={`selected-skill-${s.skill_id}`}
                      className="cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white"
                      onClick={() => {}}
                    >
                      {s.skill_name}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <h3 className="text-lg font-medium ">Thời hạn công việc</h3>
              <div className="flex items-center gap-x-3 pl-3">
                {loading ? (
                  <Skeleton className="h-[20px] w-[250px]" />
                ) : (
                  <p>
                    {post?.deadline &&
                      format(post.deadline || "", "dd-MM-yyyy")}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <h3 className="text-lg font-medium min-w-[130px]">
                File đính kèm
              </h3>
              <div className="flex items-center gap-x-3 pl-3">
                <div>
                  {!loading && post?.thumbnail && (
                    <Link href={post?.thumbnail} target="_blank">
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
                              {`${post?.thumbnail}`}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-6 flex items-start">
              <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                Hình ảnh
              </h3>
              <div className="flex items-center gap-x-3 pl-3">
                <div>
                  {!loading && post?.content_file && (
                    <Link href={post?.content_file} target="_blank">
                      <div className="w-[120px] h-[120px] relative">
                        <Image src={post?.content_file} alt="" fill />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {(post?.status?.toString() === "1" ||
            post?.status?.toString() === "2") && (
            <div className="mb-6 p-[20px] flex items-center flex-col">
              {post.applied?.length > 0 && (
                <>
                  <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                    Số lượng ứng viên đã ứng tuyển: {post?.applied?.length || 0}
                  </h3>
                  <div className="flex items-center gap-x-3 pl-3 w-full">
                    <AppliedTable appliedList={post?.applied || []} />
                  </div>
                </>
              )}
              {post.list_invite?.length > 0 && (
                <>
                  <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                    Số lượng ứng viên được mời: {post?.list_invite?.length || 0}
                  </h3>
                  <div className="flex items-center gap-x-3 pl-3 w-full">
                    <InviteTable inviteList={post?.list_invite || []} />
                  </div>
                </>
              )}
            </div>
          )}

          <footer className="p-8 border-t border-solid border-[#d5e0d5] flex items-center justify-end">
            <Button className="cursor-pointer flex items-center border-solid border-transparent text-sm font-medium  bg-[#108a00] hover:bg-[#14a800] text-white mr-4 ">
              <Link
                href={{
                  pathname: `/freelancer/job/${postId}/apply`,
                }}
              >
                Ứng tuyển ngay
              </Link>
            </Button>
            <Button className="cursor-pointer flex items-center border-2 border-solid-[#14a800] border-transparent text-sm font-medium  bg-[#108a00] hover:bg-[#14a800] text-white mr-4">
              <Link
                href={`/freelancer/apply/${postId}`}
                className="flex gap-x-3"
              >
                <SquarePen color="#fff" className="w-5 h-5" />
                <span>Lưu công việc</span>
              </Link>
            </Button>
          </footer>
        </article>
      </div>
    </section>
  );
};

export default PostDetail;
