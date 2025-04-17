import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

export default function UserInfo({ clusterName }: { clusterName: string | null }) {
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();

  const handleOpenAppKit = () => {
    open();
  };

  return (
    <>
      <span 
        onClick={() => window.open("https://testnet.clusters.xyz/community/plume")}
        className="hover:cursor-pointer"
      >
        <h1 className="text-2xl font-bold">Plume Community Hub</h1>
      </span>
      {isConnected ? (
        <p className="text-sm font-mono">
          Connected: {address}
          {clusterName && (
            <>
              <br />
              <span
                onClick={() => window.open(`https://testnet.clusters.xyz/${clusterName}`)}
                className="hover:cursor-pointer"
              >
                Community Name: {clusterName}
              </span>
            </>
          )}
        </p>
      ) : (
        <p className="max-w-md text-center">
          Login via AppKit to claim your community name.
        </p>
      )}
      <button
        onClick={handleOpenAppKit}
        className="rounded-none px-4 py-2 bg-blue-900 text-white hover:bg-blue-950">
          {isConnected ? "Open AppKit Modal" : "Login"}
      </button>
    </>
  )
}