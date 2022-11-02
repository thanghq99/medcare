import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Họ và tên",
  },
  {
    id: "dob",
    numeric: false,
    disablePadding: false,
    label: "Ngày sinh",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Giới tính",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "examinationTimes",
    numeric: true,
    disablePadding: false,
    label: "Số lần khám",
  },
  {
    id: "hasAccount",
    numeric: false,
    disablePadding: false,
    label: "Có tài khoản?",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ height: 60, borderRadius: 0 }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
