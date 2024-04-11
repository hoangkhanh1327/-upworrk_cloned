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
import { Label } from "@/app/components/ui/label";

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
          // sex: sex,
          // date_of_birth: format(birthDay, 'yyyy-MM-dd'),
          // phone_num: phoneRef.current?.value || '',
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

          {/* <div className="text-center">
            <div className="mt-2" x-show="! photoPreview">
              <img
                src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                className="w-40 h-40 m-auto rounded-full shadow"
              />
            </div>
            <div className="mt-2" x-show="photoPreview">
              <span
                className="block w-40 h-40 rounded-full m-auto shadow"
                x-bind:style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + photoPreview + '\');'"
              ></span>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
            >
              Select New Photo
            </button>
          </div> */}

          {/* <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='sex' className='text-right'>
                        Giới tính
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            setSex(value);
                        }}
                        defaultValue={user?.sex}
                    >
                        <SelectTrigger
                            id='sex'
                            className='w-full col-span-3'
                        >
                            <SelectValue placeholder='Chọn giới tính' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='0'>Nam</SelectItem>
                            <SelectItem value='1'>Nữ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='birthday' className='text-right'>
                        Ngày sinh
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id='birthday'
                                variant={'outline'}
                                className={cn(
                                    'w-[280px] justify-start text-left font-normal',
                                    !birthDay && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {birthDay ? (
                                    format(birthDay, 'dd/MM/yyyy')
                                ) : (
                                    <span>Chọn ngày sinh</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar
                                mode='single'
                                selected={new Date(birthDay)}
                                onSelect={(date) =>
                                    date ? setBirthday(date) : null
                                }
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='phone' className='text-right'>
                        Số điện thoại
                    </Label>
                    <Input
                        placeholder='Nhập số điện thoại'
                        id='phone'
                        className='w-full col-span-3'
                        defaultValue={user?.phone_num}
                        ref={phoneRef}
                    />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='address' className='text-right'>
                        Địa chỉ
                    </Label>
                    <Input
                        placeholder='Nhập địa chỉ'
                        id='address'
                        className='w-full col-span-3'
                        defaultValue={user?.address}
                        ref={addressRef}
                    />
                </div> */}
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
