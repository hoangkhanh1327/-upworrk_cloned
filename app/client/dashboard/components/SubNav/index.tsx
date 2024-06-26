"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubNav = () => {
  const pathname = usePathname();

  return (
    <div className='relative after:content-[""] after:block after:bg-[#d5e0d5] after:w-full after:h-[2px] after:rounded-[6px]'>
      <nav className="block">
        <ul className="relative top-[2px] flex overflow-y-hidden overflow-x-auto scrollbar scrollbar-w-[0px] gap-x-6 p-0 m-0 list-none">
          <li
            className={cn(
              "mb-0 list-item",
              pathname === "/client/dashboard"
                ? "text-[#108a00] bg-white border-0"
                : ""
            )}
          >
            <Link href={`/client/dashboard`}>
              <span
                className={cn(
                  "block h-full",
                  pathname === "/client/dashboard"
                    ? 'bg-white text-[#108a00] after:content-[""] after:block after:bg-[#108a00] after:w-full after:h-[2px] after:rounded-[6px]'
                    : ""
                )}
              >
                Tất cả những công việc
              </span>
            </Link>
          </li>
          <li
            className={cn(
              "mb-0 list-item",
              pathname === "/client/allcontract"
                ? "text-[#108a00] bg-white border-0"
                : ""
            )}
          >
            <Link href={`/client/allcontract`}>
              <span
                className={cn(
                  "block h-full",
                  pathname === "/client/allcontract"
                    ? 'bg-white text-[#108a00] after:content-[""] after:block after:bg-[#108a00] after:w-full after:h-[2px] after:rounded-[6px]'
                    : ""
                )}
              >
                All contracts
              </span>
            </Link>
          </li>
          <li
            className={cn(
              "mb-0 list-item",
              pathname === "/client/invite-freelancer"
                ? "text-[#108a00] bg-white border-0"
                : ""
            )}
          >
            <Link href={`/client/invite-freelancer`}>
              <span
                className={cn(
                  "block h-full",
                  pathname === "/client/invite-freelancer"
                    ? 'bg-white text-[#108a00] after:content-[""] after:block after:bg-[#108a00] after:w-full after:h-[2px] after:rounded-[6px]'
                    : ""
                )}
              >
                Danh sách freelancer đề xuất
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SubNav;
