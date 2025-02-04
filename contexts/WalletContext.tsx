"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../src/supabase/client"; 
import { useRouter } from "next/navigation";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";
import { openWalletConnectModal } from "../services/wallets/walletconnect/walletConnectClient";
import { walletConnectWallet } from "../services/wallets/walletconnect/walletConnectClient";

interface WalletContextProps {
  accountId: string | null;
  setAccountId: (account: string | null) => void; // ✅ Ensure setAccountId is included
  connectMetamask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAccount = localStorage.getItem("hedera-wallet");
      
      // ✅ Prevent re-setting state if already set
      if (savedAccount && savedAccount !== accountId) {
        setAccountId(savedAccount);
      }
    }
  }, []); // ✅ Empty array ensures this runs only once
  

  const connectMetamask = async () => {
    console.log("🔄 Attempting Metamask connection...");
    try {
      const account = await connectToMetamask();
      console.log("✅ Metamask Account:", account);

      if (account) {
        setAccountId(account);
        localStorage.setItem("hedera-wallet", account);
      } else {
        console.error("❌ No account received from Metamask.");
      }
    } catch (error) {
      console.error("❌ Metamask connection failed:", error);
    }
  };

  const connectWalletConnect = async () => {
    console.log("🔄 Attempting WalletConnect connection...");
    try {
      const account = await openWalletConnectModal();
      console.log("✅ WalletConnect Account:", account);

      if (account) {
        setAccountId(account);
        localStorage.setItem("hedera-wallet", account);
      } else {
        console.error("❌ No valid account received from WalletConnect.");
      }
    } catch (error) {
      console.error("❌ WalletConnect connection failed:", error);
    }
  };

  const handleLogout = async () => {
    console.log("🔄 Logging out...");
  
    try {
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        throw error;
      }
  
      console.log("✅ Successfully logged out.");
      
      // ✅ Clear wallet state
      localStorage.removeItem("hedera-wallet");
      setAccountId(null); // ✅ Remove wallet on logout
  
      setTimeout(() => {
        router.push("/join-the-movement");
      }, 100);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Logout error:", error.message);
      } else {
        console.error("❌ Logout error:", error);
      }
    }
  };
  
  
  

  return (
    <WalletContext.Provider value={{ accountId, setAccountId, connectMetamask, connectWalletConnect, handleLogout }}>
      {children}
    </WalletContext.Provider>
  );
};

// ✅ Ensure `useWallet` is properly exported
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
