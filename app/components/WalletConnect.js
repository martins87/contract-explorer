import { Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSDK } from "@metamask/sdk-react";

const WalletConnect = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  const shortAddress = () => {
    return (
      account.substring(0, 7) + "..." + account.substring(account.length - 5)
    );
  };

  return (
    <Fragment>
      {account ? (
        <Box display={"flex"} gap={1}>
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid #8CBAE8",
              height: "24px",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#0784C3" }}>{shortAddress()}</Typography>
          </Box>
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid #8CBAE8",
              width: "40px",
              height: "40px",
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "#EEF4FC",
              },
            }}
            onClick={disconnect}
          >
            <LogoutIcon color="primary" />
          </Box>
        </Box>
      ) : (
        <Button
          sx={{ textTransform: "capitalize" }}
          variant="outlined"
          onClick={connect}
        >
          Connect wallet
        </Button>
      )}
    </Fragment>
  );
};

export default WalletConnect;
