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
import { toast } from "react-toastify";

const schema = Joi.object({
  name: Joi.string().required(),
});

function EditDegreeForm({ degree, triggerReFetch }) {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: {
      name: degree.name,
    },
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await axios.put(`degree/${degree.id}`, data);
      console.log("degree updated", result);
      toast.success("Bằng cấp chỉnh sửa thành công!");
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant update degree", error);
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

  return (
    <>
      <MenuItem disableRipple dense onClick={handleOpen}>
        <EditIcon sx={{ mr: 2 }} />
        Xem & Chỉnh sửa
      </MenuItem>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Chỉnh sửa bằng cấp
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
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Tên bằng cấp"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message && "Cần nhập tên bằng cấp"
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
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditDegreeForm;
