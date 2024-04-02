import { useToast } from "@/app/components/ui/use-toast";
import { clientServices } from "@/app/services/client.services";
import { DetailClientPost } from "@/app/types/client.types";
import { createContext, useCallback, useState } from "react";

interface IDetailPostContext {
  post: DetailClientPost | null;
  loading: boolean;
  handleGetPostDetail?: (postId: string) => void;
}

export const DetailPostContext = createContext<IDetailPostContext>({
  post: null,
  loading: false,
});

const PostDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<DetailClientPost | null>(null);

  const handleGetPostDetail = useCallback(async (postId: string) => {
    try {
      setLoading(true);
      const res = await clientServices.getPost(postId);
      if (res.data) {
        setPost(res.data);
      }
    } catch (error) {
      toast({
        title: "Tải thông tin công việc thất bại",
        description: (error as Error)?.message,
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DetailPostContext.Provider
      value={{
        post,
        loading,
        handleGetPostDetail,
      }}
    >
      {children}
    </DetailPostContext.Provider>
  );
};

export default PostDetailProvider;
