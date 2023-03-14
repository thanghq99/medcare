import React from "react";

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

import useAuth from "../../hooks/useAuth";

const ReadOnlyMultilineTextfield = ({ defaultValue }) => {
  return (
    <TextField
      fullWidth
      multiline
      defaultValue={defaultValue}
      inputProps={{
        readOnly: true,
      }}
    />
  );
};

const statusChips = {
  requested: <Chip color="warning" label="Đã yêu cầu" />,
  accepted: <Chip color="info" label="Đã chấp nhận" />,
  done: <Chip color="success" label="Đã hoàn thành" />,
  canceled: <Chip color="error" label="Đã hủy" />,
};

function AppointmentDetails({ appointment }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MenuItem disableRipple dense onClick={handleOpen}>
        <MedicalInformationIcon sx={{ mr: 2 }} />
        Chi tiết lịch hẹn
      </MenuItem>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Chi tiết lịch hẹn
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center" sx={{ my: 2, px: 2 }}>
            <Grid item xs={6}>
              Chuyên khoa:{" "}
              <Typography fontWeight={600}>
                {appointment.specialty?.name || "Chưa có"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Giá khám:{" "}
              <Typography fontWeight={600}>
                {appointment.currentExaminationFee}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Bác sĩ:{" "}
              <Typography fontWeight={600}>
                {appointment.staff !== null
                  ? appointment.staff?.account.firstName +
                    " " +
                    appointment.staff?.account.lastName
                  : "Chưa có"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Trạng thái: <br />
              {statusChips[`${appointment.status}`]}
            </Grid>
            <Grid item xs={6}>
              Ngày hẹn:{" "}
              <Typography fontWeight={600}>
                {appointment.appointmentDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Giờ hẹn:{" "}
              <Typography fontWeight={600}>
                {appointment.appointmentTime}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ my: 2, px: 2 }}
          >
            <Grid item xs={6}>
              Lý do khám:
              <br />
              <ReadOnlyMultilineTextfield defaultValue={appointment.reason} />
            </Grid>
            <Grid item xs={6}>
              Lời nhắn của bác sĩ
              <br />
              <ReadOnlyMultilineTextfield
                defaultValue={appointment.doctorNote}
              />
            </Grid>
            <Grid item xs={6}>
              Thông tin khám lâm sàng
              <br />
              <ReadOnlyMultilineTextfield
                defaultValue={appointment.clinicalInformation}
              />
            </Grid>
            <Grid item xs={6}>
              Chẩn đoán
              <br />
              <ReadOnlyMultilineTextfield defaultValue={appointment.diagnose} />
            </Grid>
            <Grid item xs={6}>
              Hướng điều trị
              <br />
              <ReadOnlyMultilineTextfield
                defaultValue={appointment.treatmentDirection}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" sx={{ my: 2, px: 2 }}>
            <Grid item xs={6}>
              Chiều cao:{" "}
              <Typography component="span" fontWeight={600}>
                {appointment.height} m
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Cân nặng:{" "}
              <Typography component="span" fontWeight={600}>
                {appointment.weight} kg
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Nhiệt độ:{" "}
              <Typography component="span" fontWeight={600}>
                {appointment.temperature} độ
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Huyết áp:{" "}
              <Typography component="span" fontWeight={600}>
                {appointment.bloodPressure} mmHg
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Nhịp tim:{" "}
              <Typography component="span" fontWeight={600}>
                {appointment.heartRate} nhịp/phút
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Nhịp thở:{" "}
              <Typography component="span" fontWeight={600}>
                {appointment.respirationRate} nhịp/phút
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppointmentDetails;
