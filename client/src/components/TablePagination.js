import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const DEFAULT_PAGESIZE_OPTIONS = [5, 10, 25];

function TablePagination({
  triggerReFetch,
  page,
  pageSize,
  count,
  setValue,
  pageSizeOptions,
}) {
  const actualPageSizeOptions = pageSizeOptions
    ? pageSizeOptions
    : DEFAULT_PAGESIZE_OPTIONS;
  const handleChangePageSize = (event) => {
    setValue("pageSize", event.target.value);
    triggerReFetch();
  };
  const handleChangePage = (value) => {
    const selectedPage = page + value;
    setValue("page", selectedPage);
    triggerReFetch();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2" sx={{ mr: 2 }}>
        Số hàng hiển thị:
      </Typography>
      <FormControl sx={{ minWidth: 70, mr: 4, border: 0 }} size="small">
        <Select
          value={pageSize}
          variant="standard"
          onChange={handleChangePageSize}
        >
          {actualPageSizeOptions.map((pso) => (
            <MenuItem key={pso} value={pso}>
              {pso}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="subtitle2" sx={{ mr: 2 }}>
        {(page - 1) * pageSize + 1} -{" "}
        {count <= page * pageSize ? count : page * pageSize}
      </Typography>
      <IconButton
        disabled={page == 1 && true}
        onClick={() => handleChangePage(-1)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        disabled={count <= page * pageSize}
        onClick={() => handleChangePage(1)}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}

export default TablePagination;
