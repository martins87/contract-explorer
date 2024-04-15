import { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import eth_address from "ethereum-address";

import Input from "../Input";

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

  const handleInputChange = (e, param) => {
    let value = e.target.value;
    let paramName = param.name;
    let paramType = param.type;
    let paramsArr = [];
    let errorMessage = "";

    if ((paramType === "uint256" || paramType === "uint8") && isNaN(value)) {
      errorMessage = "Invalid input type";
    } else if (
      paramType === "address" &&
      !eth_address.isAddress(e.target.value)
    ) {
      errorMessage = "Invalid input type";
    }

    parameters.map((parameter) => {
      let paramObj = parameter;

      if (parameter.name === paramName) {
        paramObj = {
          ...parameter,
          value: e.target.value,
          errorMessage: errorMessage,
        };
      }

      paramsArr.push(paramObj);
    });

    setParameters(paramsArr);
  };

  const getErrorMessage = (inputName) => {
    let param = parameters.filter((p) => p.name === inputName)[0];

    return param?.errorMessage;
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
          <Input
            label={input.name}
            placeholder={`${input.name} (${input.type})`}
            value={null}
            handleOnChange={(e) => handleInputChange(e, input)}
            errorMessage={getErrorMessage(input.name)}
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
