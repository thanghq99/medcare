import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import CustomTableHead from "./CustomTableHead";
import ListItemAction from "./ListItemAction";
import CustomTablePagination from "../../components/TablePagination";

const statusChips = {
  requested: <Chip color="warning" label="Đã yêu cầu" />,
  accepted: <Chip color="info" label="Đã chấp nhận" />,
  done: <Chip color="success" label="Đã hoàn thành" />,
  canceled: <Chip color="error" label="Đã hủy" />,
};

function AppointmentList({
  triggerRefetch,
  appointmentList,
  page,
  pageSize,
  appointmentCount,
  setValue,
}) {
  console.log(appointmentList);
  const emptyRows =
    page >= 1 ? Math.max(0, page * pageSize - appointmentCount) : 0;
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer component={Paper} sx={{ position: "relative" }}>
        <Table sx={{ minWidth: 750 }} size={"small"}>
          <CustomTableHead />
          <TableBody>
            {appointmentList.map((a, index) => (
              <TableRow
                key={index}
                style={{
                  height: 73,
                }}
              >
                <TableCell>
                  {a.patient?.account.firstName +
                    " " +
                    a.patient?.account.lastName}
                </TableCell>
                <TableCell>
                  {a.staff !== null
                    ? a.staff?.account.firstName +
                      " " +
                      a.staff?.account.lastName
                    : "Chưa có"}
                </TableCell>
                <TableCell>{a.appointmentDate}</TableCell>
                <TableCell>{a.appointmentTime.slice(0, 5)}</TableCell>
                <TableCell>{a.specialty?.name || "Chưa có"}</TableCell>
                {/* <TableCell>{a.doctorNote}</TableCell>
                <TableCell>{a.reason}</TableCell> */}
                <TableCell>{a.currentExaminationFee}</TableCell>
                <TableCell width="100px">
                  {statusChips[`${a.status}`]}
                </TableCell>
                {/* "requested", "accepted", "done", "canceled" */}
                <TableCell align="right">
                  <ListItemAction
                    appointmentData={a}
                    triggerReFetch={triggerRefetch}
                  />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 73 * emptyRows,
                }}
              >
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "relative",
          my: 1,
        }}
      >
        <CustomTablePagination
          triggerReFetch={triggerRefetch}
          page={page}
          pageSize={pageSize}
          count={appointmentCount}
          setValue={setValue}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </Paper>
  );
}

export default AppointmentList;
