'use client';

import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';

const AppThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
    return <ThirdwebProvider>{children}</ThirdwebProvider>;
};

export default AppThirdwebProvider;
