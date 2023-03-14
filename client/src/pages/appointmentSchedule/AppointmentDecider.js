import React from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { MenuItem } from "@mui/material";
import { toast } from "react-toastify";

function AppointmentDecider({ appointment, triggerReFetch }) {
  const { user } = useAuth();
  const decide = async (decision) => {
    try {
      const result = await axios.put(`/record/${appointment.id}`, {
        status: decision,
      });
      console.log(`chọn ${decision}`, result);
      toast.success("Chỉnh sửa lịch hẹn khám thành công!");
      if (decision === "accepted") toast.success("Chấp nhận lịch khám!");
      if (decision === "canceled") toast.success("Hủy lịch khám!");
      triggerReFetch();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra!");
    }
  };
  if (appointment.status === "requested") {
    if (user.staffId === appointment.staffId) {
      return (
        <>
          <MenuItem disableRipple dense onClick={() => decide("accepted")}>
            <CheckCircleOutlineIcon sx={{ mr: 2 }} />
            Chấp nhận
          </MenuItem>
          <MenuItem disableRipple dense onClick={() => decide("canceled")}>
            <HighlightOffIcon sx={{ mr: 2 }} />
            Từ chối
          </MenuItem>
        </>
      );
    } else if (user.patientId === appointment.patientId) {
      return (
        <MenuItem disableRipple dense onClick={() => decide("canceled")}>
          <HighlightOffIcon sx={{ mr: 2 }} />
          Hủy hẹn
        </MenuItem>
      );
    }
  } else return;
}

export default AppointmentDecider;
