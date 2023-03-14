import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppointmentEditForm from "./AppointmentEditForm";
import DoctorNoteForm from "./DoctorNoteForm";
import AppointmentDecider from "./AppointmentDecider";
import ExaminationForm from "./ExaminationForm";
import ViewAndEditMedicine from "./ViewAndEditMedicine";
import ViewAndEditSubclinical from "./ViewAndEditSubclinicals";
import { Popover } from "@mui/material";
import AppointmentEditFormWithoutDoctor from "./AppointmentEditFormWithoutDoctor";
import CoordinatingAppointment from "./CoordinatingAppointment";
import AppointmentDetails from "./AppointmentDetails";
// import axios from "../../api/axios";

function ListItemAction({ appointmentData, triggerReFetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon></MoreVertIcon>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AppointmentDetails appointment={appointmentData} />
        <CoordinatingAppointment
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
        {appointmentData.staff !== null ||
        appointmentData.specialty !== null ? (
          <AppointmentEditForm
            appointment={appointmentData}
            triggerReFetch={triggerReFetch}
          />
        ) : (
          <AppointmentEditFormWithoutDoctor
            appointment={appointmentData}
            triggerReFetch={triggerReFetch}
          />
        )}
        <ExaminationForm
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
        <AppointmentDecider
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
        <DoctorNoteForm
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
        <ViewAndEditMedicine
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
        <ViewAndEditSubclinical
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
      </Popover>
    </>
  );
}

export default ListItemAction;
