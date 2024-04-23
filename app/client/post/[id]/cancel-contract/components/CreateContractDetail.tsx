import React, { useContext, useEffect } from "react";
import { DetailPostContext } from "../../context/PostDetailProvider";
import { Skeleton } from "@/app/components/ui/skeleton";
import CancelFormContract from "./FormCancel";
interface ICancelContract {
  postId: string;
}
const CancelContractDetail = ({ postId }: ICancelContract) => {
  const { post, loading, handleGetPostDetail } = useContext(DetailPostContext);
  useEffect(() => {
    if (postId) {
      handleGetPostDetail?.(postId);
    }
  }, [postId]);
  return loading ? (
    <>
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-7" />
    </>
  ) : (
    <section>

      {post && post?.nominee ? (
        <CancelFormContract nominee={post?.nominee} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default CancelContractDetail;
