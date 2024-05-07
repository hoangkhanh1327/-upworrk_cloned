"use client";

import Image from "next/image";
import AdminMenu from "./components/AdminMenu";
import MenuAdminProvider, {
  MenuAdminContext,
  useAdminMenu,
} from "./context/MenuContext";
import MenuPannel from "./components/MenuPannel";
import { menuData } from "./configs/menuData";
import AdminHeader from "./components/AdminHeader";

function Admin() {
  const { menu } = useAdminMenu();
  console.log(menu);

  return (
    <MenuAdminProvider>
      <div>
        <AdminHeader />
        <div className='h-16 pb-20'></div>
        <div className='max-w-[1600px] mx-auto px-10'>
          <div className='grid grid-cols-12 gap-x-4'>
            <div className='col-span-1'>
              <AdminMenu Menu={menuData} />
            </div>
            <div className='col-span-11'>
              <MenuPannel />
            </div>
          </div>
        </div>
      </div>
    </MenuAdminProvider>
  );
}

export default Admin;
