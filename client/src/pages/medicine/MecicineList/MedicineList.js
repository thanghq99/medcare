import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  TextField,
  InputAdornment,
  Grid,
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
import SearchIcon from "@mui/icons-material/Search";

import axios from "../../../api/axios";

import ListItemAction from "./ListItemAction";
import EnhancedTableHead from "../../../components/EnhancedTableHead";
import TableHeadReplacement from "../../../components/TableHeadReplacement";
import PageHeader from "../../../components/PageHeader";
import CreateMedicineForm from "./CreateMedicineFrom";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên thuốc",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

export default function MedicineList() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [medicineList, setMedicineList] = React.useState([]);
  const [trigger, setTrigger] = React.useState(false); //togger true false

  const { handleSubmit, getValues, watch, control } = useForm({
    defaultValues: {
      name: "",
    },
  });

  watch("name");
  console.log("re render");

  const triggerReFetch = () => {
    setTrigger(!trigger);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const medicines = await axios.get("medicine");
        setMedicineList(medicines.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log("fetched!");
  }, [trigger]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = medicineList.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicineList.length) : 0;

  return (
    <>
      <PageHeader
        title="Danh sách thuốc"
        action={<CreateMedicineForm triggerReFetch={triggerReFetch} />}
      />
      <Paper elevation={5} sx={{ bgcolor: "grey.100" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center" sx={{ my: 2, px: 2 }}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Tìm kiếm theo tên thuốc"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer component={Paper} sx={{ position: "relative" }}>
            <TableHeadReplacement
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={medicineList.length}
            />
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={medicineList.length}
                headCells={headCells}
              />
              <TableBody>
                {medicineList
                  .filter(
                    (medicine) =>
                      medicine.name
                        .toLowerCase()
                        .indexOf(getValues("name").toLowerCase()) >= 0
                  )
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
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <ListItemAction
                            medicine={row}
                            triggerReFetch={triggerReFetch}
                            medicineList={medicineList}
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
              count={medicineList.length}
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
