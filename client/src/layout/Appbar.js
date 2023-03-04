import React from "react";

import {
  Box,
  AppBar,
  Tooltip,
  Toolbar,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  APPBAR_MOBILE_HEIGHT,
  APPBAR_DESKTOP_HEIGHT,
  DRAWER_WIDTH,
} from "./layoutDimensions";
import useAuth from "../hooks/useAuth";

function Appbar() {
  const { logout } = useAuth();
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
        <Tooltip title="Chức năng đang phát triến" placement="right">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>

        <Box>
          <Tooltip title="Đăng xuất" placement="left">
            <IconButton>
              <Avatar>
                <LogoutIcon onClick={() => logout()} />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
