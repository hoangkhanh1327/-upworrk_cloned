import React from "react";
import { useAdminMenu } from "../context/MenuContext";
import { menuData } from "../configs/menuData";
import Userlist from "./Userlist";

function MenuPannel() {
  const { menu } = useAdminMenu();
  const selectedMenu = menuData.find((i) => i.key === menu);
  console.log("Menu ", menu);
  return (
    <div className='p-4'>
      <h3 className='mb-2 text-[28px] leading-8 tracking-[0.2px] font-medium pb-2'>
        {selectedMenu?.title || ""}
      </h3>
      <p className='mb-2 text-base leading-[22px] pt-2 pb-4'>
        {selectedMenu?.description || ""}
      </p>
      {selectedMenu?.key === menuData[0].key && <Userlist type='freelancer' />}
      {selectedMenu?.key === menuData[1].key && <Userlist type='client' />}
    </div>
  );
}

export default MenuPannel;
