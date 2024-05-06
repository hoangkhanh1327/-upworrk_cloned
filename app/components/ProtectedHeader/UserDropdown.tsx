import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUser, CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Image } from "antd";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <CircleUserRound className="ml-3 cursor-pointer w-7 h-7" /> */}
        <div className="w-[30px] h-[30px] relative rounded-full overflow-hidden cursor-pointer  ml-3">
          <img
            src={
              (user?.avatar_url && user?.avatar_url.toString()) ||
              "/images/others/unknown_avatar.png"
            }
            alt=""
            className="w-[100%] h-[100%] rounded-full object-cover"
          />
          {/* <span>Thông tin tài khoản</span> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuItem>
          <div className="flex flex-col items-center justify-center w-full py-5">
            {/* <CircleUserRound className="w-20 h-20" /> */}
            <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden">
              <img
                src={
                  (user?.avatar_url && user?.avatar_url.toString()) ||
                  "/images/others/unknown_avatar.png"
                }
                alt=""
                className="w-[100%] h-[100%] rounded-full object-cover"
              />
            </div>
            <h4 className="mt-2.5 text-center text-base font-medium">
              {user?.first_name
                ? `${user?.first_name} ${user?.last_name}`
                : user?.username}
            </h4>
            <small></small>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <DropdownMenuLabel asChild>
            <Button
              className="w-full border-none bg-transparent text-left justify-between"
              variant="outline"
            >
              <CircleUser />
              <span>Thông tin tài khoản</span>
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <DropdownMenuLabel asChild>
            <Button
              className="w-full border-none bg-transparent text-left justify-between"
              variant="outline"
            >
              <LogOut />
              <span>Đăng Xuất</span>
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
