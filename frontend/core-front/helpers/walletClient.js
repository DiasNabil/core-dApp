import { createPublicClient, createWalletClient, http } from 'viem'
import { sepolia } from 'wagmi'

export const client = createWalletClient({
    chain: sepolia,
    transport: http()
  })

  export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  })