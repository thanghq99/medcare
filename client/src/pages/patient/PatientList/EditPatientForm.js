import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import React from "react";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import axios from "../../../api/axios";

import AlertDialog from "../../../components/AlertModal";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phoneNumber: Joi.string().allow(""),
  dob: Joi.date().required(),
  gender: Joi.string().min(1).max(1).required(),
  address: Joi.string().allow(""),
  healthHistory: Joi.string().allow(""),
  familyHealthHistory: Joi.string().allow(""),
});

function EditPatientForm({ patientData, triggerReFetch }) {
  dayjs.extend(utc);

  const [open, setOpen] = React.useState(false);

  const { id, healthHistory, familyHealthHistory, account } = patientData;
  const defaultValues = {
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phoneNumber: account.phoneNumber,
    dob: account.dob,
    gender: account.gender,
    address: account.address,
    healthHistory: healthHistory,
    familyHealthHistory: familyHealthHistory,
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(schema),
  });

  const getData = () => {
    console.log(errors);
  };

  const onSubmit = async (data) => {
    let submitData = getValues();
    submitData.accountId = account.id;
    console.log("submit data", submitData);

    try {
      const result = await axios.put(`patient/${id}`, submitData);
      console.log("patient updated", result);
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant update patient", error);
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MenuItem disableRipple dense onClick={handleOpen}>
        <EditIcon sx={{ mr: 2 }} />
        Xem & Chỉnh sửa
      </MenuItem>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Chỉnh sửa thông tin bệnh nhân
          </Typography>
        </DialogTitle>
        <DialogContent>
          <button onClick={getData}>Get data</button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin cơ bản
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Tên"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Họ"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl error={!!fieldState.error}>
                        <FormLabel id="gender">Giới tính</FormLabel>
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="M"
                            control={<Radio />}
                            label="Nam"
                          />
                          <FormControlLabel
                            value="F"
                            control={<Radio />}
                            label="Nữ"
                          />
                        </RadioGroup>
                        <FormHelperText>
                          {fieldState.error?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field, fieldState }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label="Ngày sinh"
                          openTo="year"
                          views={["year", "month", "day"]}
                          maxDate={dayjs().subtract(15, "year")}
                          onChange={(e) => {
                            field.onChange(e.format("YYYY-MM-DD"));
                          }}
                          renderInput={(params) => (
                            <>
                              <TextField
                                {...params}
                                fullWidth
                                onKeyDown={onKeyDown}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            </>
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin tài khoản
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin liên hệ
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Số điện thoại"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Địa chỉ"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin nghề nghiệp
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="healthHistory"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Tiền sử bệnh cá nhân"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="familyHealthHistory"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Tiền sử bệnh gia đình"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          {isDirty ? (
            <AlertDialog action={handleClose} />
          ) : (
            <Button onClick={handleClose}>Hủy</Button>
          )}
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditPatientForm;
