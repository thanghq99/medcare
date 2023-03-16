import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditSpecialtyForm from "./EditSpecialtyForm";
import axios from "../../../api/axios";
import { Popover } from "@mui/material";

function ListItemAction({ specialty, triggerReFetch }) {
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
      const result = await axios.delete(`specialty/${specialty.id}`);
      console.log("specialty deleted", result);
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
      <Popover anchorEl={anchorEl} open={open} onClose={handleClose}>
        <EditSpecialtyForm
          specialty={specialty}
          triggerReFetch={triggerReFetch}
        />

        <MenuItem disableRipple dense onClick={deleteSpecialty}>
          <DeleteForeverIcon color="error" sx={{ mr: 2 }} /> Xóa
        </MenuItem>
      </Popover>
    </>
  );
}

export default ListItemAction;
