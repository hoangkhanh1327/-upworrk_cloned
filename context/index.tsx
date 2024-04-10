import React, { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext<{
  address: string | null;
  connect: () => void;
}>({
  address: null,
  connect: () => {},
});
type StateContextProviderProps = {
  children: ReactNode;
};
export const StateContextProvider = ({
  children,
}: StateContextProviderProps) => {

  const address = useAddress();
  const connect = useMetamask();
  const addressValue = typeof address !== 'undefined' ? address : null;
  return (
    <StateContext.Provider
      value={{
        address: addressValue,
        connect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
