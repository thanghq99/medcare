import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ action }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAction = () => {
    action();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Hủy</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Không lưu dữ liệu?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dữ liệu đã nhập chưa được lưu. Bạn có muốn thoát?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Xem xét</Button>
          <Button onClick={handleAction} autoFocus variant="contained">
            Không lưu nữa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
