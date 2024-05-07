"use client";

import { createContext, useContext, useState } from "react";
import { menuData } from "../configs/menuData";

interface IAdminMenuContext {
  menu: string;
  setSelectedMenu: (key: string) => void;
}

export const MenuAdminContext = createContext<IAdminMenuContext>({
  menu: "users",
  setSelectedMenu: (key: string) => {},
});

const MenuAdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState(menuData[0].key);

  const setSelectedMenu = (key: string) => {
    setMenu(key);
  };

  return (
    <MenuAdminContext.Provider
      value={{
        menu,
        setSelectedMenu,
      }}
    >
      {children}
    </MenuAdminContext.Provider>
  );
};

export default MenuAdminProvider;

export const useAdminMenu = () => useContext(MenuAdminContext);
