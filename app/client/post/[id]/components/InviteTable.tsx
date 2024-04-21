import React from "react";
import { Space, Table, TableProps, Tag, Tooltip } from "antd";
import { Invited } from "@/app/types/client.types";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

interface IInvitedTable {
  inviteList: Invited[];
}

// interface DataType {
//     data:
//   }

const InviteTable = ({ inviteList }: IInvitedTable) => {
  console.log("inviteList", inviteList);

  const columns: TableProps<Invited>["columns"] = [
    {
      title: "Job id",
      dataIndex: "job_id",
      key: "job_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên ứng viên",
      dataIndex: "username",
      key: "freelancer_id",
    },
    {
      title: "Nội dung",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Mail mời",
      dataIndex: "mail_invite",
      key: "mail_invite",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return status === "0" ? (
          <Tag color="green">Đã mời</Tag>
        ) : status === "1" ? (
          <Tag color="blue">Đã chấp nhận</Tag>
        ) : (
          <Tag color="red">Chưa mời</Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (text, record) => {
        return (
          record.status === "1" && (
            // <TooltipProvider>
            //   <Tooltip>
            //     <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="default"
                    className="text-white bg-primary-color hover:bg-primary-color"
                  >
                    <Link
                      href={`/client/post/${record.job_id}/create-contract`}
                    >
                      Ký hợp đồng
                    </Link>
                  </Button>

            //       {/* </PenTool > */}
            //     </TooltipTrigger>
            //     <TooltipContent>
            //       <p>Ký hợp đồng</p>
            //     </TooltipContent>
            //   </Tooltip>
            // </TooltipProvider>
          )
        );
      },
    },
  ];

  return (
    <Table className="w-[100%]" columns={columns} dataSource={inviteList} />
  );
};

export default InviteTable;
