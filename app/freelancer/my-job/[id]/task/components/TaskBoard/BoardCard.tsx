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

interface BoardCardProps {
  data: Task;
}

const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
  const { data, ...rest } = props;
  const { onOpenDialog } = useTaskBoardContext();

  const { name, desc, deadline, priority } = data;

  const onCardClick = () => {
    onOpenDialog("UPDATE_TASK", data);
  };

  const isDeadline = compareAsc(new Date(deadline), new Date());

  return (
    <Card
      ref={ref}
      className={classNames(
        "hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 mb-6"
      )}
      onClick={() => onCardClick()}
      {...rest}
    >
      <CardHeader className="font-semibold">{name}</CardHeader>
      <CardContent>
        <p className="text-sm">{desc}</p>
      </CardContent>
      <CardFooter className="block">
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
        <PriorityLabel priority={priority} />
      </CardFooter>
    </Card>
  );
});

BoardCard.displayName = "BoardCard";

export default BoardCard;
