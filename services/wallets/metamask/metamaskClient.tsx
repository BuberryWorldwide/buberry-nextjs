import { ethers } from "ethers";

export const switchToHederaNetwork = async (ethereum: any) => {
  if (!ethereum) {
    console.error("Ethereum provider not found.");
    return;
  }

  try {
    // ✅ Check current network before switching
    const currentChainId = await ethereum.request({ method: "eth_chainId" });
    if (currentChainId === "0x128") {
      console.log("✅ Already on Hedera Testnet.");
      return;
    }

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x128" }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Hedera Testnet",
              chainId: "0x128",
              nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 18 },
              rpcUrls: ["https://testnet.hashio.io/api"],
            },
          ],
        });
      } catch (addError) {
        console.error("❌ Error adding Hedera network:", addError);
      }
    } else {
      console.error("❌ Error switching network:", error);
    }
  }
};

// ✅ Ensure `window` is accessed only on the client
export const getProvider = () => {
  if (typeof window === "undefined") {
    console.warn("⚠️ Metamask can only be accessed on the client.");
    return null;
  }

  const { ethereum } = window as any;
  if (!ethereum) {
    console.error("❌ Metamask is not installed!");
    return null;
  }

  return new ethers.providers.Web3Provider(ethereum);
};

// ✅ Improved Metamask Connection Function
export const connectToMetamask = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null; // ✅ Prevents SSR execution

  const provider = getProvider();
  if (!provider) return null; // ✅ Ensures provider is available

  let accounts: string[] = [];

  try {
    await switchToHederaNetwork((window as any).ethereum);
    accounts = await provider.send("eth_requestAccounts", []);
    console.log("✅ Connected Metamask Account:", accounts);
  } catch (error: any) {
    if (error.code === 4001) {
      console.warn("⚠️ User rejected the Metamask connection.");
    } else {
      console.error("❌ Metamask connection error:", error);
    }
  }

  return accounts.length > 0 ? accounts[0] : null; // ✅ Return first account only
};

// ✅ FIX: Properly define and export `MetaMaskWallet`
class MetaMaskWallet {
  async connect() {
    return await connectToMetamask();
  }
}

// ✅ FIX: Properly export instantiated `metamaskWallet`
export const metamaskWallet = new MetaMaskWallet();

// ✅ FIX: Properly export `MetaMaskClient` as a class
export class MetaMaskClient {
  static async connect() {
    return await connectToMetamask();
  }
}
