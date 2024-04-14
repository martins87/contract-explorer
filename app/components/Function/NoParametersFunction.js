import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ReadFunction = ({ value, returnType }) => {
  return (
    <Box
      sx={{
        padding: "8px",
        display: "flex",
        gap: "4px",
      }}
    >
      <Typography>{value}</Typography>
      <Typography
        sx={{
          color: "#808080",
          fontStyle: "italic",
        }}
      >
        {returnType}
      </Typography>
    </Box>
  );
};

export default ReadFunction;
