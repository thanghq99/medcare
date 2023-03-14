import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import axios from "../../api/axios";

import WeekSelector from "./WeekSelector";
import AlertDialog from "../../components/AlertModal";
import SelectMultipleDate from "./SelectMultipleDate";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const schema = Joi.object({
  dateList: Joi.array().min(1).items(Joi.date()).required(),
  staffId: Joi.number().required(),
  shiftId: Joi.number().required(),
  wayToSelectDate: Joi.string().valid("multipleDates", "wholeWeek"),
});

const defaultValues = {
  dateList: [],
  staffId: "",
  shiftId: "",
  wayToSelectDate: "multipleDates", //multipleDates and wholeWeek
};

function CreateShiftAssignment({ triggerReFetch }) {
  const [open, setOpen] = React.useState(false);
  const [doctorList, setDoctorList] = React.useState([]);
  const [shiftList, setShiftList] = React.useState([]);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(schema),
  });

  const watchWayToSelectDate = watch("wayToSelectDate");

  useEffect(() => {
    setDateList([]);
  }, [watchWayToSelectDate]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const doctors = await axios.post("staff/get-staffs", {
          searchName: "",
          disableFilter: false,
          degreeFilter: "",
          specialtyFilter: "",
          orderBy: "", // useless
          order: "DESC", //useless
          page: 1,
          pageSize: 1000,
        });
        const shifts = await axios.get("shift");
        setDoctorList(doctors.data.data.rows);
        setShiftList(shifts.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("fetched!");
    getData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await axios.post("/shift-assignment", data);
      console.log("shift assignment created", result);
      toast.success("Phân công lịch làm việc thành công!");
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant create shift assignment", error);
      if (error.response.status === 409) {
        toast.error(
          `Trùng thời gian làm việc trong ngày ${dayjs(
            error.response.data.data.conflictDate
          ).format("DD/MM/YYYY")}!`
        );
      } else toast.error("Có lỗi xảy ra!");
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

  const setDateList = (dateList) => {
    setValue("dateList", dateList);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Phân công ca làm việc
      </Button>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Phân công ca làm việc
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Controller
                  name="staffId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Bác sĩ"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message && "Cần chọn một bác sĩ"
                      }
                    >
                      {doctorList.map((d) => (
                        <MenuItem key={d.id} value={d.id}>
                          {`${d.account.firstName} ${d.account.lastName}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="shiftId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Ca làm việc"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message && "Cần chọn một bác sĩ"
                      }
                    >
                      {shiftList.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                          {s.startTime} - {s.endTime}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="wayToSelectDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl
                      error={!!fieldState.error || !!errors.dateList}
                    >
                      <FormLabel id="wayToSelectDate">
                        Cách chọn ngày:
                      </FormLabel>
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          value="multipleDates"
                          control={<Radio />}
                          label="Chọn (nhiều) ngày"
                        />
                        <FormControlLabel
                          value="wholeWeek"
                          control={<Radio />}
                          label="Chọn nguyên tuần"
                        />
                      </RadioGroup>
                      <FormHelperText>
                        {fieldState.error?.message &&
                          "Cần chọn một cách để chọn ngày"}
                      </FormHelperText>
                      <FormHelperText>
                        {errors.dateList?.message &&
                          "Cần chọn một cách để chọn ngày"}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                {getValues("wayToSelectDate") === "multipleDates" ? (
                  <SelectMultipleDate setDateList={setDateList} />
                ) : (
                  <WeekSelector
                    setDateList={setDateList}
                    needInitDates={true}
                  />
                )}
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
            Phân công
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateShiftAssignment;
