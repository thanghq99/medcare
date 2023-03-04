import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import axios from "../../../api/axios";

import AlertDialog from "../../../components/AlertModal";

const schema = Joi.object({
  name: Joi.string().required(),
});

function CreateSpecialtyForm({ specialty, triggerReFetch }) {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: {
      name: specialty.name,
    },
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await axios.put(`specialty/${specialty.id}`, data);
      console.log("specialty updated", result);
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant update specialty", error);
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

  return (
    <>
      <MenuItem disableRipple dense onClick={handleOpen}>
        <EditIcon sx={{ mr: 2 }} />
        Xem & Chỉnh sửa
      </MenuItem>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Chỉnh sửa chuyên khoa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Tên chuyên khoa"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
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
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateSpecialtyForm;
