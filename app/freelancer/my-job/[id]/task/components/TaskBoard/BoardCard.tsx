import { forwardRef } from "react";
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
import PriorityLabel from "./PriorityLabel";
import { CiEdit } from "react-icons/ci";
import { Select } from "antd";
import { CommonSelectOptions } from "@/app/types/common.types";

interface BoardCardProps {
  data: Task;
}

const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
  const { data, ...rest } = props;
  const { onOpenDialog, onOpenDrawer } = useTaskBoardContext();

  const { name, desc, deadline, priority, status } = data;

  const onCardClick = () => {
    onOpenDialog("UPDATE_TASK", data);
  };
  const Options: CommonSelectOptions[] = [
    {
      label: "Xác nhận",
      value: "1",
    },
    {
      label: "Xử lý lại",
      value: "0",
    },
  ];
  const isDeadline = compareAsc(new Date(deadline), new Date());

  return (
    <Card
      ref={ref}
      className={classNames(
        "hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 mb-6"
      )}
      onClick={() => onOpenDrawer(data)}
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
      <CardContent>
        <p className="font-medium">{desc}</p>
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
          <Select
            disabled
            defaultValue={Options[0].value}
            options={Options}
            style={{ width: 150, marginTop: 10 }}
          />
        )}
      </CardFooter>
    </Card>
  );
});

BoardCard.displayName = "BoardCard";

export default BoardCard;
