import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from "@mui/material";

import React from "react";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import axios from "../../../api/axios";

import AlertDialog from "../../../components/AlertModal";

const schema = Joi.object({
  name: Joi.string().required(),
});

const defaultValues = {
  name: "",
};

function CreateSpecialtyForm({ triggerReFetch }) {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await axios.post("specialty", data);
      console.log("specialty created", result);
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant create specialty", error);
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
      <Button variant="contained" onClick={handleOpen}>
        Thêm chuyên khoa mới
      </Button>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Thêm chuyên khoa mới
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
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateSpecialtyForm;
