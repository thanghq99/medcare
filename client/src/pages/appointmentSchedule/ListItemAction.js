import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppointmentEditForm from "./AppointmentEditForm";
import DoctorNoteForm from "./DoctorNoteForm";
import AppointmentDecider from "./AppointmentDecider";
import ExaminationForm from "./ExaminationForm";
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onKeyDown: (e) => e.stopPropagation() }}
      >
        <AppointmentEditForm
          appointment={appointmentData}
          triggerReFetch={triggerReFetch}
        />
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
      </Menu>
    </>
  );
}

export default ListItemAction;
