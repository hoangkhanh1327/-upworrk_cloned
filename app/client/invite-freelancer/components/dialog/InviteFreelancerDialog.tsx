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
import InviteFreelancerForm from '../form/InviteFreelancerForm';

interface IInviteFreelancerDialog {
  freelancer: FreelancerInfo;
  isOpen: boolean;
    onClose: () => void;
  }
  

const InviteFreelancerDialog = ({freelancer, isOpen,onClose}: IInviteFreelancerDialog) => {
  console.log('freelancer-------------------->', freelancer)
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Tạo lời mời việc mới với {freelancer.username}</DialogTitle>
        </DialogHeader>
        <div>
          <InviteFreelancerForm freelancer={freelancer} onClose={onClose}/>
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