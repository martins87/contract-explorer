import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

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
          <Button sx={{ textTransform: "capitalize" }} variant="outlined">
            Connect wallet
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
