import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditSubclinicalForm from "./EditSubclinicalForm";
import axios from "../../../api/axios";

function ListItemAction({ subclinical, triggerReFetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteSubclinical = async () => {
    try {
      const result = await axios.delete(`subclinical/${subclinical.id}`);
      console.log("subclinical deleted", result);
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
        <EditSubclinicalForm
          subclinical={subclinical}
          triggerReFetch={triggerReFetch}
        />

        <MenuItem disableRipple dense onClick={deleteSubclinical}>
          <DeleteForeverIcon color="error" sx={{ mr: 2 }} /> Xóa
        </MenuItem>
      </Menu>
    </>
  );
}

export default ListItemAction;
