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
import Image from "next/image";
import { Label } from "@/app/components/ui/label";
import { MessageCircleX, XCircle } from "lucide-react";

const UpdateAvatarDialog = () => {
  const { onCloseModal } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const accountType = Cookies.get("account_type");
  // const phoneRef = useRef<HTMLInputElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<{ imgSrc: string }>({ imgSrc: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.target;
    if (files?.length) {
      setSelectedFile(files[0]);
      const reader = new FileReader();
      const url = reader.readAsDataURL(files[0]);
      reader.onloadend = function (e) {
        setAvatar({
          imgSrc: reader.result as string,
        });
      };
    }
  };

  console.log("avatar", avatar);

  const handleSubmit = async () => {
    try {
      if (accountType === "client") {
        const res = await loginServices.updateUserInfo({
          avatar_url: selectedFile as any,
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
          setSelectedFile(null);
          setAvatar({ imgSrc: "" });
          setUser?.(res.data);
          onCloseModal?.();
        }
      }
      if (accountType === "freelancer") {
        const res = await loginServices.updateFreelancerInfo({
          avatar_url: selectedFile as any,
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
          setSelectedFile(null);
          setAvatar({ imgSrc: "" });
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
        <div className="items-center gap-x-5 flex justify-center">
          {avatar.imgSrc ? (
            <div className="group relative w-[150px] h-[150px] rounded-full overflow-hidden">
              <div
                onClick={() => setAvatar({ imgSrc: "" })}
                className="group-hover:flex cursor-pointer hidden absolute z-[100]  items-center justify-center w-full h-full bg-black bg-opacity-60"
              >
                <XCircle fill="#fff" />
              </div>
              <Image fill alt="" src={avatar.imgSrc} className="z-10" />
            </div>
          ) : (
            <Label
              htmlFor="avatar"
              className="relative cursor-pointer w-[150px] h-[150px] rounded-full overflow-hidden"
            >
              <Image
                fill
                alt=""
                src={
                  user?.avatar_url
                    ? user?.avatar_url.toString()
                    : "/images/others/unknown_avatar.png"
                }
              />
            </Label>
          )}

          <Input
            type="file"
            placeholder="Nhập đường dẫn ảnh"
            id="avatar"
            className=" hidden flex-1 col-span-3"
            ref={avatarRef}
            onChange={(e) => handleUploadFile(e)}
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
