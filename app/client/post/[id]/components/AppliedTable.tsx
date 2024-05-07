import { Button } from "@/app/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Applied } from "@/app/types/client.types";
import { format } from "date-fns";
import { Eye, File, PenTool } from "lucide-react";
import { useState,useContext } from "react";
import AppliedInfoDialog from "./dialogs/AppliedInfoDialog";
import { set } from "lodash";
import Link from "next/link";
import { Table, TableProps } from "antd";
import { clientServices } from "@/app/services/client.services";
import { NotificationContext } from "@/app/providers/NotificationProvider";
import { CommonResponse } from "@/app/types/common.types";
import { useRouter } from "next/navigation";

interface IAppliedTable {
  appliedList: Applied[];
  statusJob:number;
}

const AppliedTable: React.FC<IAppliedTable> = ({ appliedList = [], statusJob }) => {
  const router = useRouter();
  const [appliedInfo, setAppliedInfo] = useState<Applied | null>(null);
  const [infoUserApply, setInfoUserApply] = useState<Applied | null>(null);
  const {openNotificationWithIcon}=useContext(NotificationContext);
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
      render: (text:string, record) => (
        <div className="flex items-center gap-x-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <File
                  role="button"
                  className="w-5 h-5"
                  onClick={() => {
                    console.log(text);
                    
                    window.location.href = text;
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Xem tài liệu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
        </div>
      )
    },
    {
      title: "Chi tiết Ứng viên",
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
                <p>chi tiết ứng viên</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      render: (text:number, record) => (
        <div className="flex items-center gap-x-8">
         
          {statusJob==1?<Button
            variant="default"
            className="text-white bg-primary-color hover:bg-primary-color"
            onClick={async() => {
              const result:CommonResponse = await clientServices.recruitConfirm(text);
              console.log(result);
              if (result.result == 0) {
                openNotificationWithIcon("success","Thành công","Thao tác thực hiện thành công vui lòng kí hợp đồng để bắt đầu công việc")
              }
              else {
                openNotificationWithIcon("error","Thất bại","Có lỗi khi thực hiện vui lòng thử lại.")
              }
              router.replace(`/client/post/${text}`);

              
             }}
          >
            Ký hợp đồng
          </Button>:<></>}
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
