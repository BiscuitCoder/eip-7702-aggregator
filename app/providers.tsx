"use client"

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { bsc,mainnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

const config = getDefaultConfig({
  appName: "EVM-7702 Aggregator",
  projectId: process.env.NEXT_PUBLIC_WALLET_PROJECT_ID as string, // Replace with your WalletConnect Project ID
  chains: [bsc, mainnet],
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