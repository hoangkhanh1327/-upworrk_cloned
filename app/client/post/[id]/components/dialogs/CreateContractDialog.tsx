import { Button } from "@/app/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Applied, Nominee } from "@/app/types/client.types";
import { Dialog } from "@radix-ui/react-dialog";
import Link from "next/link";
import CreateFormContract from "../FormCreate";

interface IAppliedInfoDialog {
  info: Nominee;
  onClose: () => void;
}

const CreateContractDialog: React.FC<IAppliedInfoDialog> = ({
  info,
  onClose,
}) => {
  console.log("info", info);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[80%] h-[100%]">
        <DialogHeader>
          <DialogTitle>Tạo 1 hợp đồng làm việc mới</DialogTitle>
        </DialogHeader>
        <div>
          <CreateFormContract nominee={info} />
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onClose()}>
            Đóng
          </Button>
          <Button
            asChild
            // variant="default"
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
