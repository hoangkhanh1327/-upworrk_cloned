import * as React from "react";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/app/components/ui/navigation-menu";

const ListNoti = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title,isRead, children, ...props }, ref) => {
  return (
    // <li>
    //   <NavigationMenuLink asChild>
    //     <a
    //       ref={ref}

    //       {...props}
    //     >
    //       1111
    //     </a>
    //   </NavigationMenuLink>
    // </li>
    <li  className="pt-7 p-2" style={{height:90,maxHeight:90}}>
      <NavigationMenuLink asChild>
        <a ref={ref} {...props} className="block hover:bg-gray-50">
          <div className="flex items-center space-x-4" style={{borderBottom:"solid 0.5px"}}>
            {/* Thêm biểu tượng thông báo ở đây nếu bạn muốn */}
                      {/* <div style={{width:"20%"}}>aaa</div> */}
                      <img src={"https://timviecits.id.vn/storage/notificationdefault.png"} style={{width:50, height:50, margin:'20px'}}></img>
                      <div style={{width:'400px'}}>
                          <div style={{fontWeight:600}}>
                              {title}
                          </div>
                          <div>{children}</div>
                      </div>
                      <div style={{color:"blue", fontSize:30, fontWeight:800}}>
                          {isRead==1?'':"*"}
                      </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListNoti.displayName = "ListNoti";

export default ListNoti;
