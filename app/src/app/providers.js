'use client'

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, sepolia} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig ({
  appName: "Web3 Wheels",
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "",
  chains: [mainnet, polygon, sepolia],
});

const Web3Providers = ({children}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "Web3 Wheels",
            learnMoreUrl: "https://github.com/ZhectorSM/web3-wheels-app"
          }}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Providers;