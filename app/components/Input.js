import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Input = ({ label, placeholder, value, handleOnChange, errorMessage }) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
        {label}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        fullWidth
      />
      {errorMessage?.length !== 0 && (
        <Typography variant="body2" sx={{ color: "#B42D35", marginY: "4px" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Input;
