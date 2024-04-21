import { Button } from "@/app/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Applied } from "@/app/types/client.types";
import { format } from "date-fns";
import { Eye, PenTool } from "lucide-react";
import { useState } from "react";
import { set } from "lodash";
import Link from "next/link";
import AppliedInfoDialog from "./dialog/AppliedInfoDialog";
import { Table, TableProps, Tag } from "antd";

interface IAppliedTable {
  appliedList: Applied[];
}

const AppliedTable: React.FC<IAppliedTable> = ({ appliedList = [] }) => {
  const [appliedInfo, setAppliedInfo] = useState<Applied | null>(null);
  const [infoUserApply, setInfoUserApply] = useState<Applied | null>(null);

  const columns: TableProps<Applied>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Tên ứng viên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Thư giới thiệu",
      dataIndex: "cover_letter",
      key: "cover_letter",
    },
    {
      title: "File đính kèm",
      dataIndex: "attachment_url",
      key: "attachment_url",
    },
    {
      title: "Xem thông tin ứng viên",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        // <Link href={`/client/applied/${record.id}`}>
        //   <a>Xem thông tin ứng viên</a>
        // </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Eye
                role="button"
                className="w-5 h-5"
                onClick={() => setAppliedInfo(record)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Xem thông tin ứng viên</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ];

  return (
    <>
      <Table className="w-[100%]" columns={columns} dataSource={appliedList} />
      {appliedInfo && (
        <AppliedInfoDialog
          info={appliedInfo}
          onClose={() => setAppliedInfo(null)}
        />
      )}
      {/* {infoUserApply && (
        <CreateContractDialog
          info={infoUserApply}
          onClose={() => setInfoUserApply(null)}
        />
      )} */}
    </>
  );
};

export default AppliedTable;
