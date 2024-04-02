import { Button } from "@/app/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Applied } from "@/app/types/client.types";
import { Dialog } from "@radix-ui/react-dialog";
import Link from "next/link";

interface IAppliedInfoDialog {
  info: Applied;
  onClose: () => void;
}

const AppliedInfoDialog: React.FC<IAppliedInfoDialog> = ({ info, onClose }) => {
  console.log("info", info);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin ứng viên</DialogTitle>
          <DialogDescription>
            {`Tóm tắt thông tin về ứng viên.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Username</Label>
            <div className="col-span-3">{info.username}</div>
            <Label className="my-3 text-right">Thư giới thiệu: </Label>
            <div className="col-span-3">
              <Textarea defaultValue={info.cover_letter} disabled />
            </div>
            <Label className="my-3 text-right">Proposal: </Label>
            <div className="col-span-3">${info.proposal || 0}</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onClose()}>
            Đóng
          </Button>
          <Button asChild variant="default" className="text-link bg-primary-color hover:bg-primary-color">
            <Link
              target="_blank"
              href={`/client/show-freelancer-info/${info.freelancer_id}`}
            >
              Xem thông tin chi tiết
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppliedInfoDialog;
