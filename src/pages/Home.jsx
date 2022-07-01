import React from "react";
import { Typography } from "@mui/material";
import List from "../components/List";

function Home() {
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        The fabulous cars of {"{"} The Jump {"}"}
      </Typography>
      <List />
    </>
  );
}

export default Home;
