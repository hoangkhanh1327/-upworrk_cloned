import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AdminHeader() {
  const router = useRouter();

  return (
    <div
      className='fixed top-0 left-0 right-0 bg-white z-50 shadow-xl cursor-pointer'
      onClick={() => {
        router.replace("/admin");
      }}
    >
      <header className='container flex items-center justify-center'>
        <div className='h-16 flex items-center'>
          <Image alt='logo' src={"/images/logo.png"} width={82} height={22.5} />
          <span style={{ color: "#56b5c5" }} className='pl-2 font-bold'>
            Admin
          </span>
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;
