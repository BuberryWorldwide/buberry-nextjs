import { MetamaskContextProvider } from "../../contexts/MetamaskContext";
import { WalletConnectContextProvider } from "../../contexts/WalletConnectContext";
// ✅ Import it as a utility, not a JSX component
import { MetaMaskClient } from "../wallets/metamask/metamaskClient";
import { WalletConnectClient } from "../wallets/walletconnect/walletConnectClient";

export const AllWalletsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MetamaskContextProvider>
      <WalletConnectContextProvider>
        {/* ❌ REMOVE MetaMaskClient from JSX */}
        <WalletConnectClient />
        {children}
      </WalletConnectContextProvider>
    </MetamaskContextProvider>
  );
};
