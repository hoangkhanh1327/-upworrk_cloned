"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { format } from "date-fns";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  const { user } = useAuth();
  console.log("user", user);

  return (
    <div
      className="span-3  ml-[100px] d-none d-lg-block the-sidebar flex flex-col justify-between h-full sticky top-0"
      style={{ background: "#f9f9f9", borderRadius: "10px" }}
    >
      <div className="p-4">
        <div className="text-center mb-4">
          {user?.avatar_url ? (
            <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden inline-block">
              <Image
                src={user?.avatar_url.toString()}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
          ) : (
            <CircleUserRound className="inline-block w-[150px] h-[150px]" />
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1">
            <div className="ml-3">
              <h2 className="font-medium text-gray-900 text-2xl">
                {user?.last_name} {user?.first_name}
              </h2>
              <p className="mb-2 text-base font-semibold">
                {user?.date_of_birth &&
                  format(user.date_of_birth, "dd/MM/yyyy")}
              </p>
              <p className="mb-2 text-sm font-medium text-gray-500">
                {user?.email || ""}
              </p>
              <p className="mb-2 text-base font-semibold">
                {user?.company_name || ""}
              </p>
              <p className="text-sm font-medium text-gray-500">
                {user?.intro || ""}
              </p>
            </div>
          </div>
        </div>
        {/* <div className='mt-2'>
                    <a
                        href='/'
                        className=' font-bold'
                        style={{
                            color: '#108a00',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Chỉnh sửa profile
                    </a>
                </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
