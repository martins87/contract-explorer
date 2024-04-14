"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Contract, getDefaultProvider } from "ethers";

import Navbar from "./components/Navbar";
import Function from "./components/Function";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractAbi, setContractAbi] = useState(null);
  const [contract, setContract] = useState(null);
  const [functions, setFunctions] = useState([]);

  const handleInputChange = (e) => setContractAddress(e.target.value);

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    setFileName(e.target.files[0].name);

    fileReader.onload = (e) => {
      try {
        setContractAbi(JSON.parse(e.target.result));
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        // handle error here
      }
    };
  };

  const onLoadContract = async () => {
    let provider = getDefaultProvider(
      "https://mainnet.infura.io/v3/88651f31c40747fe99468a85a1abcc26"
    );
    let instance = new Contract(contractAddress, contractAbi, provider);
    setContract(instance);

    let fragments = instance.interface.fragments;
    setFunctions(fragments.filter((f) => f.type === "function"));
  };

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "3rem" }} maxWidth="md">
        <Box sx={{ margin: "1rem 0", textAlign: "center" }}>
          <Typography variant="h6">Load Contract</Typography>
        </Box>
        <Card>
          <CardContent>
            <Box>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Please enter the Contract Address
              </Typography>
              <TextField
                id="outlined"
                variant="outlined"
                placeholder="0x..."
                value={contractAddress}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "2rem" }}>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Verify & Publish Contract Source Code Upload JSON ABI File
              </Typography>
              <Button
                sx={{ background: "#0784c3", textTransform: "capitalize" }}
                variant="contained"
                component="label"
              >
                Browse
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                  accept="json"
                />
              </Button>
              {fileName && (
                <Typography
                  variant="body1"
                  sx={{ marginLeft: "8px", display: "inline" }}
                >
                  {fileName}
                </Typography>
              )}
            </Box>
            {functions.length !== 0 &&
              functions.map((f) => (
                <Function
                  key={"0x" + f.name}
                  contract={contract}
                  fragment={f}
                />
              ))}
          </CardContent>
        </Card>
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <Button
            sx={{ background: "#0784C3", textTransform: "capitalize" }}
            variant="contained"
            component="label"
            onClick={onLoadContract}
            disabled={contractAddress === "" && contractAbi === null}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </>
  );
}
