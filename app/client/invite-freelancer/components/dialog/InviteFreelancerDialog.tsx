"use client";
import React from 'react'
import { Button } from "@/app/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { FreelancerInfo } from '@/app/types/authentication.types';
import CreateFormContract from '@/app/client/post/[id]/components/FormCreate';



interface IInviteFreelancerDialog {
    info: FreelancerInfo;
    onClose: () => void;
  }
  

const InviteFreelancerDialog = ({info, onClose}: IInviteFreelancerDialog) => {
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[80%] h-[80%]">
        <DialogHeader>
          <DialogTitle>Tạo lời mời việc mới với {info.username}</DialogTitle>
        </DialogHeader>
        <div>
          <CreateFormContract infoApply={info} />
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
}

export default InviteFreelancerDialog