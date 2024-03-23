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
                Best Matches
              </span>
            </Link>
          </li>
          <li
            className={cn(
              "mb-0 list-item",
              pathname === "/client/contract"
                ? "text-[#108a00] bg-white border-0"
                : ""
            )}
          >
            <Link href={`/client/contract`}>
              <span
                className={cn(
                  "block h-full",
                  pathname === "/client/contract"
                    ? 'bg-white text-[#108a00] after:content-[""] after:block after:bg-[#108a00] after:w-full after:h-[2px] after:rounded-[6px]'
                    : ""
                )}
              >
                Most Recent
              </span>
            </Link>
          </li>
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
                Saved Jobs
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SubNav;
