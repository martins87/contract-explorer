import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Function = ({ contract, fragment }) => {
  const [value, setValue] = useState(null);
  const [returnType, setReturnType] = useState(null);

  useEffect(() => {
    if (fragment.stateMutability === "view" && fragment.inputs.length === 0) {
      console.log("function:", fragment.name);
      console.log("fragment.outputs[0]", fragment.outputs[0]);

      let type = fragment.outputs[0].type;
      setReturnType(type);

      contract[fragment.name]().then((res) => {
        console.log("return value:", res);

        // format value if type is uint8 or uint256
        if (type === "uint8" || type === "uint256") {
          setValue(Number(res));
        } else {
          setValue(res);
        }
      });
    }
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid #E9ECEF",
        borderRadius: "8px",
        marginTop: "4px",
      }}
    >
      <Box
        sx={{
          background: "#F2F5F6",
          padding: "8px",
          border: "1px solid #E9ECEF",
          borderLeft: 0,
          borderRight: 0,
          borderTop: 0,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography>{fragment.name}</Typography>
      </Box>
      {fragment.stateMutability === "view" && (
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
      )}
    </Box>
  );
};

export default Function;
