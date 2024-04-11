// import styles from "./page.module.css";
"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Navbar from "./components/Navbar";

export default function Home() {
  const [contractAddress, setContractAddress] = useState("");
  const [jsonContent, setJsonContent] = useState(null);

  const handleInputChange = (e) => setContractAddress(e.target.value);

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = (e) => {
      try {
        setJsonContent(JSON.parse(e.target.result));
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        // handle error here
      }
    };
  };

  const onLoadContract = () => {
    console.log("JSON object:", jsonContent);
    console.log("contract address:", contractAddress);
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
            <Box component="form">
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
            </Box>
            {/* render json content here */}
          </CardContent>
        </Card>
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <Button
            sx={{ background: "#0784c3", textTransform: "capitalize" }}
            variant="contained"
            component="label"
            onClick={onLoadContract}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </>
  );
}
