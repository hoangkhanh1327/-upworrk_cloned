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
import CreateFormContract from "../FormCreate";

interface IAppliedInfoDialog {
  info: Applied;
  onClose: () => void;
}

const CreateContractDialog: React.FC<IAppliedInfoDialog> = ({
  info,
  onClose,
}) => {
  console.log("info", info);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo 1 hợp đồng làm việc mới</DialogTitle>
          {/* <DialogDescription>
            {`Tóm tắt thông tin về ứng viên.`}
          </DialogDescription> */}
        </DialogHeader>
        <div>
          <CreateFormContract infoApply={info}/>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onClose()}>
            Đóng
          </Button>
          <Button
            asChild
            variant="default"
            className="text-link bg-primary-color hover:bg-primary-color"
          >
            Chọn để tạo hợp đồng
          </Button>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContractDialog;
