import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'wagmi'
import { faucetPrivateKey } from './faucet'

export const client = createWalletClient({
    chain: sepolia,
    transport: http()
  })

  export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  })


 export const ownerClient = createWalletClient({
  account: privateKeyToAccount(faucetPrivateKey),
  chain: sepolia,
  transport: http()

})

export function userClient (privateKey){

  const client = createWalletClient({
    account: privateKeyToAccount(privateKey),
    chain: sepolia,
    transport: http(),
  })

  return client 
}
