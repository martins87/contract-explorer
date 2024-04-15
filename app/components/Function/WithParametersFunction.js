import { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const WithParametersFunction = ({ contract, fragment }) => {
  const [parameters, setParameters] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let paramsArr = [];

    fragment.inputs.map((input) => {
      let paramObj = { ...input, value: "" };
      paramsArr.push(paramObj);
    });

    setParameters(paramsArr);
  }, []);

  const handleInputChange = (e, paramName) => {
    let paramsArr = [];

    parameters.map((parameter) => {
      let paramObj = parameter;

      if (parameter.name === paramName) {
        paramObj = { ...parameter, value: e.target.value };
      }

      paramsArr.push(paramObj);
    });

    setParameters(paramsArr);
  };

  const handleQuery = () => {
    let params = [];
    parameters.map((p) => params.push(p.value));

    let type = fragment.outputs[0].type;
    contract[fragment.name](...params).then((res) => {
      if (type === "uint8" || type === "uint256") {
        setResponse(Number(res));
      } else {
        setResponse(res);
      }
    });
  };

  return (
    <Box sx={{ padding: "16px" }}>
      {fragment.inputs.map((input) => (
        <Fragment key={input.name}>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            {input.name}
          </Typography>
          <TextField
            sx={{
              borderRadius: "4px",
              marginBottom: "8px",
            }}
            key={input.name}
            variant="outlined"
            placeholder={`${input.name} (${input.type})`}
            value={null}
            onChange={(e) => handleInputChange(e, input.name)}
            fullWidth
          />
        </Fragment>
      ))}
      <Box sx={{ marginTop: "12px" }}>
        <Button
          sx={{
            background: "#F2F5F6",
            textTransform: "capitalize",
            color: "#000000",
            "&:hover": { backgroundColor: "#D3D4D5" },
          }}
          variant="contained"
          component="label"
          onClick={handleQuery}
          disabled={false}
        >
          Query
        </Button>
        <Box
          sx={{
            display: "flex",
            marginTop: "12px",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Image src="/shape-1.svg" width={12} height={12} alt="shape-1" />
          <Typography
            sx={{
              color: "#808080",
              fontStyle: "italic",
            }}
          >
            {fragment.outputs[0].type}
          </Typography>
          {response && (
            <Typography sx={{ color: "#0784C3" }}>{response}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WithParametersFunction;
