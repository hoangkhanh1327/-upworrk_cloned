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
import { Applied } from "@/app/types/client.types";
import { format } from "date-fns";
import Link from "next/link";

interface IAppliedTable {
  appliedList: Applied[];
}

const AppliedTable: React.FC<IAppliedTable> = ({ appliedList = [] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center font-medium">#</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="text-center">Proposal</TableHead>
          <TableHead className="text-right">Ngày tạo tài khỏan</TableHead>
          <TableHead className="text-center">Giới thiệu</TableHead>
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
              <Button>
                <Link
                  className="text-link bg-primary-color hover:bg-primary-color hover:text-[#0cc0df] font-medium transition-[color] underline"
                  href={`/client/post/${i.job_id}/create-contract/${i.freelancer_id}}`}>
                    Chọn để tạo hợp đồng
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppliedTable;
