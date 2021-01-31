import React, { useState } from "react";
import {
  Grid,
  AppBar,
  IconButton,
  Toolbar,
  Paper,
  Fade,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from "@material-ui/core";
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "../style";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

export default function AppHeader() {
  const appHeaderStyles = useStyles();

  //This should be seperated component
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  //This should be seperated component
  const handleClick = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  function handleClose() {
    setOpen(false);
  }

  //This could be used to get all transaction hashes from memory pool,
  //then to display all data for each one of them.
  //Maybe better approach is just to display hashes and enable clicking to view details.

  /*async function handleAllMemoryPoolTransactions() {
    const response = await getAllTransactionsReq();
    if (response) {
      response.data.result.forEach(async (txHash: string) => {
        console.log((await getRawTransactionReq(txHash)).data.result);
      });
    } else {
      console.log("Failed to retrieve data!");
    }
  }*/

  return (
    <Grid item xs>
      <AppBar className={appHeaderStyles.appBar} elevation={1}>
        <Toolbar>
          <Grid
            container
            wrap="nowrap"
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={10} style={{ textAlign: "start" }}>
              <IconButton
                color="inherit"
                aria-label="search"
                component={Link}
                to="/search"
              >
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "end" }}>
              <IconButton
                onClick={handleClick("bottom-start")}
                edge="start"
                className={appHeaderStyles.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={150}>
                    <Paper elevation={2}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open}>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/menu1"
                          >
                            USD
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/menu2"
                          >
                            EUR
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/menu3"
                          >
                            HRK
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
