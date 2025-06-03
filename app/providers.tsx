"use client"

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

const config = getDefaultConfig({
  appName: "EVM-7702 Aggregator",
  projectId: "YOUR_PROJECT_ID", // 需要替换为你的 WalletConnect Project ID
  chains: [mainnet, sepolia],
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
} 