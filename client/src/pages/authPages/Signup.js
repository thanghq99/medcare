import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BackgroundImage from "./signup-bg.jpg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { publicAPI as axios } from "./../../api/axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useState } from "react";

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
function Signup() {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    console.log("submit data", submitData);

    try {
      console.log("try sign up");
      const result = await axios.post("authentication/register", submitData);
      console.log("signed up", result);
      toast.success("Đăng ký tài khoản thành công!");
      navigate("/auth/dang-nhap");
    } catch (error) {
      console.log("cant sign up", error);
      if (error.response.status === 409)
        toast.error("Email này đã được sử dụng!");
      else toast.error("Có lỗi xảy ra!");
    }
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Box
          sx={{
            height: "100%",
            px: { xs: 4, lg: 8, xl: 12 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography gutterBottom fontWeight={4} variant="h4">
            Đăng ký
          </Typography>
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
                        helperText={
                          fieldState.error?.message && "Tên không được bỏ trống"
                        }
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
                        helperText={
                          fieldState.error?.message && "Họ không được bỏ trống"
                        }
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
                          {fieldState.error?.message &&
                            "Giới tính không được bỏ trống"}
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
                                  "Ngày sinh không được bỏ trống và cần đúng định dạng"
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
                          "Email không được bỏ trống"
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
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message &&
                          "Mật khẩu không được bỏ trống"
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
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Đăng ký
          </Button>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Paper
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
          }}
        ></Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
