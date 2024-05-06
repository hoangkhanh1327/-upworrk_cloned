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
import AppliedInfoDialog from "./dialogs/AppliedInfoDialog";
import { set } from "lodash";
import Link from "next/link";
import { Table, TableProps } from "antd";

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
        <div className="flex items-center gap-x-8">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <PenTool
                // onClick={() => setInfoUserApply(i)}
                // role="button"
                className="w-5 h-5"
              > */}
                {/* <Link href={`/post/${i.id}/create-contract`}>
                  <Button
                    onClick={() => setInfoUserApply(i)}
                    className="w-5 h-5"
                  >
                    Ký hợp đồng
                  </Button> */}
                <Button
                  asChild
                  variant="default"
                  className="text-white bg-primary-color hover:bg-primary-color"
                >
                  <Link href={`/client/post/${record.job_id}/create-contract`}>
                    Ký hợp đồng
                  </Link>
                </Button>

                {/* </PenTool > */}
              </TooltipTrigger>
              <TooltipContent>
                <p>Ký hợp đồng</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
