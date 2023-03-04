import { TableHead, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const cols = [
  {
    name: "Bệnh nhân",
    numeric: false,
  },
  {
    name: "Bác sĩ",
    numeric: false,
  },
  {
    name: "Ngày hẹn",
    numeric: false,
  },
  {
    name: "Giờ hẹn",
    numeric: false,
  },
  {
    name: "Chuyên khoa",
    numeric: false,
  },
  {
    name: "Lời nhắn của bác sĩ",
    numeric: false,
  },
  {
    name: "Lý do khám",
    numeric: false,
  },
  {
    name: "Trạng thái",
    numeric: false,
  },
  {
    name: "",
    numeric: false,
  },
];

function CustomTableHead() {
  return (
    <TableHead sx={{ height: 60, borderRadius: 0 }}>
      <TableRow>
        {cols.map((c, index) => (
          <TableCell
            sx={{
              borderRight: c.day < 6 && "1px solid rgba(224, 224, 224, 1)",
            }}
            key={index}
          >
            <Typography>{c.name}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
