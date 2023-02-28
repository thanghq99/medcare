import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditShiftForm from "./EditShiftForm";
import axios from "../../../api/axios";

function ListItemAction({ shift, triggerReFetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteSpecialty = async () => {
    try {
      const result = await axios.delete(`shift/${shift.id}`);
      console.log("shift deleted", result);
      handleClose();
      triggerReFetch();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon></MoreVertIcon>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <EditShiftForm
          shift={shift}
          triggerReFetch={triggerReFetch}
          handleCloseMenu={handleClose}
        />

        <MenuItem disableRipple dense onClick={deleteSpecialty}>
          <DeleteForeverIcon color="error" sx={{ mr: 2 }} /> Xóa
        </MenuItem>
      </Menu>
    </>
  );
}

export default ListItemAction;
