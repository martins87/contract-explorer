import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoParametersFunction from "./NoParametersFunction";
import WithParametersFunction from "./WithParametersFunction";

const Function = ({ contract, fragment }) => {
  const [value, setValue] = useState(null);
  const [returnType, setReturnType] = useState(null);

  useEffect(() => {
    let type = fragment.outputs[0].type;
    setReturnType(type);

    if (fragment.stateMutability === "view" && fragment.inputs.length === 0) {
      contract[fragment.name]().then((res) => {
        // Format value if type is uint8 or uint256
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
        marginTop: "16px",
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
      {fragment.inputs.length === 0 ? (
        <NoParametersFunction value={value} returnType={returnType} />
      ) : (
        <WithParametersFunction contract={contract} fragment={fragment} />
      )}
    </Box>
  );
};

export default Function;
