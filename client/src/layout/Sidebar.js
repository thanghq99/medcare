import React from "react";

import { Box, Drawer, IconButton, Avatar, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DRAWER_WIDTH } from "./layoutDimensions";
import NavSection from "./NavSection";
import useAuth from "../hooks/useAuth";

function IconDoctor(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"
      {...props}
    >
      <path d="M14.84 16.26C17.86 16.83 20 18.29 20 20v2H4v-2c0-1.71 2.14-3.17 5.16-3.74L12 21l2.84-4.74M8 8h8v2a4 4 0 01-4 4 4 4 0 01-4-4V8m0-1l.41-4.1a1 1 0 011-.9h5.19c.51 0 .94.39.99.9L16 7H8m4-4h-1v1h-1v1h1v1h1V5h1V4h-1V3z" />
    </svg>
  );
}

function IconPatient(props) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M240 80h102.7c-7.9-19.5-20.4-36.5-36.2-49.9L240 80zm37.7-68.2C261.3 4.2 243.2 0 224 0c-53.7 0-99.7 33.1-118.7 80h81.4l91-68.2zM224 256c70.7 0 128-57.3 128-128 0-5.4-.3-10.8-1-16H97c-.7 5.2-1 10.6-1 16 0 70.7 57.3 128 128 128zm-100 56.4c-9.7 3.1-19.1 7-28 11.7V512h147.7l-62.2-103.8-57.5-95.8zm33-7.2l47.3 78.8H272c44.2 0 80 35.8 80 80 0 18-6 34.6-16 48h82.3c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4c-7.2 0-14.3.4-21.3 1.3zM0 482.3C0 498.7 13.3 512 29.7 512H64V345.4C24.9 378.1 0 427.3 0 482.3zM320 464c0-26.5-21.5-48-48-48h-48.5l57.1 95.2c22.4-4 39.4-23.6 39.4-47.2z" />
    </svg>
  );
}

function IconAdmin(props) {
  return (
    <svg
      viewBox="0 0 640 512"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3-2.1 18.5 7.4 35.6 21.8 44.8-16.6 10.6-26.7 31.6-20 53.3 4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3 0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8 10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4 7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.6c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2 3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.4zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48 21.5 48 48.1 48 48.1-21.5 48.1-48z" />
    </svg>
  );
}

function Sidebar() {
  const { user } = useAuth();
  return (
    <Box //SIDEBAR
      sx={{
        width: DRAWER_WIDTH,
        display: { xs: "none", md: "block" },
        flexShrink: 0,
      }}
    >
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            borderRightStyle: "dashed",
          },
        }}
      >
        <Box
          sx={{
            padding: "12px 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
              >
                <defs>
                  <linearGradient
                    id="BG1"
                    x1="100%"
                    x2="50%"
                    y1="9.946%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="#007B55"></stop>
                    <stop offset="100%" stopColor="#00AB55"></stop>
                  </linearGradient>
                  <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#5BE584"></stop>
                    <stop offset="100%" stopColor="#00AB55"></stop>
                  </linearGradient>
                  <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#5BE584"></stop>
                    <stop offset="100%" stopColor="#00AB55"></stop>
                  </linearGradient>
                </defs>
                <g
                  fill="#00AB55"
                  fillRule="evenodd"
                  stroke="none"
                  strokeWidth="1"
                >
                  <path
                    fill="url(#BG1)"
                    d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
                  ></path>
                  <path
                    fill="url(#BG2)"
                    d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
                  ></path>
                  <path
                    fill="url(#BG3)"
                    d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
                  ></path>
                </g>
              </svg>
            </Box>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 2,
              marginTop: 3,
              borderRadius: 2,
              backgroundColor: "grey.100",
            }}
          >
            <Avatar>
              {user.isStaff === false && <IconPatient />}
              {user.isStaff === true && user.isAdmin === false && (
                <IconDoctor />
              )}
              {user.isStaff === true && user.isAdmin === true && <IconAdmin />}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">Xin chào,</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          </Box>
        </Box>

        <NavSection />
      </Drawer>
    </Box>
  );
}

export default Sidebar;
