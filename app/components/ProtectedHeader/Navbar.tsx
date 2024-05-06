"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { Icons } from "@/app/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import ListItem from "./ListItem";
import Cookies from "js-cookie";
import { NotificationContext } from "@/app/providers/NotificationProvider";
import { FiBell } from "react-icons/fi";
import { findTalentSubMenu, findWorkSubMenu } from "./menuData";
import ListNoti from "./ListNoti";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AuthContext } from "@/app/providers/AuthProvider";

const Navbar = () => {
  const { notifications } = useContext(NotificationContext);
  const [noties, setNoties] = useState<any>([]);

  const [unread, setUnread] = useState<number>(0);
  const [statusNoti, setStatusNoti] = useState<any>(0);
  const accountType = Cookies.get("account_type");
  let menuRule = "";
  if (accountType === "client") {
    menuRule = "/client";
  } else if (accountType === "freelancer") {
    menuRule = "/freelancer";
  }

  useEffect(() => {
    if (notifications) {
      setNoties(notifications);
      setUnread(0);
      notifications.map((i: any) => {
        console.log("TS READ:", i.is_read);

        if (i.is_read == 0) {
          setUnread((pre) => pre + 1);
        }
      });
    }
  }, [notifications]);

  const bellElement = React.useMemo(() => {
    return (
      <div style={{ position: "relative" }}>
        <FiBell size={24} /> {/* Notification icon */}
        {noties && noties.filter((i: any) => i.is_read == 0).length > 0 && (
          <span
            className="text-xs w-5 h-5 absolute flex items-center justify-center"
            style={{
              top: "-8px",
              right: "-8px",
              borderRadius: "50%",
              background: "red",
              color: "white",
            }}
          >
            {unread} {/* {noties.length} Number of notifications */}
          </span>
        )}
      </div>
    );
  }, [noties]);

  return (
    <NavigationMenu className="tww-full">
      <NavigationMenuList>
        <NavigationMenuItem key={`navigation-item-1`}>
          <NavigationMenuTrigger>Công việc</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="min-w-[250px]">
              {findTalentSubMenu.map((menu, index) => (
                <ListItem
                  key={`find-talent-menu-${index}`}
                  href={`${menuRule}${menu.href}`}
                  title={menu.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem key={`navigation-item-2`}>
          <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
          <NavigationMenuContent className="pt-4 pb-8">
            <ul className="min-w-[250px]">
              {findWorkSubMenu.map((menu, index) => (
                <ListItem
                  key={`find-talent-2-menu-${index}`}
                  title={menu.title}
                  href={menu.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem key={`navigation-item-3`}>
          <Link href="/docs/why-us" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Why Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem key={`navigation-item-4`}>
          <NavigationMenuTrigger>{bellElement}</NavigationMenuTrigger>
          <NavigationMenuContent className="pt-4">
            <div className="overflow-y-auto h-[40vh] max-h-[40vh] p-4 z-50 fixed bg-white shadow-lg rounded-lg">
              <Label className="text-lg font-semibold mb-3">Thông Báo</Label>
              <Tabs defaultValue="un-read" className="w-full mt-3">
                <TabsList className="grid grid-cols-2 gap-x-2">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="un-read">Chưa đọc</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  {notifications.map((noti: any) => {
                    if (statusNoti == 0) {
                      return (
                        <ListNoti
                          key={`${noti.title}-${noti.id}-${noti.is_read}`}
                          title={noti.title}
                          linkable={noti.linkable}
                          isRead={noti.is_read}
                          idNoti={noti.id}
                          image={noti.image}
                        >
                          {noti.message}
                        </ListNoti>
                      );
                    } else {
                      if (noti.is_read == 0) {
                        return (
                          <ListNoti
                            key={`${noti.title}-${noti.id}-${noti.is_read}`}
                            title={noti.title}
                            linkable={noti.linkable}
                            isRead={noti.is_read}
                            idNoti={noti.id}
                            image={noti.image}
                          >
                            {noti.message}
                          </ListNoti>
                        );
                        return <></>;
                      }
                    }
                  })}
                </TabsContent>
                <TabsContent value="un-read">
                  {notifications.map((noti: any) => {
                    if (noti.is_read == 0) {
                      return (
                        <ListNoti
                          key={`${noti.title}-${noti.id}-${noti.is_read}`}
                          title={noti.title}
                          linkable={noti.linkable}
                          isRead={noti.is_read}
                          idNoti={noti.id}
                          image={noti.image}
                        >
                          {noti.message}
                        </ListNoti>
                      );
                    }
                  })}
                </TabsContent>
              </Tabs>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
