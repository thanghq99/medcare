import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
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
    id: "specialty",
    numeric: false,
    disablePadding: false,
    label: "Chuyên khoa",
  },
  {
    id: "degree",
    numeric: false,
    disablePadding: false,
    label: "Bằng cấp",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "examinationFee",
    numeric: true,
    disablePadding: false,
    label: "Giá khám",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

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
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
