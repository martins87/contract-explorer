import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ background: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined">Connect wallet</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
