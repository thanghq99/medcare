import {
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
import dayjs from "dayjs";
import { Stack } from "@mui/system";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

const daysOfWeek = [...Array(7).keys()];

function WorkScheduleList({
  shiftAssignmentList,
  triggerReFetch,
  doctorList,
  dateList,
}) {
  const { user } = useAuth();

  const isStaffAndAdmin = () => {
    return user.isStaff === true && user.isAdmin === true;
  };

  shiftAssignmentList = shiftAssignmentList.map((sa, index) => {
    const dayOfWeek = dayjs(sa.date).day();
    return { ...sa, dayOfWeek: dayOfWeek };
  });
  //   console.log(shiftAssignmentList);
  //   console.log(doctorList);

  const deleteShiftAssignment = async (id) => {
    const result = await axios.delete(`/shift-assignment/${id}`);
    console.log(result);
    triggerReFetch();
  };
  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper} sx={{ position: "relative" }}>
          <Table sx={{ minWidth: 750 }} size={"small"}>
            <CustomTableHead dateList={dateList} />
            <TableBody>
              {doctorList.map((row, index) => (
                <TableRow key={index} sx={{ minHeight: "100px" }}>
                  <TableCell
                    sx={{
                      width: "150px",
                      height: "100px",
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    {row.account.firstName} {row.account.lastName}
                  </TableCell>
                  {daysOfWeek.map((col, index) => {
                    const filteredShiftAssignments = shiftAssignmentList.filter(
                      (sa) => {
                        if (sa.staffId === row.id && sa.dayOfWeek === col)
                          return sa;
                      }
                    );
                    return (
                      <TableCell
                        key={index}
                        sx={{
                          width: "150px",
                          verticalAlign: "top",
                          borderRight:
                            col < 6 && "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="flex-start"
                        >
                          {filteredShiftAssignments.map((fsa, index) => (
                            <Chip
                              key={index}
                              label={`${fsa.shift.startTime.slice(
                                0,
                                5
                              )} - ${fsa.shift.endTime.slice(0, 5)}`}
                              onDelete={
                                isStaffAndAdmin()
                                  ? () => deleteShiftAssignment(fsa.id)
                                  : null
                              }
                            />
                          ))}
                        </Stack>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default WorkScheduleList;
