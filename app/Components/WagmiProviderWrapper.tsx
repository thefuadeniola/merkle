"use client"
import { ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { config } from "@/wagmi.config"


const queryClient = new QueryClient()

export function WagmiProviderWrapper({ children } : {children: ReactNode}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider >
                {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}