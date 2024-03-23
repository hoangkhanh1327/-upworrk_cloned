"use client";

import { StateContextProvider } from "@/context";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const AppThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebProvider>
      <StateContextProvider>{children}</StateContextProvider>
    </ThirdwebProvider>
  );
};

export default AppThirdwebProvider;
