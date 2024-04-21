"use client";

import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { clientServices } from "@/app/services/client.services";
import { DetailClientPost } from "@/app/types/client.types";
import { format } from "date-fns";
import { FileIcon, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VscFile } from "react-icons/vsc";
import AppliedTable from "./AppliedTable";
import _, { isEmpty } from "lodash";
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
        const res = await clientServices.getPost(postId);
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

  console.log("post?.nominee", post?.nominee);

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
              <>
                <h3 className="text-2xl font-medium">{post?.title || ""}</h3>
                {post?.status?.toString() !== "3" && (
                  <Button
                    asChild
                    className="rounded-full p-2 bg-transparent hover:bg-transparent"
                  >
                    <Link href={`/client/post/${postId}/edit`}>
                      <SquarePen color="#000" className="w-5 h-5" />
                    </Link>
                  </Button>
                )}
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
            <div className="mb-6 flex items-start">
              <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                Hình ảnh
              </h3>
              <div className="flex items-center gap-x-3 pl-3">
                {!loading && post?.content_file && (
                  <Link href={post?.content_file} target="_blank">
                    <div className="w-[120px] h-[120px] relative">
                      <Image src={post?.content_file} alt="" fill />
                    </div>
                  </Link>
                )}
              </div>
            </div>
            {/* Nominal */}
            {post?.status?.toString() === "3" && !isEmpty(post?.nominee) && (
              <div className="mb-6 items-start">
                <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                  Ứng viên đã kí hợp đồng: {/* {post?.applied?.length || 0} */}
                </h3>
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  {/* <h3>Name: {post?.nominee?.username}</h3> */}
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {/* <a href="#"> */}
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Thông tin ứng viên
                    </h5>
                    {/* </a> */}
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                      <strong>Tên ứng viên:</strong> {post?.nominee?.username}
                    </p>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                      <strong>Email:</strong> {post?.nominee?.email}
                    </p>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                      <strong>Thư giới thiệu:</strong>{" "}
                      {post?.nominee?.cover_letter}
                    </p>

                    {!loading &&
                      post?.nominee &&
                      post?.nominee?.attachment_url && (
                        <div className="mb-6 flex items-center">
                          <h3 className="text-lg font-medium min-w-[130px]">
                            File đính kèm
                          </h3>
                          <div className="flex items-center gap-x-3 pl-3">
                            <Link
                              href={post?.nominee.attachment_url}
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
                                      {`${post?.nominee?.username}`}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    <div>
                      <Button
                        asChild
                        variant="default"
                        // className="text-white bg-primary-color hover:bg-primary-color"
                        className="text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                      >
                        <Link
                          target="_blank"
                          href={`/client/show-freelancer-info/${post.nominee?.freelancer_id}`}
                        >
                          Xem thông tin chi tiết
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-6 flex items-start justify-end">
              {post?.status?.toString() === "3" && (
                <Button className="cursor-pointer flex items-center border-solid border-transparent text-sm font-medium  bg-[#108a00] hover:bg-[#14a800] text-white mr-4 ">
                  <Link
                    href={{
                      pathname: `/client/task-management/${post?.id}`,
                    }}
                  >
                    Quản lý chi tiết công việc
                  </Link>
                </Button>
              )}
            </div>
            {(post?.status?.toString() === "1" ||
              post?.status?.toString() === "2") && (
              <div className="mb-6 p-[20px] flex items-center flex-col">
                {post.applied?.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                      Số lượng ứng viên: {post?.applied?.length || 0}
                    </h3>
                    <div className="flex items-center gap-x-3 pl-3 w-full">
                      <AppliedTable appliedList={post?.applied || []} />
                    </div>
                  </>
                )}
                {post.list_invite?.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mb-2 min-w-[130px]">
                      Số lượng ứng viên: {post?.applied?.length || 0}
                    </h3>
                    <div className="flex items-center gap-x-3 pl-3 w-full">
                      <InviteTable inviteList={post?.list_invite || []} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default PostDetail;
