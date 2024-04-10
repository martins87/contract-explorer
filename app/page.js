// import styles from "./page.module.css";

import Container from "@mui/material/Container";

export default function Home() {
  return (
    <Container sx={{ marginTop: 10 }} maxWidth="lg">
      <div>Upload JSON ABI File</div>
      <div>Contract Address</div>
    </Container>
  );
}
