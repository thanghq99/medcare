import React from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

import AlertDialog from "../../components/AlertModal";
import axios from "../../api/axios";
import { getAvailableTimesOfEachShiftAssignment } from "../../utils/someDateGetters";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[24],
    fontSize: 16,
  },
}));

const schema = Joi.object({
  patientId: Joi.number().required(),
  appointmentDate: Joi.date().required(),
  appointmentTime: Joi.string().required(),
  reason: Joi.string().required(),
});

function AppointmentCreateForm({ triggerReFetch }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [availableTimes, setAvailableTimes] = React.useState([]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: {
      patientId: user.patientId,
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
    },
    resolver: joiResolver(schema),
  });

  // pick a time from form
  React.useEffect(() => {
    let defaultAvailableTimes = getAvailableTimesOfEachShiftAssignment({
      shift: {
        startTime: "07:00:00",
        endTime: "20:00:00",
      },
    });
    setAvailableTimes(defaultAvailableTimes);
  }, []);

  const onSubmit = async (data) => {
    console.log(getValues());

    try {
      const result = await axios.post("/record", getValues());
      console.log("created appointment", result);
      toast.success("Đặt lịch hẹn khám thành công!");
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant create appointment", error);
      toast.error("Có lỗi xảy ra!");
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Đặt lịch hẹn theo ngày
      </Button>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle sx={{ display: "flex" }}>
          <Typography
            variant="h5"
            component="p"
            onClick={() => console.log(errors)}
          >
            Đặt lịch hẹn theo ngày
          </Typography>
          <LightTooltip
            arrow
            title="Đặt lịch hẹn theo ngày bạn mong muốn và điều phối viên sẽ sắp xếp
              bác sĩ cho bạn. Thời gian của lịch hẹn có thể sẽ thay đổi nếu
              không có bác sĩ nào phù hợp trong thời gian bạn lựa chọn"
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </LightTooltip>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ my: 2, px: 2 }}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="appointmentDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        value={
                          field.value === ""
                            ? null
                            : dayjs(field.value).format("YYYY-MM-DD")
                        }
                        label="Ngày"
                        views={["day"]}
                        minDate={dayjs().add(1, "day")}
                        maxDate={dayjs().add(1, "month")}
                        onChange={(e) => {
                          field.onChange(e.format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => (
                          <>
                            <TextField
                              {...params}
                              fullWidth
                              onKeyDown={onKeyDown}
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error?.message && "Cần chọn một ngày"
                              }
                            />
                          </>
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="appointmentTime"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      disabled={getValues("appointmentDate") === ""}
                      select
                      fullWidth
                      label="Giờ"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message && "Cần chọn một giờ"
                      }
                    >
                      {availableTimes &&
                        availableTimes.map((time, index) => (
                          <MenuItem key={index} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="reason"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Lý do khám"
                      multiline
                      rows={4}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message && "Cần nhập lý do khám"
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          {isDirty ? (
            <AlertDialog action={handleClose} />
          ) : (
            <Button onClick={handleClose}>Hủy</Button>
          )}
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Đặt lịch
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppointmentCreateForm;
