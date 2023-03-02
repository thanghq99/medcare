import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
// import BackgroundImage from "./auth-background.jpg";
// import { APPBAR_DESKTOP_HEIGHT } from "./layoutDimensions";
function AuthPageLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </Box>
    // <Paper
    //   sx={{
    //     backgroundImage: `url(${BackgroundImage})`,
    //     backgroundSize: "cover",
    //     width: "100%",
    //     height: "100vh",
    //     // marginTop: `-${APPBAR_DESKTOP_HEIGHT}px`,
    //   }}
    // >
    // </Paper>
  );
}

export default AuthPageLayout;
