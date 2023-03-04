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
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import AlertDialog from "../../components/AlertModal";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const schema = Joi.object({
  clinicalInformation: Joi.string().required(),
  height: Joi.number(),
  weight: Joi.number(),
  bloodPressure: Joi.number(),
  heartRate: Joi.number(),
  respirationRate: Joi.number(),
  temperature: Joi.number(),
  diagnose: Joi.string().required(),
  treatmentDirection: Joi.string().required(),
});

function ExaminationForm({ appointment, triggerReFetch }) {
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
      clinicalInformation: appointment.clinicalInformation,
      height: appointment.height,
      weight: appointment.weight,
      bloodPressure: appointment.bloodPressure,
      heartRate: appointment.heartRate,
      respirationRate: appointment.respirationRate,
      temperature: appointment.temperature,
      diagnose: appointment.diagnose,
      treatmentDirection: appointment.treatmentDirection,
    },
    resolver: joiResolver(schema),
  });

  React.useEffect(() => {
    const getData = async () => {};
    getData();
  }, []);

  const onSubmit = async (data) => {
    console.log(getValues());

    try {
      let submitData = getValues();
      submitData.status = "done";
      submitData.bloodPressure = parseInt(submitData.bloodPressure);
      submitData.heartRate = parseInt(submitData.heartRate);
      submitData.respirationRate = parseInt(submitData.respirationRate);
      submitData.height = parseFloat(submitData.height).toFixed(1);
      submitData.weight = parseFloat(submitData.weight).toFixed(1);
      submitData.temperature = parseFloat(submitData.temperature).toFixed(1);
      console.log(submitData);
      const result = await axios.put(`/record/${appointment.id}`, submitData);
      console.log("updated appointment", result);
      triggerReFetch();
      handleClose();
    } catch (error) {
      console.log("cant update appointment", error);
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

  if (appointment.status === "accepted" && user.staffId === appointment.staffId)
    return (
      <>
        <MenuItem disableRipple dense onClick={handleOpen}>
          <EditIcon sx={{ mr: 2 }} />
          Khám
        </MenuItem>
        <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
          <DialogTitle>
            <Typography variant="h5" component="p">
              Khám
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
                <Grid item xs={6} md={4}>
                  <Controller
                    name="height"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        inputProps={{
                          step: 0.1,
                        }}
                        label="Chiều cao"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập chiều cao"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        inputProps={{
                          step: 0.1,
                        }}
                        label="Cân nặng"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập cân nặng"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Controller
                    name="temperature"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        inputProps={{
                          step: 0.1,
                        }}
                        label="Nhiệt độ"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập nhiệt độ"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Controller
                    name="bloodPressure"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Huyết áp"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập huyết áp"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Controller
                    name="heartRate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Nhịp tim"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập nhịp tim"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Controller
                    name="respirationRate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Nhịp thở"
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập nhịp thở"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="clinicalInformation"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Thông tin khám lâm sàng"
                        multiline
                        rows={4}
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message &&
                          "Cần nhập thông tin khám lâm sàng"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="diagnose"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Kết luận chẩn đoán"
                        multiline
                        rows={4}
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message &&
                          "Cần nhập kết luận chẩn đoán"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="treatmentDirection"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Hướng điều trị"
                        multiline
                        rows={4}
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error?.message && "Cần nhập hướng điều trị"
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
              Hoàn thành
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  else return;
}

export default ExaminationForm;
