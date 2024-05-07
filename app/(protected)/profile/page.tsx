"use client";
import { menuData } from "../profile/configs/menuData";
import MenuPannel from "./components/MenuPannel";
import DialogProvider from "./components/Providers/DialogProviders";
import SideMenu from "./components/SideMenu";
import ProfileProvider from "./context/ProfileContext";

const ProfilePage = () => {
  return (
    <ProfileProvider>
      <div className='grid grid-cols-5 gap-x-8'>
        <div>
          <SideMenu Menu={menuData} />
        </div>
        <div className='col-span-4'>
          <MenuPannel />
        </div>
      </div>
      <DialogProvider />
    </ProfileProvider>
  );
};

export default ProfilePage;
