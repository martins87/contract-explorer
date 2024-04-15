"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Contract, getDefaultProvider } from "ethers";
import eth_address from "ethereum-address";

import { useContract } from "./store/contract";
import Input from "./components/Input";

export default function Home() {
  const provider = getDefaultProvider(
    "https://mainnet.infura.io/v3/88651f31c40747fe99468a85a1abcc26"
  );
  const [fileName, setFileName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractAbi, setContractAbi] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [abiError, setAbiError] = useState("");
  const router = useRouter();
  const { setInstance, setAddress, setAbi } = useContract();

  const handleInputChange = (e) => {
    setContractAddress(e.target.value);

    if (eth_address.isAddress(e.target.value)) {
      setAddressError("");
      setAddress(e.target.value);
    } else {
      setAddressError("Invalid ETH address");
    }
  };

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    setFileName(e.target.files[0].name);

    fileReader.onload = (e) => {
      try {
        setContractAbi(JSON.parse(e.target.result));
        setAbi(JSON.parse(e.target.result));
        setAbiError("");
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        setAbiError("Invalid JSON file");
        setAbi(null);
      }
    };
  };

  const onLoadContract = async () => {
    let instance = new Contract(contractAddress, contractAbi, provider);
    setInstance(instance);

    router.push(`/contract/${contractAddress}`);
  };

  return (
    <Fragment>
      <Container sx={{ marginTop: "44px" }} maxWidth="md">
        <Box sx={{ margin: "16px 0", textAlign: "center" }}>
          <Typography variant="h6">Load Contract</Typography>
        </Box>
        <Card>
          <CardContent>
            <Input
              label="Please enter the Contract Address"
              placeholder="0x..."
              value={contractAddress}
              handleOnChange={handleInputChange}
              errorMessage={addressError}
            />
            <Box sx={{ marginTop: "32px" }}>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Verify & Publish Contract Source Code Upload JSON ABI File
              </Typography>
              <Box>
                <Button
                  sx={{ background: "#0784C3", textTransform: "capitalize" }}
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
                    sx={{ display: "inline", marginLeft: "8px" }}
                    variant="body1"
                  >
                    {fileName}
                  </Typography>
                )}
              </Box>
            </Box>
            {abiError.length !== 0 && (
              <Typography
                variant="body2"
                sx={{ color: "#B42D35", marginTop: "4px" }}
              >
                {abiError}
              </Typography>
            )}
          </CardContent>
        </Card>
        <Box
          sx={{
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          <Button
            sx={{ background: "#0784C3", textTransform: "capitalize" }}
            variant="contained"
            component="label"
            onClick={onLoadContract}
            disabled={
              contractAddress.length === 0 ||
              contractAbi === null ||
              addressError.length !== 0 ||
              abiError.length !== 0
            }
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
}
