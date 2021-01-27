import React from "react";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useStyles } from "./style";
import { useHistory, Link } from "react-router-dom";
import ManuIcon from "../../images/bitcoin.jpg";

export default function AppHome() {
  const history = useHistory();
  const appHomeStyles = useStyles();

  async function handleLogin(){
      history.push("/login");
  }

  return (
    <Container maxWidth="lg" className={appHomeStyles.paper}>
      <Grid item xs className={appHomeStyles.pageTitleGrid}>
        <Typography variant="h3">Blockexplorer web application</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Card style={{ margin: "auto", maxWidth: "85%", maxHeight: "100%", marginTop: 50}}>
            <CardMedia
              style={{ maxWidth: 75, maxHeight: 150, margin: "auto", marginTop:10 }}
              component="img"
              alt="Alt"
              image={ManuIcon}
              title="Application Logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                    Blockexplorer
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                    Blockexplorer application
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={2} className={appHomeStyles.pageContentGrid}>
          <Grid item xs={6}>
            <Typography variant="h5">Have account? Sign in.</Typography>
            <IconButton color="primary" size="medium" onClick={handleLogin}>
              <TransitEnterexitIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">New user? Sign up.</Typography>
            <IconButton color="primary" size="medium" component={Link} to='/signup'>
              <LockOpenIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
