import React, { ReactNode } from "react";
import { Grid, Paper } from "@material-ui/core";
import AppHeader from "./appHeader";
import { useStyles } from "../style";

interface IProps {
  children: ReactNode;
}
export default function AppLayout(props: IProps) {
  const appLayoutStyles = useStyles();

  return (
    <Grid container className={appLayoutStyles.layout}>
      <Grid item xs={12}>
        <AppHeader />
      </Grid>
      <Grid item xs={12}>
        <Paper className={appLayoutStyles.paper} elevation={3}>
          {props.children}
        </Paper>
      </Grid>
    </Grid>
  );
}
