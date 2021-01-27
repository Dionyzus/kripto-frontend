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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

export default function AppHeader() {
  const appHeaderStyles = useStyles();

  //This should be seperated component
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [openNext, setOpenNext] = useState(false);
  const [placementNext, setPlacementNext] = useState<PopperPlacementType>();
  const [anchorElNext, setAnchorElNext] = useState<HTMLButtonElement | null>(
    null
  );

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
                            to="/users"
                          >
                            Users
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/products/list"
                          >
                            Products
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={handleClose}
                            component={Link}
                            to="/producers"
                          >
                            Producers
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
                aria-label="chat"
                component={Link}
                to="/chat"
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
                to="/welcome"
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
                          <MenuItem>Log Out</MenuItem>
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
