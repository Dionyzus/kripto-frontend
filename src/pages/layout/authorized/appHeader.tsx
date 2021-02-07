/* eslint-disable no-unused-vars */
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
import { useStyles } from "../style";
import { Link, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { logOut } from "../../../api/authApi";
import SearchBar from "material-ui-search-bar";
import { getSearchedDataReq } from "../../../api/bitcoinApi";

export default function AppHeader() {
  const appHeaderStyles = useStyles();
  const history = useHistory();
  const [searchedValue, setSearchedValue] = useState<string>();

  //This should be seperated component
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  //This could be seperated component "Logout button"
  async function handleLogout() {
    localStorage.removeItem("accessToken");
    logOut();
    history.push("/");
  }

  //This should be seperated component
  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  function handleClose() {
    setOpen(false);
  }

  async function handleSearchData(term?: string) {
    if (term != null) {
      const response = await getSearchedDataReq(term);
      if (response && response.data) {
        if (response.data.result.txid != null) {
          history.push(`/bitcoin/transaction/${term}`);
        } else {
          history.push(`/bitcoin/block/${term}`);
        }
      }
    }
  }

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
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <IconButton
                color="inherit"
                aria-label="home"
                component={Link}
                to="/"
              >
                <HomeIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8} style={{ textAlign: "start" }}>
              <SearchBar
                placeholder={"Search transaction or a block"}
                value={searchedValue}
                onChange={(newValue) => setSearchedValue(newValue)}
                onRequestSearch={() => handleSearchData(searchedValue)}
              />
            </Grid>
            <Grid item xs={2} style={{ textAlign: "end" }}>
              <IconButton
                onClick={handleClick("bottom-start")}
                edge="start"
                className={appHeaderStyles.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <AccountCircleIcon />
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
                            to="/profile"
                          >
                            Profile
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
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
