import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditDegreeForm from "./EditDegreeForm";
import axios from "../../../api/axios";
import { Popover } from "@mui/material";

function ListItemAction({ degree, triggerReFetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteDegree = async () => {
    try {
      const result = await axios.delete(`degree/${degree.id}`);
      console.log("degree deleted", result);
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
        <EditDegreeForm degree={degree} triggerReFetch={triggerReFetch} />

        <MenuItem disableRipple dense onClick={deleteDegree}>
          <DeleteForeverIcon color="error" sx={{ mr: 2 }} /> Xóa
        </MenuItem>
      </Popover>
    </>
  );
}

export default ListItemAction;
