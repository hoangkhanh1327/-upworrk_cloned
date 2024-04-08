import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
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
import Link from "next/link";
import { set } from "lodash";
import CreateContractDialog from "./dialogs/CreateContractDialog";

interface IAppliedTable {
  appliedList: Applied[];
}

const AppliedTable: React.FC<IAppliedTable> = ({ appliedList = [] }) => {
  const [appliedInfo, setAppliedInfo] = useState<Applied | null>(null);
  const [infoUserApply, setInfoUserApply] = useState<Applied | null>(null);

  return (
    <>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center font-medium">
              STT
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-center">Proposal</TableHead>
            <TableHead className="text-right">Ngày tạo tài khoản</TableHead>
            <TableHead className="text-center">Giới thiệu</TableHead>
            <TableHead className="text-center">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedList.map((i, index) => (
            <TableRow key={`applied-job-item-${i.id}`}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell>{i.username}</TableCell>
              <TableCell className="text-center">${i.proposal}</TableCell>
              <TableCell className="text-center">
                {format(i.created_at, "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{i.cover_letter}</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-8">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Eye
                          role="button"
                          className="w-5 h-5"
                          onClick={() => setAppliedInfo(i)}
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
                        <PenTool
                          onClick={() => setInfoUserApply(i)}
                          role="button"
                          className="w-5 h-5"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ký hợp đồng</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {appliedInfo && (
        <AppliedInfoDialog
          info={appliedInfo}
          onClose={() => setAppliedInfo(null)}
        />
      )}
       {infoUserApply && (
        <CreateContractDialog
          info={infoUserApply}
          onClose={() => setInfoUserApply(null)}
        />
      )}
    </>
  );
};

export default AppliedTable;
