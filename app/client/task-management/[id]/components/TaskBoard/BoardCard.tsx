import { forwardRef, useState } from "react";
import classNames from "classnames";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import { Task } from "@/app/types/task.types";
import { format, compareAsc } from "date-fns";
import { cn } from "@/lib/utils";
import { useTaskBoardContext } from "./TaskBoardContext";
import { Button } from "antd";
import PriorityLabel from "./PriorityLabel";
import { CiEdit } from "react-icons/ci";
import DialogConfirmTask from "./DialogConfirmTask";
// import { Select } from "antd";
// import { CommonSelectOptions } from "@/app/types/common.types";

interface BoardCardProps {
  data: Task;
}

const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
  const [open, setOpen] = useState(false);

  //   const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const { data, ...rest } = props;

  const { onOpenDialog, onOpenDrawer } = useTaskBoardContext();
  const { name, desc, deadline, priority, status } = data;

  const onCardClick = () => {
    onOpenDialog("UPDATE_TASK", data);
  };

  const isDeadline = compareAsc(new Date(deadline), new Date());

  return (
    <>
      <Card
        ref={ref}
        className={classNames(
          "hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 mb-6"
        )}
        {...rest}
      >
        <CardHeader className="">
          <div className="flex justify-between">
            <span className="text-lg font-bold">{name}</span>
            <span className="float-right p-2">
              <CiEdit
                className="font-bold text-lg cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCardClick();
                }}
              />
            </span>
          </div>
        </CardHeader>
        <CardContent onClick={() => onOpenDrawer(data)}>
          <p className="text-sm">{desc}</p>
          <div className="mb-2">
            <small
              className={cn(
                "",
                isDeadline === -1 ? "text-rose-500" : "text-primary-color"
              )}
            >
              Deadline: {format(deadline, "dd/MM/yyyy")}
            </small>
          </div>
        </CardContent>
        <CardFooter className="block">
          <PriorityLabel priority={priority} />
          {status === "1" && (
            <Button
              onClick={() => setOpen(true)}
              size="middle"
              className="bg-primary-foreground my-4"
            >
              Xác nhận công việc
            </Button>
          )}
        </CardFooter>
      </Card>
      <DialogConfirmTask
        open={open}
       
        onClosed={handleCancel}
      
      />
    </>
  );
});

BoardCard.displayName = "BoardCard";

export default BoardCard;
