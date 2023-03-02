import { TableHead, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const daysOfWeek = [
  {
    name: "Chủ nhật",
    day: 0,
  },
  {
    name: "Thứ 2",
    day: 1,
  },
  {
    name: "Thứ 3",
    day: 2,
  },
  {
    name: "Thứ 4",
    day: 3,
  },
  {
    name: "Thứ 5",
    day: 4,
  },
  {
    name: "Thứ 6",
    day: 5,
  },
  {
    name: "Thứ 7",
    day: 6,
  },
];

function CustomTableHead({ dateList }) {
  const getActualDateInDayOfWeek = (dayOfWeek) => {
    return dateList.find((d) => dayjs(d).day() === dayOfWeek);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            borderRight: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Typography>Tên bác sĩ</Typography>
        </TableCell>
        {daysOfWeek.map((d, index) => (
          <TableCell
            sx={{
              borderRight: d.day < 6 && "1px solid rgba(224, 224, 224, 1)",
            }}
            key={index}
          >
            <Typography>{d.name}</Typography>
            <Typography variant="subtitle2">
              {getActualDateInDayOfWeek(d.day)}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
