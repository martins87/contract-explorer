"use client";

import { Fragment, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

import { useContract } from "@/app/store/contract";
import Function from "@/app/components/Function";
import { Typography } from "@mui/material";

const Contract = () => {
  const instance = useContract((state) => state.contract.instance);
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    if (!instance) {
      redirect("/");
    }

    let fragments = instance.interface.fragments;
    setFunctions(fragments.filter((f) => f.type === "function"));
  }, []);

  return (
    <Fragment>
      <Container sx={{ marginTop: "44px" }} maxWidth="md">
        <Card>
          <CardContent>
            <Typography variant="h6">Contract functions</Typography>
            {functions.length !== 0 &&
              functions.map((f) => (
                <Function
                  key={"0x" + f.name}
                  contract={instance}
                  fragment={f}
                />
              ))}
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Contract;
