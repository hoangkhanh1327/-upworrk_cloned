import React, { useContext, createContext, ReactNode } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext(null);
type StateContextProviderProps = {
    children: ReactNode;
  };
export const StateContextProvider = ({ children }:StateContextProviderProps) => {

  // const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  


  return (
    <StateContext.Provider
      value={{ 
        address,
        // contract,
        connect,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);