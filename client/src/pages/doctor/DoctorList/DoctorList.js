import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  TextField,
  Tabs,
  Tab,
  InputAdornment,
  Grid,
  MenuItem,
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
import CreateDoctorForm from "./CreateDoctorForm";

export default function DoctorList() {
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [doctorList, setDoctorList] = React.useState([]);
  const [doctorCount, setDoctorCount] = React.useState(0);
  const [specialtyList, setSpecialtyList] = React.useState([]);
  const [degreeList, setDegreeList] = React.useState([]);
  const [trigger, setTrigger] = React.useState(false); //togger true false

  const { handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      searchName: "",
      disableFilter: false,
      degreeFilter: "",
      specialtyFilter: "",
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
        const doctors = await axios.post("staff/get-staffs", getValues());
        const specialties = await axios.get("specialty");
        const degrees = await axios.get("degree");
        setDoctorList(doctors.data.data.rows);
        setDoctorCount(doctors.data.data.count);
        setSpecialtyList(specialties.data.data);
        setDegreeList(degrees.data.data);
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
      const newSelected = doctorList.map((n) => n.id);
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
      ? Math.max(0, getValues("page") * getValues("pageSize") - doctorCount)
      : 0;

  return (
    <>
      <PageHeader
        title="Danh sách bác sĩ"
        action={
          <CreateDoctorForm
            triggerReFetch={triggerReFetch}
            specialtyList={specialtyList}
            degreeList={degreeList}
          />
        }
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
                  <Tab value={false} label="Đang làm" />
                  <Tab value={true} label="Đã nghỉ" />
                </Tabs>
              )}
            />
          </Box>
          <Grid container spacing={2} alignItems="center" sx={{ my: 2, px: 2 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <Controller
                name="specialtyFilter"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth label="Chuyên khoa">
                    <MenuItem value="">Tất cả</MenuItem>
                    {specialtyList.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Controller
                name="degreeFilter"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth label="Bằng cấp">
                    <MenuItem value="">Tất cả</MenuItem>
                    {degreeList.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={8} lg>
              <Controller
                name="searchName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
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
              rowCount={doctorList.length}
            />
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={doctorList.length}
              />
              <TableBody>
                {doctorList.map((row, index) => {
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
                        {row.specialty ? row.specialty.name : "Không có"}
                      </TableCell>
                      <TableCell align="left">
                        {row.degree ? row.degree.name : "Không có"}
                      </TableCell>
                      <TableCell align="right">
                        {row.account.phoneNumber}
                      </TableCell>
                      <TableCell align="right">{row.examinationFee}</TableCell>
                      <TableCell align="left">
                        {row.account.isDisabled === false && (
                          <Chip label="Đang làm" color="success" />
                        )}
                        {row.account.isDisabled === true && (
                          <Chip label="Đã nghỉ" color="warning" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <ListItemAction
                          staffData={row}
                          triggerReFetch={triggerReFetch}
                          specialtyList={specialtyList}
                          degreeList={degreeList}
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
              count={doctorCount}
              setValue={setValue}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
        </Paper>
      </Paper>
    </>
  );
}
