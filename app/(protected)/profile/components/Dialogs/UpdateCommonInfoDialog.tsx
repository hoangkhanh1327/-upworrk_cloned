import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useContext, useRef } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "@/app/providers/AuthProvider";
import { loginServices } from "@/app/services/authentication.services";
import { useToast } from "@/app/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const UpdateCommonInfoDialog = () => {
  const { onCloseModal } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const accountType = Cookies.get("account_type");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const lastnameRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);

  const checkValid = () => {
    let isValid = true;
    if (usernameRef.current?.value === "") {
      toast({
        title: "Vui lòng nhập đủ thông tin",
        description: "Username không được trống!",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (checkValid()) {
        if (accountType === "client") {
          const res = await loginServices.updateUserInfo({
            username: usernameRef.current?.value,
            company_name: companyRef.current?.value || "",
            last_name: lastnameRef.current?.value || "",
            first_name: firstNameRef.current?.value || "",
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
            username: usernameRef.current?.value,
            company_name: companyRef.current?.value || "",
            last_name: lastnameRef.current?.value || "",
            first_name: firstNameRef.current?.value || "",
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
          <DialogTitle>Cập nhật thông tin</DialogTitle>
          <DialogDescription>
            {`Thay đổi thông tin tài khoản.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Họ
            </Label>
            <Input
              ref={lastnameRef}
              id="lastname"
              defaultValue={user?.last_name}
              className="col-span-3  !border-1 focus-visible:!ring-transparent focus-visible:!ring-offset-0"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              Tên
            </Label>
            <Input
              ref={firstNameRef}
              id="firstname"
              defaultValue={user?.first_name}
              className="col-span-3  !border-1 focus-visible:!ring-transparent focus-visible:!ring-offset-0"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              ref={usernameRef}
              id="username"
              defaultValue={user?.username}
              className="col-span-3  !border-1 focus-visible:!ring-transparent focus-visible:!ring-offset-0"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company_name" className="text-right">
              Tên công ty
            </Label>
            <Input
              ref={companyRef}
              id="company_name"
              defaultValue={user?.company_name}
              className="col-span-3  !border-1 focus-visible:!ring-transparent focus-visible:!ring-offset-0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className=" bg-primary-color hover:bg-primary-color hover:text-white"
            onClick={() => onCloseModal?.()}
          >
            Đóng
          </Button>
          <Button
            type="submit"
            className="bg-primary-color hover:bg-primary-color"
            onClick={() => handleSubmit()}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCommonInfoDialog;
