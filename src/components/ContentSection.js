import React from "react";
import { Paper as MuiPaper } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomPaper = styled(MuiPaper)(({ theme }) => ({
  padding: 24,
  borderRadius: 16
}));

export default function ContentSection(props) {
  return <CustomPaper elevation={6} {...props}></CustomPaper>;
}