import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { AuthContext } from "@/app/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { File, Send } from "lucide-react";
import React, { useContext, useRef } from "react";

interface DataSubmit {
  content: string | File;
  type: "text" | "file";
}

interface ICommentInput {
  onSubmit: (data: DataSubmit) => void;
  loading: boolean;
}

const CommentInput: React.FC<ICommentInput> = ({ onSubmit, loading }) => {
  const commentText = useRef<any>(null);
  const { user } = useContext(AuthContext);
  return (
    <div className="border-blue-50 border-b-2 mb-4">
      <div className="w-[100%] m-0">
        <div className="px-2 pt-2 pb-4">
          <div className="flex w-[100%] cursor-pointer">
            <div className="flex items-center flex-grow-[1]">
              <div className="flex-shrink-0 flex-grow-0 mr-4 self-start ">
                <img
                  src={
                    (user?.avatar_url && user?.avatar_url.toString()) ||
                    "/images/others/unknown_avatar.png"
                  }
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex w-[100%] flex-grow-[1] min-h-[24px] pt-2 ">
                {/* <div className="px-4 inset-x-0 bottom-2 flex gap-x-3 items-center"> */}
                <Input
                  disabled={loading}
                  ref={commentText}
                  placeholder="Nhập nội dung comment..."
                  className="!h-7
                    border-0 border-none border-[#e4ebe4]
                     text-sm
                      leading-[22px] transition-[border-color]
                      focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-opacity-50
                      no-underline mr-2
                    "
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSubmit({
                        type: "text",
                        content: commentText.current?.value || "",
                      });
                      commentText.current.value = "";
                    }
                  }}
                />
                <Input
                  hidden
                  disabled={loading}
                  className="hidden mr-2"
                  type="file"
                  id="comment-file"
                  multiple={false}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.target.files) {
                      onSubmit({
                        type: "file",
                        content: e?.target?.files[0],
                      });
                      commentText.current.value = "";
                    }
                  }}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Label htmlFor="comment-file">
                        <File className={cn("", loading ? "opacity-40" : "")} />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gửi file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Send
                        className={cn("", loading ? "opacity-40" : "")}
                        onClick={() => {
                          !loading &&
                            onSubmit({
                              type: "text",
                              content: commentText.current?.value || "",
                            });
                          commentText.current.value = "";
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gửi comment</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
