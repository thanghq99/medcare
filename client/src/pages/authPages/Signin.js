import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import BackgroundImage from "./signin-bg.jpg";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { publicAPI as axios } from "./../../api/axios";
import { useNavigate, redirect } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

import { toast } from "react-toastify";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

const defaultValues = {
  email: "",
  password: "",
};

function Signin() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("authentication/login", data);
      console.log(result.data.data);
      login(result.data.data.user, result.data.data.accessToken);
      toast.success("Đăng nhập thành công!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("signed in");
    } catch (error) {
      console.log("cant sign in", error);
      if (error.response.status === 401)
        toast.error("Email hoặc mật khẩu không chính xác!");
      else toast.error("Có lỗi xảy ra!");
    }
  };
  return (
    <Grid container>
      <Grid item xs={5}>
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
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    "Email không được để trống và cần phải đúng định dạng"
                  }
                  sx={{ mb: 1.5 }}
                />
              )}
            />
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
                    fieldState.error?.message && "Mật khẩu không được bỏ trống"
                  }
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  variant="text"
                  onClick={() => navigate("/auth/lay-lai-mat-khau")}
                >
                  Quên mật khẩu
                </Button>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  Chưa có tài khoản?
                  <Button
                    variant="text"
                    onClick={() => navigate("/auth/dang-ky")}
                  >
                    Đăng ký ngay
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid item xs={7}>
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

export default Signin;
