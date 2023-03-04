import {
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import axios from "../../../api/axios";
import { getDayjsDate } from "../../../utils/timePickerFormatter";

import AlertDialog from "../../../components/AlertModal";

const schema = Joi.object({
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

function CreateShiftForm({ shift, triggerReFetch, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      startTime: shift.startTime,
      endTime: shift.endTime,
    },
    resolver: joiResolver(schema),
  });

  watch();

  const parseStartDateTime = getDayjsDate(getValues("startTime"));
  const parseEndDateTime = getDayjsDate(getValues("endTime"));

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await axios.put(`shift/${shift.id}`, data);
      console.log("shift updated", result);
      triggerReFetch();
      handleClose();
      handleCloseMenu();
    } catch (error) {
      console.log("cant update shift", error);
      handleClose();
      handleCloseMenu();
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
      <MenuItem disableRipple dense onClick={handleOpen}>
        <EditIcon sx={{ mr: 2 }} />
        Xem & Chỉnh sửa
      </MenuItem>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Chỉnh sửa ca làm việc
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={2}>
              <Controller
                name="startTime"
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      {...field}
                      label="Thời gian bắt đầu"
                      value={parseStartDateTime}
                      onChange={(e) => {
                        field.onChange(e.format("HH:mm:ss"));
                      }}
                      ampm={false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          onKeyDown={onKeyDown}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      {...field}
                      label="Thời gian kết thúc"
                      value={parseEndDateTime}
                      onChange={(e) => {
                        field.onChange(e.format("HH:mm:ss"));
                      }}
                      ampm={false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          onKeyDown={onKeyDown}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          {isDirty ? (
            <AlertDialog action={handleClose} />
          ) : (
            <Button onClick={handleClose}>Hủy</Button>
          )}
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateShiftForm;
