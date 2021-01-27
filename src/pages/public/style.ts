import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#DCDCDC",
    minHeight: "89vh",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1400 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  pageTitleGrid: {
    textAlign: "center",
  },
  shortDescriptionGrid: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  pageContentGrid: {
    textAlign: "center",
    margin: "auto",
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  pageContentPaper: {
    padding: theme.spacing(1),
    margin: "auto",
  },
}));
