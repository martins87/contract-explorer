import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  return (
    <>
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
          <WalletConnect />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
