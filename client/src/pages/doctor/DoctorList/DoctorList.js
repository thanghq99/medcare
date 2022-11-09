import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";

import ListItemAction from "./ListItemAction";
import EnhancedTableHead from "./EnhancedTableHead";
import TableHeadReplacement from "./TableHeadReplacement";

import rows from "./demoData";
import getComparator from "../../../utils/tableSortComparator";
import PageHeader from "../../../components/PageHeader";
import { Button } from "@mui/material";

export default function DoctorList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [degreeFilter, setDegreeFilter] = React.useState("all");
  const [specialtyFilter, setSpecialtyFilter] = React.useState("all");

  const handleChangeStatusFilter = (event, value) => {
    setStatusFilter(value);
  };

  const handleChangeDegreeFilter = (event) => {
    setDegreeFilter(event.target.value);
  };

  const handleChangeSpecialtyFilter = (event) => {
    setSpecialtyFilter(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.staffId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <PageHeader
        title="Danh sách bác sĩ"
        action={<Button variant="contained">Thêm bác sĩ mới</Button>}
      />
      <Paper elevation={5}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={statusFilter}
            onChange={handleChangeStatusFilter}
            sx={{ bgcolor: "grey.200", borderRadius: "8px 8px 0 0" }}
          >
            <Tab value="all" label="Tất cả" />
            <Tab value="active" label="Đang làm" />
            <Tab value="inactive" label="Đã nghỉ" />
          </Tabs>
        </Box>
        <Grid container spacing={2} sx={{ my: 2, px: 2 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              select
              value={specialtyFilter}
              label="Chuyên khoa"
              onChange={handleChangeSpecialtyFilter}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="chuyen-khoa-a">Chuyên khoa A</MenuItem>
              <MenuItem value="chuyen-khoa-b">Chuyên khoa B</MenuItem>
              <MenuItem value="chuyen-khoa-c">Chuyên khoa C</MenuItem>
              <MenuItem value="chuyen-khoa-d">Chuyên khoa D</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              select
              value={degreeFilter}
              label="Bằng cấp"
              onChange={handleChangeDegreeFilter}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="chuyen-khoa-1">Chuyên khoa 1</MenuItem>
              <MenuItem value="chuyen-khoa-2">Chuyên khoa 1</MenuItem>
              <MenuItem value="tien-si">Tiến sĩ</MenuItem>
              <MenuItem value="giao-su">Giáo sư</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer component={Paper} sx={{ position: "relative" }}>
            <TableHeadReplacement
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
                {/* {stableSort(rows, getComparator(order, orderBy)) */}
                {rows
                  .filter((row) =>
                    statusFilter === "all" ? row : row.status === statusFilter
                  )
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.staffId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.staffId}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row.staffId)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.specialty}</TableCell>
                        <TableCell align="left">{row.degree}</TableCell>
                        <TableCell align="right">{row.phoneNumber}</TableCell>
                        <TableCell align="right">
                          {row.examinationFee}
                        </TableCell>
                        <TableCell align="left">
                          {row.status === "active" && (
                            <Chip label="Đang làm" color="success" />
                          )}
                          {row.status === "inactive" && (
                            <Chip label="Đã nghỉ" color="warning" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <ListItemAction />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 53 : 73) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ position: "relative", my: "auto" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={dense}
                  onChange={handleChangeDense}
                  sx={{ mx: 2 }}
                />
              }
              label="Thu gọn"
              sx={{
                position: "absolute",
                zIndex: 10,
                top: "50%",
                transform: "translateY(-50%);",
              }}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Paper>
      </Paper>
    </>
  );
}
