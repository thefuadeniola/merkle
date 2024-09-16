import { http } from "wagmi"
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from "@rainbow-me/rainbowkit"

export const config = getDefaultConfig({
  appName: 'Merkle',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID ?? '',
  chains: [mainnet, sepolia],
  transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
  },
  ssr: true
})
