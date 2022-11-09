import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

function TableHeadReplacement(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        height: 60,
        width: "100%",
        backgroundColor: "#a6d4fa",
        display: "flex",
        alignItems: "center",
        pl: 0.5,
        pr: 2,
        zIndex: numSelected > 0 ? 10 : -10,
      }}
    >
      <Checkbox
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
      />
      <Typography sx={{ flex: "1 1 100%", padding: 2, fontSize: "14px" }}>
        Đã chọn {numSelected}
      </Typography>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Box>
  );
}

export default TableHeadReplacement;
