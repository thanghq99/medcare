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
  Tooltip,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import React from "react";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import axios from "../api/axios";

import AlertDialog from "./AlertModal";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

function AccountDetails() {
  dayjs.extend(utc);
  const navigate = useNavigate();

  const { user, updateAccountDetails, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const { fullDetails } = user;
  const defaultValues = {
    firstName: fullDetails.firstName,
    lastName: fullDetails.lastName,
    email: fullDetails.email,
    phoneNumber: fullDetails.phoneNumber,
    dob: fullDetails.dob,
    gender: fullDetails.gender,
    address: fullDetails.address,
    healthHistory: fullDetails.patientDetails.healthHistory,
    familyHealthHistory: fullDetails.patientDetails.familyHealthHistory,
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

  const onSubmit = async (data) => {
    let submitData = getValues();
    submitData.patientId = user.patientId;
    console.log("submit data", submitData);

    try {
      const result = await axios.put(`account/${user.id}`, submitData);
      const newAccountDetails = await axios.get(`account/${user.id}`);
      updateAccountDetails(newAccountDetails.data.data);
      toast.success("Cập nhật thông tin cá nhân thành công!");
      navigate(0);
    } catch (error) {
      console.log("cant update account", error);
      toast.error("Có lỗi xảy ra!");
      handleClose();
    }
  };

  const navigateToChangePasswordPage = () => {
    logout();
    navigate("/auth/doi-mat-khau");
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
      <Tooltip
        title="Chỉnh sửa thông tin cá nhân"
        placement="bottom"
        onClick={handleOpen}
      >
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Chỉnh sửa thông tin cá nhân
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
                        helperText={fieldState.error?.message && "Cần nhập tên"}
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
                        helperText={fieldState.error?.message && "Cần nhập họ"}
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
                          {fieldState.error?.message && "Cần chọn giới tính"}
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
                                helperText={
                                  fieldState.error?.message &&
                                  "Cần chọn ngày sinh"
                                }
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
                        helperText={
                          fieldState.error?.message &&
                          "Cần nhập email đúng định dạng"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  alignItems="stretch"
                  style={{ display: "flex" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={navigateToChangePasswordPage}
                  >
                    Đổi mật khẩu
                  </Button>
                </Grid>
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
                        helperText={
                          fieldState.error?.message &&
                          "Cần nhập số diện thoại đúng định dạng"
                        }
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
                        helperText={
                          fieldState.error?.message && "Cần nhập địa chỉ"
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            {user.isStaff === false && (
              <Box>
                <Typography variant="h6" mt={2} mb={1}>
                  Thông tin sức khỏe
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
                          helperText={
                            fieldState.error?.message &&
                            "Cần nhập tiền sử bệnh cá nhân"
                          }
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
                          helperText={
                            fieldState.error?.message &&
                            "Cần nhập tiền sử bệnh của gia đình"
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          {isDirty ? (
            <AlertDialog action={handleClose} />
          ) : (
            <Button onClick={handleClose}>Hủy</Button>
          )}
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AccountDetails;
