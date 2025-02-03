import { Button, Dialog, Stack } from "@mui/material";
import { connectToMetamask } from "../../services/wallets/metamask/metamaskClient";
import { openWalletConnectModal } from "../../services/wallets/walletconnect/walletConnectClient";
import Image from "next/image"; 

interface WalletSelectionDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose: (value: string) => void;
}

export const WalletSelectionDialog = ({ open, setOpen, onClose }: WalletSelectionDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <Stack p={2} gap={1}>
        {/* WalletConnect Button */}
        <Button
          variant="contained"
          onClick={() => {
            openWalletConnectModal();
            setOpen(false);
          }}
          sx={{
            backgroundColor: "#0a74da", // ✅ Custom background color
            color: "white",
            "&:hover": {
              backgroundColor: "#085aa3", // ✅ Darker shade on hover
            },
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Image src="/assets/walletconnect-logo.svg" alt="WalletConnect Logo" width={24} height={24} />
          WalletConnect
        </Button>

        {/* Metamask Button */}
        <Button
          variant="contained"
          onClick={() => {
            connectToMetamask();
          }}
          sx={{
            backgroundColor: "#f6851b", // ✅ Custom background color for Metamask
            color: "white",
            "&:hover": {
              backgroundColor: "#c75b0e", // ✅ Darker shade on hover
            },
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Image src="/assets/metamask-logo.svg" alt="Metamask Logo" width={24} height={24} />
          Metamask
        </Button>
      </Stack>
    </Dialog>
  );
};
