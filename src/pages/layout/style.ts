import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 4,
  },
  layout: {
    display: 'table',
    height: '100%',
    margin: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.up(1400 + theme.spacing(2) * 2)]: {
      width: 1400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  loadingBarRow: {
    minHeight: '0.5vh',
  },
  paper: {
    minHeight: '89vh',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1400 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  loadingBar: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
