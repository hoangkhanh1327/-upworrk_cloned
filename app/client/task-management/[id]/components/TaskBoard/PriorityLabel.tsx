import React from "react";

interface PriorityLabelProps {
  priority: string | number;
}

const PriorityLabel = ({ priority }: PriorityLabelProps) => {
  return (
    <div>
      <span
        className={`size-min p-2 rounded-sm ${
          priority === "1"
            ? "bg-red-300"
            : priority === "2"
            ? "bg-green-200"
            : "bg-blue-300"
        }`}
      >
        {priority === "1"
          ? "Quan trọng"
          : priority === "2"
          ? "Trung bình"
          : "Ưu tiên thấp"}
      </span>
    </div>
  );
};

export default PriorityLabel;
