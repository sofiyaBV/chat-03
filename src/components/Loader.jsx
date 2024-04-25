import React from "react";
import s from "../style/loader.module.css";
import { Container, Grid } from "@mui/material";
export default function Loader() {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid container alignItems={"center"} justifyContent={"center"}>
          <div className={s.loader}></div>
        </Grid>
      </Grid>
    </Container>
  );
}
