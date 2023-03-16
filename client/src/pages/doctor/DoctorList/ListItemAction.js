import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditDoctorForm from "./EditDoctorForm";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { Popover } from "@mui/material";

function ListItemAction({
  staffData,
  specialtyList,
  degreeList,
  triggerReFetch,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleIsDisabled = async () => {
    try {
      const result = await axios.post(
        `account/${staffData.account.id}/toggleIsDisabled`,
        { isDisabled: !staffData.account.isDisabled }
      );
      toast.success("Đã cập nhật trạng thái tài khoản!");
      console.log(!staffData.account.isDisabled);
      console.log("status updated", result);
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
        <EditDoctorForm
          staffData={staffData}
          triggerReFetch={triggerReFetch}
          specialtyList={specialtyList}
          degreeList={degreeList}
        />
        {staffData.account.isDisabled ? (
          <MenuItem disableRipple dense onClick={toggleIsDisabled}>
            <PersonAddIcon color="success" sx={{ mr: 2 }} /> Cho làm việc
          </MenuItem>
        ) : (
          <MenuItem disableRipple dense onClick={toggleIsDisabled}>
            <PersonRemoveIcon color="warning" sx={{ mr: 2 }} />
            Cho nghỉ việc
          </MenuItem>
        )}
      </Popover>
    </>
  );
}

export default ListItemAction;
