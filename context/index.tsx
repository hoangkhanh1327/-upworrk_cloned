import React, { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext({
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

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
