import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  TextField,
  Tabs,
  Tab,
  InputAdornment,
  Grid,
  Chip,
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import axios from "../../../api/axios";

import ListItemAction from "./ListItemAction";
import EnhancedTableHead from "./EnhancedTableHead";
import TableHeadReplacement from "./TableHeadReplacement";
import CustomTablePagination from "../../../components/TablePagination";
import PageHeader from "../../../components/PageHeader";
import CreatePatientForm from "./CreatePatientForm";

export default function PatientList() {
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [patientList, setPatientList] = React.useState([]);
  const [patientCount, setPatientCount] = React.useState(0);
  const [trigger, setTrigger] = React.useState(false); //togger true false

  const { handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      searchValue: "",
      disableFilter: false,
      orderBy: "", // useless
      order: "DESC", //useless
      page: 1,
      pageSize: 5,
    },
  });

  const triggerReFetch = () => {
    setTrigger(!trigger);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const patients = await axios.post("patient/get-patients", getValues());
        setPatientList(patients.data.data.rows);
        setPatientCount(patients.data.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("fetched!");
    getData();
  }, [trigger]);

  const onSubmit = (data) => {
    triggerReFetch();
    console.log(data);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = patientList.map((n) => n.id);
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
    getValues("page") >= 1
      ? Math.max(0, getValues("page") * getValues("pageSize") - patientCount)
      : 0;

  return (
    <>
      <PageHeader
        title="Danh sách bệnh nhân"
        action={<CreatePatientForm triggerReFetch={triggerReFetch} />}
      />
      <Paper elevation={5} sx={{ bgcolor: "grey.100" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Controller
              name="disableFilter"
              control={control}
              render={({ field }) => (
                <Tabs
                  {...field}
                  onChange={(event, selectedTab) => {
                    field.onChange(selectedTab);
                    triggerReFetch();
                  }}
                  sx={{ bgcolor: "grey.300", borderRadius: "8px 8px 0 0" }}
                >
                  <Tab value="" label="Tất cả" />
                  <Tab value={false} label="Đang hoạt động" />
                  <Tab value={true} label="Đã khóa" />
                </Tabs>
              )}
            />
          </Box>
          <Grid container spacing={2} alignItems="center" sx={{ my: 2, px: 2 }}>
            <Grid item xs={12} sm={8} lg>
              <Controller
                name="searchValue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Tìm kiếm theo tên hoặc số điện thoại"
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
            <Grid item xs={12} sm={4} lg="auto">
              <Button type="submit" variant="text">
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </form>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer component={Paper} sx={{ position: "relative" }}>
            <TableHeadReplacement
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={patientList.length}
            />
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={patientList.length}
              />
              <TableBody>
                {patientList.map((row, index) => {
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
                        {row.account.firstName + " " + row.account.lastName}
                      </TableCell>
                      <TableCell align="left">
                        {row.account.gender === "M" ? "Nam" : "Nữ"}
                      </TableCell>
                      <TableCell align="left">{row.account.dob}</TableCell>
                      <TableCell align="right">
                        {row.account.phoneNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.examinationCount ? row.examinationCount : 0}
                      </TableCell>
                      <TableCell align="left">
                        {row.account.isDisabled === false && (
                          <Chip label="Đang hoạt động" color="success" />
                        )}
                        {row.account.isDisabled === true && (
                          <Chip label="Đã khóa" color="warning" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <ListItemAction
                          patientData={row}
                          triggerReFetch={triggerReFetch}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
              my: 1,
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={dense}
                  onChange={handleChangeDense}
                  sx={{ mx: 2 }}
                />
              }
              label="Thu gọn"
            />

            <CustomTablePagination
              triggerReFetch={triggerReFetch}
              page={getValues("page")}
              pageSize={getValues("pageSize")}
              count={patientCount}
              setValue={setValue}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
        </Paper>
      </Paper>
    </>
  );
}
