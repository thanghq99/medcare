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
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import AlertDialog from "../../components/AlertModal";
import axios from "../../api/axios";
import {
  getAllDatesInOneMonthFromCurrentDate,
  getAvailableDates,
  getAvailableTimes,
} from "../../utils/someDateGetters";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const schema = Joi.object({
  appointmentDate: Joi.date().required(),
  appointmentTime: Joi.string().required(),
  reason: Joi.string().required(),
});

function AppointmentEditForm({ appointment, triggerReFetch }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const [shiftAssignmentList, setShiftAssignmentList] = React.useState([]);
  const [availableDates, setAvailableDates] = React.useState([]);
  const [availableTimes, setAvailableTimes] = React.useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: {
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime.slice(0, 5),
      reason: appointment.reason,
    },
    resolver: joiResolver(schema),
  });

  const watchAppointmentDate = watch("appointmentDate");

  React.useEffect(() => {
    const getData = async () => {
      const shiftAssignments = await axios.post(
        "/shift-assignment/get-shift-assignment",
        {
          staffId: appointment.staffId,
          shiftId: null,
          dateList: getAllDatesInOneMonthFromCurrentDate(),
        }
      );
      setShiftAssignmentList(shiftAssignments.data.data);
      let newAvailableDates = getAvailableDates(shiftAssignments.data.data);
      setAvailableDates(newAvailableDates);
      if (getValues("appointmentDate") !== "") {
        let initAvailableTimes = getAvailableTimes(
          shiftAssignments.data.data,
          getValues("appointmentDate")
        );
        setAvailableTimes(initAvailableTimes);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    let newAvailableTimes = getAvailableTimes(
      shiftAssignmentList,
      getValues("appointmentDate")
    );
    setAvailableTimes(newAvailableTimes);
  }, [watchAppointmentDate]);

  const shouldDisableDate = (date) => !availableDates.includes(date);

  const onSubmit = async (data) => {
    console.log(getValues());

    try {
      const result = await axios.put(`/record/${appointment.id}`, getValues());
      console.log("updated appointment", result);
      toast.success("Chỉnh sửa lịch hẹn khám thành công!");
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant update appointment", error);
      toast.success("Có lỗi xảy ra!");
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

  if (
    appointment.status === "requested" &&
    user.patientId === appointment.patientId
  )
    return (
      <>
        <MenuItem disableRipple dense onClick={handleOpen}>
          <EditIcon sx={{ mr: 2 }} />
          Sửa lịch hẹn
        </MenuItem>
        <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
          <DialogTitle>
            <Typography variant="h5" component="p">
              Sửa lịch hẹn
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ my: 2, px: 2 }}
              >
                <Grid item xs={12} md={6} lg={3}>
                  <TextField
                    fullWidth
                    defaultValue={appointment.specialty.name}
                    disabled
                    label="Chuyên khoa"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <TextField
                    fullWidth
                    defaultValue={`${appointment.staff.account.firstName} ${appointment.staff.account.lastName}`}
                    disabled
                    label="Bác sĩ"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Controller
                    name="appointmentDate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          shouldDisableDate={(date) =>
                            shouldDisableDate(date.format("YYYY-MM-DD"))
                          }
                          label="Ngày"
                          views={["day"]}
                          minDate={dayjs().add(1, "day")}
                          maxDate={dayjs().add(1, "month")}
                          onChange={(e) => {
                            field.onChange(e.format("YYYY-MM-DD"));
                            setValue("appointmentTime", "");
                          }}
                          renderInput={(params) => (
                            <>
                              <TextField
                                {...params}
                                fullWidth
                                onKeyDown={onKeyDown}
                                error={!!fieldState.error}
                                helperText={
                                  fieldState.error?.message &&
                                  "Cần chọn một ngày"
                                }
                              />
                            </>
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
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
              Sửa lịch
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  else return;
}

export default AppointmentEditForm;
