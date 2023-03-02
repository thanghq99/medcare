import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";
import { APPBAR_DESKTOP_HEIGHT } from "./layoutDimensions";

import Appbar from "./Appbar";
import Sidebar from "./Sidebar";

function PageLayout() {
  return (
    //ROOT LAYOUT
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Appbar />
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          paddingTop: `calc(${APPBAR_DESKTOP_HEIGHT}px + 24px)`,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default PageLayout;
