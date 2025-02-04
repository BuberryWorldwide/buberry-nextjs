import { WalletConnectContext } from "../../../contexts/WalletConnectContext";
import { useCallback, useContext, useEffect } from "react";
import { WalletInterface } from "../walletInterface";
import { AccountId, ContractExecuteTransaction, ContractId, LedgerId, TokenAssociateTransaction, TokenId, Transaction, TransactionId, TransferTransaction, Client } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { appConfig } from "../../../config";
import { SignClientTypes } from "@walletconnect/types";
import { DAppConnector, HederaJsonRpcMethod, HederaSessionEvent, HederaChainId, SignAndExecuteTransactionParams, transactionToBase64String } from "@hashgraph/hedera-wallet-connect";
import EventEmitter from "events";

// ✅ Create a refresh event for WalletConnect state updates
const refreshEvent = new EventEmitter();

// ✅ Prevent SSR errors by ensuring `window` is accessed only in the client
const metadata: SignClientTypes.Metadata = {
  name: "Hedera CRA Template",
  description: "Hedera CRA Template",
  url: typeof window !== "undefined" ? window.location.origin : "", 
  icons: typeof window !== "undefined" ? [window.location.origin + "/logo192.png"] : [], 
};

// ✅ Define WalletConnect config
const walletConnectProjectId = "377d75bb6f86a2ffd427d032ff6ea7d3";
const currentNetworkConfig = appConfig.networks.testnet;
const hederaNetwork = currentNetworkConfig.network;
const hederaClient = Client.forName(hederaNetwork);

// ✅ Create a new DAppConnector instance for WalletConnect
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

// ✅ Final (Single) Declaration of `openWalletConnectModal`
export const openWalletConnectModal = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null; // ✅ Prevent SSR execution

  await initializeWalletConnect();
  await dappConnector.openModal();

  const signer = dappConnector.signers[0];
  return signer ? signer.getAccountId().toString() : null; // ✅ Return connected account
};

// ✅ WalletConnect Wallet Implementation
class WalletConnectWallet implements WalletInterface {
  private accountId() {
    return AccountId.fromString(dappConnector.signers[0].getAccountId().toString());
  }

  private async signAndExecuteTransaction(transaction: Transaction) {
    const params: SignAndExecuteTransactionParams = {
      signerAccountId: `::${this.accountId().toString()}`,
      transactionList: transactionToBase64String(transaction),
    };
    try {
      const result = await dappConnector.signAndExecuteTransaction(params);
      return result.result;
    } catch {
      return null;
    }
  }

  private freezeTx(transaction: Transaction) {
    const nodeAccountIds = hederaClient._network.getNodeAccountIdsForExecute();
    return transaction
      .setTransactionId(TransactionId.generate(this.accountId()))
      .setNodeAccountIds(nodeAccountIds)
      .freeze();
  }

  async transferHBAR(toAddress: AccountId, amount: number) {
    const tx = new TransferTransaction()
      .addHbarTransfer(this.accountId(), -amount)
      .addHbarTransfer(toAddress, amount);

    const frozenTx = this.freezeTx(tx);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async transferFungibleToken(toAddress: AccountId, tokenId: TokenId, amount: number) {
    const tx = new TransferTransaction()
      .addTokenTransfer(tokenId, this.accountId(), -amount)
      .addTokenTransfer(tokenId, toAddress.toString(), amount);

    const frozenTx = this.freezeTx(tx);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async transferNonFungibleToken(toAddress: AccountId, tokenId: TokenId, serialNumber: number) {
    const tx = new TransferTransaction()
      .addNftTransfer(tokenId, serialNumber, this.accountId(), toAddress);

    const frozenTx = this.freezeTx(tx);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async associateToken(tokenId: TokenId) {
    const tx = new TokenAssociateTransaction()
      .setAccountId(this.accountId())
      .setTokenIds([tokenId]);

    const frozenTx = this.freezeTx(tx);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async executeContractFunction(contractId: ContractId, functionName: string, functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, functionParameters.buildHAPIParams());

    const frozenTx = this.freezeTx(tx);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  disconnect() {
    dappConnector.disconnectAll().then(() => {
      refreshEvent.emit("sync");
    });
  }
}

export const walletConnectWallet = new WalletConnectWallet();

// ✅ Sync WalletConnect state with React Context
export const WalletConnectClient = () => {
  const { setAccountId, setIsConnected } = useContext(WalletConnectContext);

  const syncWithWalletConnectContext = useCallback(() => {
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
    refreshEvent.addListener("sync", syncWithWalletConnectContext);
    initializeWalletConnect().then(() => {
      syncWithWalletConnectContext();
    });

    return () => {
      refreshEvent.removeListener("sync", syncWithWalletConnectContext);
    };
  }, [syncWithWalletConnectContext]);

  return null;
};
