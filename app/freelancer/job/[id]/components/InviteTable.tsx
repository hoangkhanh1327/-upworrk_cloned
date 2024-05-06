import React from "react";
import { Space, Table, TableProps, Tag } from "antd";
import { Invited } from "@/app/types/client.types";

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
        title: "STT",
        dataIndex: "id",
        key: "id",
        render: (text, record, index) => <a>{index + 1}</a>,
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
  ];

  return <Table className="w-[100%]" columns={columns} dataSource={inviteList} />;
};

export default InviteTable;
