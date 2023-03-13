import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import BackgroundImage from "./renew-bg.jpg";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { publicAPI as axios } from "./../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const defaultValues = {
  email: "",
};
function RenewPassword() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

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
    console.log(data);

    try {
      const result = await axios.post("authentication/renew-password", data);
      console.log("renewed password", result);
      setSuccess(true);
    } catch (error) {
      console.log("cant renew password", error);
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
          {success === false ? (
            <>
              <Typography
                fontWeight={4}
                variant="h4"
                onClick={() => console.log(errors)}
              >
                Lấy lại mật khẩu
              </Typography>
              <Typography gutterBottom variant="subtitle">
                Mật khẩu mới sẽ được tự động tạo và gửi về email của bạn
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
                  Lấy lại mật khẩu mới
                </Button>
                <Box display="flex" alignItems="center">
                  Trong trường hợp bạn đã nhớ lại,
                  <Button
                    variant="text"
                    onClick={() => navigate("/auth/dang-nhap")}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              </form>
            </>
          ) : (
            <>
              <Typography gutterBottom fontWeight={4} variant="h4">
                Thành công! Mật khẩu mới đã được gửi về email của bạn.
              </Typography>
              <Box display="flex" alignItems="center">
                <Button
                  variant="text"
                  onClick={() => navigate("/auth/dang-nhap")}
                >
                  Đăng nhập
                </Button>
                ngay!
              </Box>
            </>
          )}
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

export default RenewPassword;
