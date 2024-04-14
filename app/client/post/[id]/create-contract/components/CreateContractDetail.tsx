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
  console.log("post------->", post);
  return loading ? (
    <>
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-7" />
    </>
  ) : (
      <section>
        {post&&post?.applied[0]? <CreateFormContract infoApply={post?.applied[0]} />:<></>}
     
    </section>
  );
};

export default CreateContractDetail;
