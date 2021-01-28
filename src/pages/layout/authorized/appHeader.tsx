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
import { Link, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { logOut } from "../../../api/authApi";

export default function AppHeader() {
  const appHeaderStyles = useStyles();
  const history = useHistory();

  //This should be seperated component
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [openNext, setOpenNext] = useState(false);
  const [placementNext, setPlacementNext] = useState<PopperPlacementType>();
  const [anchorElNext, setAnchorElNext] = useState<HTMLButtonElement | null>(
    null
  );

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

  const handleClickNext = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNext(event.currentTarget);
    setOpenNext((prev) => placement !== newPlacement || !prev);
    setPlacementNext(newPlacement);
  };

  function handleCloseNext() {
    setOpenNext(false);
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
            <Grid item xs={2}>
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
                            Menu1
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/menu2"
                          >
                            Menu2
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/menu3"
                          >
                            Menu3
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "start" }}>
              <IconButton
                color="inherit"
                aria-label="possibleMenu"
                component={Link}
                to="/possibleMenu"
              >
                <ChatBubbleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "start" }}>
              <IconButton
                color="inherit"
                aria-label="search"
                component={Link}
                to="/search"
              >
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <IconButton
                color="inherit"
                aria-label="chat"
                component={Link}
                to="/dashboard"
              >
                <HomeIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "end" }}>
              <IconButton
                onClick={handleClickNext("bottom-start")}
                edge="start"
                className={appHeaderStyles.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <AccountCircleIcon />
              </IconButton>
              <Popper
                open={openNext}
                anchorEl={anchorElNext}
                placement={placementNext}
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={150}>
                    <Paper elevation={2}>
                      <ClickAwayListener onClickAway={handleCloseNext}>
                        <MenuList autoFocusItem={openNext}>
                          <MenuItem
                            type="button"
                            onClick={handleCloseNext}
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
