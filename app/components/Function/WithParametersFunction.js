import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const WithParametersFunction = ({ fragment }) => {
  return (
    <Box sx={{ padding: "16px" }}>
      {fragment.inputs.map((input) => (
        <>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            {input.name}
          </Typography>
          <TextField
            sx={{
              borderRadius: "4px",
              marginBottom: "8px",
            }}
            key={input.name}
            id="outlined"
            variant="outlined"
            placeholder={`${input.name} (${input.type})`}
            value={null}
            onChange={null}
            fullWidth
          />
        </>
      ))}
      <Button
        sx={{
          background: "#F2F5F6",
          textTransform: "capitalize",
          color: "#000",
          marginTop: "12px",
          "&:hover": { backgroundColor: "#D3D4D5" },
        }}
        variant="contained"
        component="label"
        onClick={null}
        disabled={false}
      >
        Query
      </Button>
    </Box>
  );
};

export default WithParametersFunction;
