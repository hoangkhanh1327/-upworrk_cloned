import React, { useContext, useEffect } from "react";
import { DetailPostContext } from "../../context/PostDetailProvider";
import { Skeleton } from "@/app/components/ui/skeleton";
import CreateFormContract from "../../components/FormCreate";
interface ICreateContract {
  postId: string;
}
const CreateContractDetail = ({ postId }: ICreateContract) => {
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
        {post&&post?.nominee? <CreateFormContract postDetail={post} />:<></>}
    </section>
  );
};

export default CreateContractDetail;
