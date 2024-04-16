"use client";

import { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { MetaMaskProvider } from "@metamask/sdk-react";

import WalletConnect from "./WalletConnect";

const Navbar = () => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };

  return (
    <Fragment>
      <AppBar
        sx={{
          background: "#fff",
          border: "1px solid #E9ECEF",
          borderTop: 0,
          borderLeft: 0,
          borderRight0: 0,
        }}
        position="static"
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <WalletConnect />
          </MetaMaskProvider>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
