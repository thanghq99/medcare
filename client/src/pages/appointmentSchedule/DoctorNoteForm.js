import React from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

import AlertDialog from "../../components/AlertModal";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const schema = Joi.object({
  doctorNote: Joi.string().required().allow(""),
});

function AppointmentEditForm({ appointment, triggerReFetch }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: {
      doctorNote: appointment.doctorNote,
    },
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(getValues());

    try {
      const result = await axios.put(`/record/${appointment.id}`, getValues());
      console.log("added note to appointment", result);
      toast.success("Đã gửi lời nhắn!");
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant add note to appointment", error);
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

  if (
    (user.staffId === appointment.staffId &&
      appointment.status === "requested") ||
    (user.staffId === appointment.staffId && appointment.status === "accepted")
  )
    return (
      <>
        <MenuItem disableRipple dense onClick={handleOpen}>
          <SpeakerNotesIcon sx={{ mr: 2 }} />
          Gửi lời nhắn
        </MenuItem>
        <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
          <DialogTitle>
            <Typography variant="h5" component="p">
              Gửi lời nhắn
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="doctorNote"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    sx={{ mt: 1 }}
                    {...field}
                    fullWidth
                    label="Lời nhắn cho bệnh nhân"
                    multiline
                    rows={4}
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message && "Cần nhập lời nhắn"
                    }
                  />
                )}
              />
            </form>
          </DialogContent>
          <DialogActions>
            {isDirty ? (
              <AlertDialog action={handleClose} />
            ) : (
              <Button onClick={handleClose}>Hủy</Button>
            )}
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Gửi
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  else return;
}

export default AppointmentEditForm;
