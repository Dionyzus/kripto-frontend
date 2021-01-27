import React, { ReactNode } from "react";
import { Container, Grid, Paper } from "@material-ui/core";

interface IProps {
  children: ReactNode;
}

export default function PublicLayout(props: IProps) {
  return (
    <Container>
      <Grid item xs={12}>
        <Paper elevation={3}>{props.children}</Paper>
      </Grid>
    </Container>
  );
}
