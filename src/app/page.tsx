"use client";

import { modal } from "../context";
import { useAccount } from 'wagmi';
import { ClusterDisplay } from "@/components/ClusterDisplay";

export default function Home() {
  const { isConnected, address } = useAccount();

  const handleOpenAppKit = () => {
    if (!modal) {
      console.error('Modal not initialized');
      return;
    }
    modal.open();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-2xl font-bold">Community Hub</h1>

      {!isConnected && (
        <p className="max-w-md text-center">
          Login via AppKit to claim your community name.
        </p>
      )}

      {isConnected && address && (
        <p className="text-sm font-mono">
          Connected: {address}
        </p>
      )}

      <button
        onClick={handleOpenAppKit}
        className="rounded-none px-4 py-2 bg-blue-900 text-white hover:bg-blue-950">
        {isConnected ? "Open AppKit Modal" : "Login"}
      </button>

      {isConnected ? <ClusterDisplay walletAddress={address} /> : null}
    </main>
  );
}