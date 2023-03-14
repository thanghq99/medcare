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
} from "@mui/material";
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
import { toast } from "react-toastify";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().allow(""),
  dob: Joi.date().required(),
  gender: Joi.string().min(1).max(1).required(),
  address: Joi.string().allow(""),
  isStaff: Joi.boolean().required(),
  degree: Joi.number().required().allow("", null),
  specialty: Joi.number().required().allow("", null),
  examinationFee: Joi.number().required(),
  isAdmin: Joi.boolean().default(false).required(),
  healthHistory: Joi.string().allow(""),
  familyHealthHistory: Joi.string().allow(""),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  dob: "",
  gender: "",
  address: "",
  isStaff: false,
  degree: null,
  specialty: null,
  examinationFee: 0,
  isAdmin: false,
  healthHistory: "",
  familyHealthHistory: "",
};

function CreatePatientForm({ triggerReFetch }) {
  dayjs.extend(utc);

  const [open, setOpen] = React.useState(false);

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
    console.log("submit data", submitData);

    try {
      const result = await axios.post("account", submitData);
      console.log("patient created", result);
      toast.success("Tài khoản bệnh nhân tạo thành công!");
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant create staff", error);
      toast.error("Có lỗi xảy ra!");
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
      <Button variant="contained" onClick={handleOpen}>
        Thêm bệnh nhân mới
      </Button>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Thêm bệnh nhân mới
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
                          maxDate={dayjs()}
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
                <Grid item xs={6}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Mật khẩu"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập mật khẩu"
                        }
                      />
                    )}
                  />
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
          </form>
        </DialogContent>
        <DialogActions>
          {isDirty ? (
            <AlertDialog action={handleClose} />
          ) : (
            <Button onClick={handleClose}>Hủy</Button>
          )}
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreatePatientForm;
