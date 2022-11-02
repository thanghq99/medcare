import React, { useState } from "react";

import { matchPath, NavLink, useLocation } from "react-router-dom";

import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import navConfig from "./navConfig";

function NavSubItem({ item, match }) {
  const { title, path } = item;

  const isChildActive = match(path);

  return (
    <ListItemButton
      component={NavLink}
      to={path}
      key={title}
      sx={{
        mb: "2px",
        height: 36,
        borderRadius: 2,
        textTransform: "capitalize",
        color: isChildActive ? "primary.main" : "",
      }}
    >
      <ListItemIcon>
        <Box
          sx={{
            height: 24,
            width: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: isChildActive ? "primary.main" : "text.disabled",
              transform: isChildActive ? "scale(2)" : "scale(1)",
              transition: "0.2s",
            }}
          ></Box>
        </Box>
      </ListItemIcon>
      <ListItemText primary={title}></ListItemText>
    </ListItemButton>
  );
}

function NavItem({ item, match }) {
  const { title, path, icon, children } = item;

  let isRootActive = match(path);

  const [open, setOpen] = useState(() => (isRootActive ? isRootActive : false));

  const handleOpen = () => {
    setOpen(!open);
  };

  if (children)
    return (
      <>
        <ListItemButton
          sx={{
            height: 48,
            borderRadius: 2,
            textTransform: "capitalize",
            color: isRootActive ? "primary.main" : "",
          }}
          onClick={handleOpen}
        >
          <ListItemIcon sx={{ color: isRootActive ? "primary.main" : "" }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={title}></ListItemText>
          <ChevronRightIcon
            sx={{
              transform: open ? "rotate(90deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        <Collapse in={open}>
          <List>
            {children.map((item) => (
              <NavSubItem key={item.title} item={item} match={match} />
            ))}
          </List>
        </Collapse>
      </>
    );

  return (
    <ListItemButton
      component={NavLink}
      to={path}
      sx={{
        height: 48,
        borderRadius: 2,
        textTransform: "capitalize",
        color: isRootActive ? "primary.main" : "",
      }}
    >
      <ListItemIcon sx={{ color: isRootActive ? "primary.main" : "" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title}></ListItemText>
    </ListItemButton>
  );
}

function NavSection() {
  const { pathname } = useLocation();

  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <List
      sx={{
        px: "20px",
      }}
    >
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} match={match} />
      ))}
    </List>
  );
}

export default NavSection;
