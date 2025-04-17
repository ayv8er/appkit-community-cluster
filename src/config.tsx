import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia } from '@reown/appkit/networks'
import { plumeMainnet, plumeSepolia } from 'viem/chains'
import type { Chain } from 'viem'

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [sepolia, plumeSepolia, plumeMainnet] as unknown as [Chain, ...Chain[]]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig