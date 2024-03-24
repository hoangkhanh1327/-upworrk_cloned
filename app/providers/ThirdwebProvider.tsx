"use client";

import { StateContextProvider } from "@/context";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const AppThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  const activeChain = "sepolia";
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <StateContextProvider>{children}</StateContextProvider>
    </ThirdwebProvider>
  );
};

export default AppThirdwebProvider;