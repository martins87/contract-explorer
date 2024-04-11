import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const WalletConnect = () => {
  const [account, setAccount] = useState("");

  const connect = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        accountChangeHandler(res[0]);
      });
    } else {
      console.log("install metamask extension!!");
    }
  };

  const accountChangeHandler = (account) => setAccount(account);

  return (
    <>
      {account ? (
        <Box
          sx={{
            borderRadius: "4px",
            border: "1px solid #0784c3",
            height: "2rem",
            padding: "4px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#0784c3" }}>{account}</Typography>
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
    </>
  );
};

export default WalletConnect;
