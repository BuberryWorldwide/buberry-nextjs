"use client";

import { useEffect, useCallback, useState, useContext } from "react";
import { WalletConnectContext } from "../../../contexts/WalletConnectContext";
import { createClient, Session } from "@supabase/supabase-js";
import {
  AccountId,
  ContractExecuteTransaction,
  ContractId,
  LedgerId,
  TokenAssociateTransaction,
  TokenId,
  Transaction,
  TransactionId,
  TransferTransaction,
  Client,
} from "@hashgraph/sdk";
import {
  DAppConnector,
  HederaJsonRpcMethod,
  HederaSessionEvent,
  HederaChainId,
  SignAndExecuteTransactionParams,
  transactionToBase64String,
} from "@hashgraph/hedera-wallet-connect";
import EventEmitter from "events";
import { appConfig } from "../../../config";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";

// ✅ Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// ✅ Create an event emitter for WalletConnect state updates
const refreshEvent = new EventEmitter();

// ✅ Prevent SSR errors by ensuring `window` is accessed only in the client
const metadata = {
  name: "Buberry Hedera Wallet",
  description: "Seamless Web3 transactions with Buberry",
  url: typeof window !== "undefined" ? window.location.origin : "",
  icons: typeof window !== "undefined" ? [window.location.origin + "/logo192.png"] : [],
};

// ✅ Define WalletConnect Config
const walletConnectProjectId = "377d75bb6f86a2ffd427d032ff6ea7d3";
const hederaNetwork = appConfig.networks.testnet.network;
const hederaClient = Client.forName(hederaNetwork);

// ✅ Create a single DAppConnector instance for WalletConnect
const dappConnector = new DAppConnector(
  metadata,
  LedgerId.fromString(hederaNetwork),
  walletConnectProjectId,
  Object.values(HederaJsonRpcMethod),
  [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
  [HederaChainId.Testnet]
);

// ✅ Ensure WalletConnect is initialized only once
let walletConnectInitPromise: Promise<void> | undefined = undefined;
const initializeWalletConnect = async () => {
  if (!walletConnectInitPromise) {
    walletConnectInitPromise = dappConnector.init();
  }
  await walletConnectInitPromise;
};

// ✅ Open WalletConnect Modal and return the connected account
export const openWalletConnectModal = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  await initializeWalletConnect();
  await dappConnector.openModal();

  const signer = dappConnector.signers[0];
  return signer ? signer.getAccountId().toString() : null;
};

// ✅ WalletConnect Wallet Implementation
class WalletConnectWallet {
  private getAccountId(): AccountId {
    return AccountId.fromString(dappConnector.signers[0].getAccountId().toString());
  }

  private async signAndExecuteTransaction(transaction: Transaction) {
    const params: SignAndExecuteTransactionParams = {
      signerAccountId: `::${this.getAccountId().toString()}`,
      transactionList: transactionToBase64String(transaction),
    };
    try {
      const result = await dappConnector.signAndExecuteTransaction(params);
      return result.result;
    } catch (error) {
      console.error("Transaction signing error:", error);
      return null;
    }
  }

  private freezeTransaction(transaction: Transaction) {
    return transaction
      .setTransactionId(TransactionId.generate(this.getAccountId()))
      .setNodeAccountIds(hederaClient._network.getNodeAccountIdsForExecute())
      .freeze();
  }

  async transferHBAR(toAddress: AccountId, amount: number) {
    const tx = new TransferTransaction()
      .addHbarTransfer(this.getAccountId(), -amount)
      .addHbarTransfer(toAddress, amount);

    return await this.signAndExecuteTransaction(this.freezeTransaction(tx));
  }

  async transferToken(toAddress: AccountId, tokenId: TokenId, amount: number) {
    const tx = new TransferTransaction()
      .addTokenTransfer(tokenId, this.getAccountId(), -amount)
      .addTokenTransfer(tokenId, toAddress.toString(), amount);

    return await this.signAndExecuteTransaction(this.freezeTransaction(tx));
  }

  async transferNFT(toAddress: AccountId, tokenId: TokenId, serialNumber: number) {
    const tx = new TransferTransaction()
      .addNftTransfer(tokenId, serialNumber, this.getAccountId(), toAddress);

    return await this.signAndExecuteTransaction(this.freezeTransaction(tx));
  }

  async associateToken(tokenId: TokenId) {
    const tx = new TokenAssociateTransaction()
      .setAccountId(this.getAccountId())
      .setTokenIds([tokenId]);

    return await this.signAndExecuteTransaction(this.freezeTransaction(tx));
  }

  async executeContract(contractId: ContractId, functionName: string, params: ContractFunctionParameterBuilder, gasLimit: number) {
    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, params.buildHAPIParams());

    return await this.signAndExecuteTransaction(this.freezeTransaction(tx));
  }

  async disconnect() {
    try {
      await dappConnector.disconnectAll();
      await supabase.auth.signOut(); // ✅ Ensure user is logged out of Supabase as well
      refreshEvent.emit("sync");
    } catch (error) {
      console.error("Error disconnecting WalletConnect:", error);
    }
  }
}

export const walletConnectWallet = new WalletConnectWallet();

// ✅ Sync WalletConnect with React Context & Supabase
export const WalletConnectClient = () => {
  const { setAccountId, setIsConnected } = useContext(WalletConnectContext);
  const [session, setSession] = useState<Session | null>(null);

  const syncWithWalletConnect = useCallback(() => {
    const accountId = dappConnector.signers[0]?.getAccountId()?.toString();
    if (accountId) {
      setAccountId(accountId);
      setIsConnected(true);
    } else {
      setAccountId("");
      setIsConnected(false);
    }
  }, [setAccountId, setIsConnected]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession((prev) => (prev?.access_token !== data?.session?.access_token ? data?.session : prev));
    };

    checkAuth();

    // ✅ Listen for both WalletConnect & Supabase authentication changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      refreshEvent.emit("sync");
    });

    refreshEvent.addListener("sync", syncWithWalletConnect);
    initializeWalletConnect().then(syncWithWalletConnect);

    return () => {
      refreshEvent.removeListener("sync", syncWithWalletConnect);
      authListener.subscription.unsubscribe();
    };
  }, [syncWithWalletConnect]);

  return null;
};
