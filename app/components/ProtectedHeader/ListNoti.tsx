import * as React from "react";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/app/components/ui/navigation-menu";
import Link from "next/link";

const ListNoti = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, isRead, linkable, children, ...props }, ref) => {
  console.log("LINK ABLE", linkable);
  // Hàm để cắt chuỗi nếu quá dài
  const truncateString = (str:any, maxLength:number) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  // Sử dụng hàm truncateString để giới hạn độ dài của title và children
  const truncatedTitle = truncateString(title, 50); // Giới hạn title 50 ký tự
  const truncatedChildren = truncateString(children, 100);

  return (
    <li className="pt-7 p-2" style={{ height: 90, maxHeight: 90 }}>
      <NavigationMenuLink asChild>
        {linkable && linkable.startsWith("http") ? (
          <a ref={ref} href={linkable} className="block hover:bg-gray-50">
            <div
              className="flex items-center space-x-4"
              style={{ borderBottom: "solid 0.5px" }}
            >
              {/* Thêm biểu tượng thông báo ở đây nếu bạn muốn */}
              {/* <div style={{width:"20%"}}>aaa</div> */}
              <img
                src={"https://timviecits.id.vn/storage/notificationdefault.png"}
                style={{ width: 50, height: 50, margin: "20px" }}
              ></img>
              <div style={{ width: "400px" }}>
                <div style={{ fontWeight: 600 }}>{truncatedTitle}</div>
                <div dangerouslySetInnerHTML={{ __html: truncatedChildren }}></div>
              </div>
              <div style={{ color: "blue", fontSize: 30, fontWeight: 800 }}>
                {isRead == 1 ? "" : "*"}
              </div>
            </div>
          </a>
        ) : (
          <Link
            ref={ref}
            href={linkable ?? ""}
            className="block hover:bg-gray-50"
          >
            <div
              className="flex items-center space-x-4"
              style={{ borderBottom: "solid 0.5px" }}
            >
              <img
                src={"https://timviecits.id.vn/storage/notificationdefault.png"}
                style={{ width: 50, height: 50, margin: "20px" }}
              ></img>
              <div style={{ width: "400px" }}>
                <div style={{ fontWeight: 600 }}>{truncatedTitle}</div>
                <div>{truncatedChildren}</div>
              </div>
              <div style={{ color: "blue", fontSize: 30, fontWeight: 800 }}>
                {isRead == 1 ? "" : "*"}
              </div>
            </div>
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  );
});
ListNoti.displayName = "ListNoti";

export default ListNoti;
