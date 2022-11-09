import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function PageHeader({ title, action, ...otherProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 5
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        {...otherProps}
      >
        {title}
      </Typography>
      {action}
    </Box>
  );
}

export default PageHeader;
