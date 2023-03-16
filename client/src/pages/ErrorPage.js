import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const goBackToLastPage = () => {
    navigate("/");
  };
  return (
    <Container
      mx="auto"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" align="center">
        404 ERROR!
      </Typography>
      <Typography variant="h5" align="center">
        Xin lỗi, hiện tại bạn không thể truy cập trang này.
      </Typography>
      <Button variant="contained" onClick={goBackToLastPage} sx={{ mt: 3 }}>
        Trở lại trang chủ
      </Button>
    </Container>
  );
}

export default ErrorPage;
