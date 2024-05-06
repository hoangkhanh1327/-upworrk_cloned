import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd";
import CommentContent from "./CommentContent";
import CommentInput from "./CommentInput";
import { useToast } from "@/app/components/ui/use-toast";
import { taskServices } from "@/app/services/task.services";
import { cn } from "@/lib/utils";
import { Task } from "@/app/types/task.types";

interface ICommentInput {
  data: Task;
  isOpen: boolean;
  onClose: () => void;
}

const Comment = ({ data, isOpen, onClose }: ICommentInput) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>("large");
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(736);

  //   ----------------------Rezie Drawer----------------------
  const onMouseDown = (e: any) => {
    setIsResizing(true);
  };

  const onMouseUp = (e: any) => {
    setIsResizing(false);
  };

  const onMouseMove = (e: { clientX: number }) => {
    if (isResizing) {
      let offsetRight =
        document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
      const minWidth = 600;
      const maxWidth = 900;
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        setWidth(offsetRight);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  // ----------------------------------------------------------

  const [comment, setComment] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setComment((data as any)?.comment);
    }
  }, [data]);

  const handleAddTask = async (commentData: any) => {
    try {
      setLoading(true);
      const res = await taskServices.addComment({
        task_id: data.id,
        content: commentData?.content as any,
        type: commentData?.type as any,
      });
      if (res.result === -1) {
        toast({
          title: "Comment thất bại!",
          variant: "destructive",
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          description: res?.message || "",
        });
      } else {
        if (res.data) {
          setComment((prev) => [...prev, res.data]);
        }
      }
    } catch (error) {
      toast({
        title: "Comment thất bại!",
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: (error as Error)?.message || "",
      });
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  //   const showDefaultDrawer = () => {
  //     setSize('default');
  //     setOpen(true);
  //   };

  //   const showLargeDrawer = () => {
  //     setSize('large');
  //     setOpen(true);
  //   };

  //   const onClose = () => {
  //     setOpen(false);
  //   };

  return (
    <>
      <Space>
        {/* <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (378px)
        </Button>
        <Button type="primary" onClick={showLargeDrawer}>
          Open Large Size (736px)
        </Button> */}
      </Space>
      <Drawer
        title={`${data.name} - Bình luận`}
        placement="right"
        // size={size}
        // maskClosable={false}
        onClose={onClose}
        open={isOpen}
        width={width}
        extra={
          <Space>
            <Button onClick={onClose}>Đóng</Button>
            {/* <Button type="default" onClick={onClose}>
              OK
            </Button> */}
          </Space>
        }
      >
        <div
          style={{
            position: "absolute",
            width: "1px",
            padding: "1px 0 0",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 100,
            cursor: "ew-resize",
            backgroundColor: "#fff",
            boxShadow: "1px 0 0 0 #e8e8e8, -1px 0 0 0 #e8e8e8",
          }}
          onMouseDown={onMouseDown}
        />
        <CommentContent comment={comment} />
        <CommentInput
          loading={loading}
          onSubmit={(data) => handleAddTask(data)}
        />
      </Drawer>
    </>
  );
};

export default Comment;
