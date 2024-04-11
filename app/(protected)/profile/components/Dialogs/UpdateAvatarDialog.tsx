import React, { useContext, useRef, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "@/app/providers/AuthProvider";
import { useToast } from "@/app/components/ui/use-toast";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { loginServices } from "@/app/services/authentication.services";
import { cn } from "@/lib/utils";
import { Input } from "@/app/components/ui/input";

const UpdateAvatarDialog = () => {
  const { onCloseModal } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const accountType = Cookies.get("account_type");
  // const phoneRef = useRef<HTMLInputElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState(user?.avatar_url ? user.avatar_url : "");

  const handleSubmit = async () => {
    try {
      if (accountType === "client") {
        const res = await loginServices.updateUserInfo({
          avatar_url: avatarRef.current?.value || "",
        });
        if (res.data) {
          toast({
            title: "Cập nhật thành công",
            description: "Thông tin tài khoản đã được cập nhật",
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            duration: 1000,
          });
          setUser?.(res.data);
          onCloseModal?.();
        }
      }
      if (accountType === "freelancer") {
        const res = await loginServices.updateFreelancerInfo({
          avatar_url: avatarRef.current?.value || "",
        });
        if (res.data) {
          toast({
            title: "Cập nhật thành công",
            description: "Thông tin tài khoản đã được cập nhật",
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            duration: 1000,
          });
          setUser?.(res.data);
          onCloseModal?.();
        }
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Đã có lỗi xảy ra",
        description: (error as Error)?.message,
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCloseModal?.()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cập nhật avartar mới</DialogTitle>
          <DialogDescription>
            {`Thay đổi thông tin tài khoản.`}
          </DialogDescription>
        </DialogHeader>
        {/* <div className='grid gap-4 py-4'> */}
        <div className=" items-center gap-4 flex justify-center jus">
          <img src={user?.avatar_url ? user?.avatar_url : '/images/others/unknown_avatar.png'} className="w-[100px] h-[100px]" />
          {/* <Label htmlFor="avatar" className="text-right">
            Avartar
          </Label> */}
          <Input
            type="file"
            placeholder="Nhập đường dẫn ảnh"
            id="avatar"
            className="w-full col-span-3"
            defaultValue={user?.avatar_url}
            ref={avatarRef}
          />

        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onCloseModal?.()}>
            Đóng
          </Button>
          <Button type="submit" onClick={() => handleSubmit()}>
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAvatarDialog;
