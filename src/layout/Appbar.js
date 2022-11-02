import React from 'react'

import {
    Box,
    AppBar,
    Drawer,
    Button,
    Toolbar,
    IconButton,
    Avatar,
  } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import NotificationsIcon from "@mui/icons-material/Notifications";
  import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
  import {
    APPBAR_MOBILE_HEIGHT,
    APPBAR_DESKTOP_HEIGHT,
    DRAWER_WIDTH,
  } from "./layoutDimensions";

function Appbar() {
  return (
    <AppBar //APPBAR
        color="default"
        sx={{
          boxShadow: "none",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          width: {
            lg: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
          },
          minHeight: APPBAR_DESKTOP_HEIGHT,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Box>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <Avatar>H</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Appbar