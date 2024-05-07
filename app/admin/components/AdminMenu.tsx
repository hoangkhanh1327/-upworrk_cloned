"use client";

import { Menu } from "@/app/(protected)/profile/configs/menuData";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAdminMenu } from "../context/MenuContext";

interface AdminMenuProps {
  Menu: Menu[];
}

function AdminMenu({ Menu }: AdminMenuProps) {
  const { menu, setSelectedMenu } = useAdminMenu();

  return (
    <aside>
      <div className='mt-4'>
        <ul className='relative p-0 m-0 mb-2 list-none block'>
          {Menu.map((menuItem, index) => {
            return (
              <li key={`menu-${index}`} className='border-none'>
                <span
                  className={cn(
                    'm-0 bg-white leading-none relative flex items-center gap-3 text-base tracking-[0.02em] no-underline cursor-pointer py-3 pl-3 before:content-[""] before:rounded-[2px] before:absolute before:top-0 before:left-[2px] before:h-full before:w-[2px] transition-all',
                    menu !== menuItem.key
                      ? "text-black"
                      : "text-primary-color before:top-1 before:h-[calc(100%_-_8px)] before:bg-primary-color"
                  )}
                  onClick={() => {
                    setSelectedMenu(menuItem.key);
                  }}
                >
                  {menuItem.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
export default AdminMenu;
