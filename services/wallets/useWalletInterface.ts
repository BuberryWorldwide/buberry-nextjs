import { useState, useEffect, useContext } from "react";
import { MetamaskContext } from "../../contexts/MetamaskContext";
import { WalletConnectContext } from "../../contexts/WalletConnectContext";
import { metamaskWallet } from "./metamask/metamaskClient";
import { walletConnectWallet } from "./walletconnect/walletConnectClient";

type WalletInterface = typeof metamaskWallet | typeof walletConnectWallet | null;

interface WalletData {
  accountId: string | null;
  walletInterface: WalletInterface;
}

// ✅ Ensure wallets only load on client
export const useWalletInterface = (): WalletData => {
  const metamaskCtx = useContext(MetamaskContext);
  const walletConnectCtx = useContext(WalletConnectContext);

  const [walletData, setWalletData] = useState<WalletData>({
    accountId: null,
    walletInterface: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (metamaskCtx?.metamaskAccountAddress) {
        setWalletData({
          accountId: metamaskCtx.metamaskAccountAddress || null, // ✅ Ensure accountId can be null
          walletInterface: metamaskWallet || null, // ✅ Ensure walletInterface can be null
        });
      } else if (walletConnectCtx?.accountId) {
        setWalletData({
          accountId: walletConnectCtx.accountId || null, // ✅ Ensure accountId can be null
          walletInterface: walletConnectWallet || null, // ✅ Ensure walletInterface can be null
        });
      }
    }
  }, [metamaskCtx?.metamaskAccountAddress, walletConnectCtx?.accountId]);

  return walletData;
};
