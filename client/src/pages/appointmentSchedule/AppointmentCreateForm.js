import React from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Autocomplete,
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
  staffId: Joi.number().required(),
  patientId: Joi.number().required(),
  specialtyId: Joi.number().required(),
  appointmentDate: Joi.date().required(),
  appointmentTime: Joi.string().required(),
  reason: Joi.string().required(),
  currentExaminationFee: Joi.number().required(),
});

function AppointmentCreateForm({ triggerReFetch }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const [doctorList, setDoctorList] = React.useState([]);
  const [specialtyList, setSpecialtyList] = React.useState([]);
  const [shiftAssignmentList, setShiftAssignmentList] = React.useState([]);
  const [staffId, setStaffId] = React.useState(null);
  const [specialtyId, setSpecialtyId] = React.useState(null);
  const [inputStaffId, setInputStaffId] = React.useState("");
  const [inputSpecialtyId, setInputSpecialtyId] = React.useState("");
  const [availableDates, setAvailableDates] = React.useState([]);
  const [availableTimes, setAvailableTimes] = React.useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: {
      staffId: null,
      patientId: user.patientId,
      specialtyId: null,
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      currentExaminationFee: 0,
    },
    resolver: joiResolver(schema),
  });

  const watchSpecialtyId = watch("specialtyId");
  const watchStaffId = watch("staffId");
  const watchAppointmentDate = watch("appointmentDate");

  //first pick a specialty from form
  React.useEffect(() => {
    const getData = async () => {
      try {
        const specialties = await axios.get("specialty");
        setSpecialtyList(specialties.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // console.log("first: fetched specialties in appointment create form!");
    getData();
  }, []);

  //after picking a specialty from form, fetch doctor according to specialty and then pick a doctor and a date
  React.useEffect(() => {
    setValue("staffId", null);
    setValue("appointmentDate", "");
    setValue("appointmentTime", "");
    setStaffId(null);
    setInputStaffId("");
    //only fetch if theres a specialtyId or the api call will be error
    if (specialtyId !== null) {
      const getData = async () => {
        try {
          const doctors = await axios.post("staff/get-staffs", {
            searchName: "",
            disableFilter: false,
            degreeFilter: "",
            specialtyFilter: getValues("specialtyId"),
            orderBy: "", // useless
            order: "DESC", //useless
            page: 1,
            pageSize: 1000,
          });
          setDoctorList(doctors.data.data.rows);
        } catch (error) {
          console.log(error);
        }
      };
      //   console.log(
      //     "second: after choosing specialty: fetched doctors in appointment create form!"
      //   );
      getData();
    }
  }, [watchSpecialtyId]);

  //after picking a doctor, fetch shift assignment according to those then pick a time
  React.useEffect(() => {
    setValue("appointmentDate", "");
    setValue("appointmentTime", "");
    //only fetch if there are a specialtyId, a staffId or the api call will be error
    if (specialtyId !== null && staffId !== null) {
      const getData = async () => {
        const shiftAssignments = await axios.post(
          "/shift-assignment/get-shift-assignment",
          {
            staffId: getValues("staffId"),
            shiftId: null,
            dateList: getAllDatesInOneMonthFromCurrentDate(),
          }
        );
        setShiftAssignmentList(shiftAssignments.data.data);
        let newAvailableDates = getAvailableDates(shiftAssignments.data.data);
        setAvailableDates(newAvailableDates);
      };
      //   console.log(
      //     "third: after choosing specialty and doctor: fetched shift assignments in appointment create form!"
      //   );
      getData();
    }
  }, [watchStaffId]);

  //last pick a time from form
  React.useEffect(() => {
    setValue("appointmentTime", "");
    if (
      specialtyId !== null &&
      staffId !== null &&
      getValues("appointmentDate") !== ""
    ) {
      let newAvailableTimes = getAvailableTimes(
        shiftAssignmentList,
        getValues("appointmentDate")
      );
      // console.log(newAvailableTimes);
      setAvailableTimes(newAvailableTimes);
    }
  }, [watchAppointmentDate]);

  const shouldDisableDate = (date) => !availableDates.includes(date);

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
    setStaffId(null);
    setSpecialtyId(null);
    setInputStaffId("");
    setInputSpecialtyId("");
    setOpen(false);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Đặt lịch hẹn theo bác sĩ
      </Button>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Đặt lịch hẹn theo bác sĩ
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
                <Autocomplete
                  value={specialtyId}
                  onChange={(event, newValue) => {
                    setSpecialtyId(newValue);
                    setValue(
                      "specialtyId",
                      newValue === null ? null : newValue.id
                    );
                  }}
                  getOptionLabel={(option) => `${option.name}`}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  inputValue={inputSpecialtyId}
                  onInputChange={(event, newInputValue) => {
                    setInputSpecialtyId(newInputValue);
                    clearErrors("specialtyId");
                  }}
                  options={specialtyList}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.specialtyId}
                      helperText={
                        errors.specialtyId?.message &&
                        "Cần chọn một chuyên khoa"
                      }
                      label="Chuyên khoa"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Autocomplete
                  disabled={specialtyId === null}
                  value={staffId}
                  onChange={(event, newValue) => {
                    setStaffId(newValue);
                    setValue("staffId", newValue === null ? null : newValue.id);
                    setValue(
                      "currentExaminationFee",
                      newValue === null ? 0 : newValue.examinationFee
                    );
                  }}
                  getOptionLabel={(option) =>
                    `${option.account.firstName} ${option.account.lastName}`
                  }
                  renderOption={(props, option) => (
                    <span
                      {...props}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <span>
                        {option.degree !== null ? option.degree.name : ""}{" "}
                        {option.account.firstName} {option.account.lastName}
                      </span>
                      <span>Giá: {option.examinationFee} VND</span>
                    </span>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  inputValue={inputStaffId}
                  onInputChange={(event, newInputValue) => {
                    setInputStaffId(newInputValue);
                    clearErrors("staffId");
                  }}
                  options={doctorList}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!errors.staffId}
                      helperText={
                        errors.staffId?.message && "Cần chọn một bác sĩ"
                      }
                      label="Bác sĩ"
                    />
                  )}
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
                        value={
                          field.value === ""
                            ? null
                            : dayjs(field.value).format("YYYY-MM-DD")
                        }
                        disabled={staffId === null}
                        shouldDisableDate={(date) =>
                          shouldDisableDate(date.format("YYYY-MM-DD"))
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
            Đặt lịch
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppointmentCreateForm;
