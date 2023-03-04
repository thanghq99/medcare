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
  Switch,
  MenuItem,
  InputAdornment,
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
  isStaff: Joi.boolean().required(),
  degree: Joi.number().required().allow("", null),
  specialty: Joi.number().required().allow("", null),
  examinationFee: Joi.number().required(),
  isAdmin: Joi.boolean().default(false).required(),
});

function EditDoctorForm({
  staffData,
  specialtyList,
  degreeList,
  triggerReFetch,
}) {
  dayjs.extend(utc);

  const [open, setOpen] = React.useState(false);

  const { id, degree, specialty, examinationFee, isAdmin, account } = staffData;
  const defaultValues = {
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phoneNumber: account.phoneNumber,
    dob: account.dob,
    gender: account.gender,
    address: account.address,
    isStaff: true,
    degree: degree === null ? "" : degree.id,
    specialty: specialty === null ? "" : specialty.id,
    examinationFee: examinationFee,
    isAdmin: isAdmin,
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
    submitData.degree = submitData.degree === "" ? null : submitData.degree;
    submitData.specialty =
      submitData.specialty === "" ? null : submitData.specialty;
    submitData.examinationFee = parseInt(submitData.examinationFee);
    console.log("submit data", submitData);

    try {
      const result = await axios.put(`staff/${id}`, submitData);
      console.log("staff updated", result);
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant create staff", error);
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
            Chỉnh sửa thông tin bác sĩ
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                    name="specialty"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Chuyên khoa"
                      >
                        <MenuItem value="">Không có</MenuItem>
                        {specialtyList &&
                          specialtyList.map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                              {s.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="degree"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} select fullWidth label="Bằng cấp">
                        <MenuItem value="">Không có</MenuItem>
                        {degreeList &&
                          degreeList.map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                              {s.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </Grid>{" "}
                <Grid item xs={6}>
                  <Controller
                    name="examinationFee"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Giá khám"
                        type="number"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">VND</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="isAdmin"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormLabel id={`isAdmin`}>Nhân viên quản lý</FormLabel>
                        <Switch
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value}
                        />
                      </>
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

export default EditDoctorForm;
