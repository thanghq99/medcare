import * as React from "react";

import {
  Switch,
  FormControlLabel,
  Checkbox,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  TablePagination,
} from "@mui/material";

import axios from "../../../api/axios";

import ListItemAction from "./ListItemAction";
import EnhancedTableHead from "../../../components/EnhancedTableHead";
import TableHeadReplacement from "../../../components/TableHeadReplacement";
import PageHeader from "../../../components/PageHeader";
import CreateShiftFrom from "./CreateShiftFrom";

const headCells = [
  {
    id: "startTime",
    numeric: false,
    disablePadding: false,
    label: "Thời gian bắt đầu",
  },
  {
    id: "endTime",
    numeric: false,
    disablePadding: false,
    label: "Thời gian kết thúc",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

export default function SpecialtyList() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [shiftList, setSpecialtyList] = React.useState([]);
  const [trigger, setTrigger] = React.useState(false); //togger true false

  const triggerReFetch = () => {
    setTrigger(!trigger);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const specialties = await axios.get("shift");
        setSpecialtyList(specialties.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log("fetched!");
  }, [trigger]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = shiftList.map((n) => n.id);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shiftList.length) : 0;

  return (
    <>
      <PageHeader
        title="Danh sách ca làm việc"
        action={<CreateShiftFrom triggerReFetch={triggerReFetch} />}
      />
      <Paper elevation={5} sx={{ bgcolor: "grey.100" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer component={Paper} sx={{ position: "relative" }}>
            <TableHeadReplacement
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={shiftList.length}
            />
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={shiftList.length}
                headCells={headCells}
              />
              <TableBody>
                {shiftList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.startTime}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.endTime}
                        </TableCell>
                        <TableCell align="right">
                          <ListItemAction
                            shift={row}
                            triggerReFetch={triggerReFetch}
                            shiftList={shiftList}
                          />
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
              count={shiftList.length}
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
