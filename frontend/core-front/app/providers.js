'use client'
import { WagmiConfig, configureChains , createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { goerli , polygonMumbai , sepolia } from 'wagmi/chains'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'


const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID

const { chains, publicClient } = configureChains(
  [ sepolia ],
  [alchemyProvider({apiKey: alchemyApiKey})],
)


const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  connectors: [
    new MetaMaskConnector({chains}),
    new WalletConnectConnector({
      chains, 
      options: {
        projectId: projectID, 
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Wallet Browser',
        shimDisconnect: false
      },
    })
  ]
})


export function Providers({ children }) {

  return (
    <WagmiConfig config={wagmiConfig}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </WagmiConfig>
  )
}