import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import axios from "../../../api/axios";
import EditPatientForm from "./EditPatientForm";
import { toast } from "react-toastify";
import { Popover } from "@mui/material";

function ListItemAction({ patientData, triggerReFetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    account: { id, isDisabled },
  } = patientData;

  const toggleIsDisabled = async () => {
    try {
      const result = await axios.post(`account/${id}/toggleIsDisabled`, {
        isDisabled: !isDisabled,
      });
      console.log(!isDisabled);
      console.log("status updated", result);
      toast.success("Đã cập nhật trạng thái tài khoản!");
      handleClose();
      triggerReFetch();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra!");
      handleClose();
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon></MoreVertIcon>
      </IconButton>
      <Popover anchorEl={anchorEl} open={open} onClose={handleClose}>
        <EditPatientForm
          patientData={patientData}
          triggerReFetch={triggerReFetch}
        />
        {isDisabled ? (
          <MenuItem disableRipple dense onClick={toggleIsDisabled}>
            <PersonAddIcon color="success" sx={{ mr: 2 }} /> Khôi phục tài khoản
          </MenuItem>
        ) : (
          <MenuItem disableRipple dense onClick={toggleIsDisabled}>
            <PersonRemoveIcon color="warning" sx={{ mr: 2 }} />
            Khóa tài khoản
          </MenuItem>
        )}
      </Popover>
    </>
  );
}

export default ListItemAction;
