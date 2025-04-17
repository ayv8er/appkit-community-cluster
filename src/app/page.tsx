"use client";

import { useCallback, useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import ClaimModal from "@/components/ClaimModal";
import UserInfo from "@/components/UserInfo";

export default function Home() {
  const [clusterName, setClusterName] = useState<string | null>(null);
  const { isConnected, address } = useAccount();

  const fetchClusterName = useCallback(async () => {
    try {
      const response = await fetch(`https://api.clusters.xyz/v1/names/address/${address}?testnet=true`);
      const data = await response.json();
      if (!data.clusterName) return;
      setClusterName(data.clusterName);
    } catch (error) {
      console.error('Error fetching cluster name:', error);
    }
  }, [address]);
  
  useEffect(() => {
    fetchClusterName();
  }, [fetchClusterName]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <UserInfo clusterName={clusterName} />
      {isConnected && !clusterName && <ClaimModal setClusterName={setClusterName} />}
    </main>
  );
}