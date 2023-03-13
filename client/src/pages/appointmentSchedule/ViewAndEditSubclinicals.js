import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

function SubclinicalItemForDoctor({
  recordSubclinical,
  triggerReFetchRecordSubclinicalList,
}) {
  const deleteSubclinical = async () => {
    try {
      const result = await axios.delete(
        `/record-subclinical/${recordSubclinical.id}`
      );
      console.log("deleted", result);
      triggerReFetchRecordSubclinicalList();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Typography variant="body1">
          {recordSubclinical.subclinical.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">
          {recordSubclinical.currentExaminationFee}
        </Typography>
      </Grid>
      <Grid item xs>
        <Button fullWidth onClick={deleteSubclinical}>
          Xóa
        </Button>
      </Grid>
    </Grid>
  );
}

function SubclinicalItemForPatient({ recordSubclinical }) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Typography variant="body1">
          {recordSubclinical.subclinical.name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          {recordSubclinical.currentExaminationFee}
        </Typography>
      </Grid>
    </Grid>
  );
}

function ViewAndEditSubclinical({ appointment, triggerReFetch }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [recordSubclinicalList, setRecordSubclinicalList] = useState([]);
  const [subclinicalList, setSubclinicalList] = useState([]);
  const [listRefetch, setListRefetch] = useState(false);

  const [value, setValue] = React.useState(); //autocomplete value
  const [inputValue, setInputValue] = React.useState(""); //autocomplete input value

  useEffect(() => {
    const getRecordSubclinicals = async () => {
      const subclinicals = await axios.post(
        "record-subclinical/get-record-subclinicals",
        {
          recordId: appointment.id,
        }
      );
      setRecordSubclinicalList(subclinicals.data.data);
    };
    getRecordSubclinicals();
  }, [listRefetch]);

  useEffect(() => {
    const getSubclinicals = async () => {
      const subclinicals = await axios.get("subclinical");
      setSubclinicalList(subclinicals.data.data);
    };
    getSubclinicals();
  }, []);

  const triggerReFetchRecordSubclinicalList = () => {
    setListRefetch(!listRefetch);
  };

  const createRecordSubclinical = async () => {
    try {
      const result = await axios.post("/record-subclinical", {
        recordId: appointment.id,
        subclinicalId: value.id,
        currentExaminationFee: value.examinationFee,
      });
      console.log(result);
      triggerReFetchRecordSubclinicalList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (appointment.status === "accepted") {
    if (user.staffId === appointment.staffId) {
      return (
        <>
          <MenuItem disableRipple dense onClick={handleOpen}>
            <MonitorHeartIcon sx={{ mr: 2 }} />
            Chỉ định cận lâm sàng
          </MenuItem>
          <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
            <DialogTitle>
              <Typography variant="h5" component="p">
                Chỉ định cận lâm sàng
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                spacing={1}
                sx={{ mt: 1 }}
                alignItems="center"
                align="center"
              >
                <Grid item xs={9}>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={subclinicalList}
                    getOptionLabel={(option) =>
                      `${option.name} - Phí thực hiện: ${option.examinationFee} VND`
                    }
                    renderOption={(props, option) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "16px",
                        }}
                        {...props}
                      >
                        <Typography>{option.name}</Typography>
                        <Typography>
                          Phí thực hiện: {option.examinationFee} VND
                        </Typography>
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={value || null}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Cận lâm sàng" />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Button onClick={createRecordSubclinical}>
                    Thêm cận lâm sàng
                  </Button>
                </Grid>
              </Grid>
              <Divider variant="middle" sx={{ my: 2 }} />
              <Stack spacing={1}>
                {recordSubclinicalList.map((recordSubclinical, index) => (
                  <SubclinicalItemForDoctor
                    key={index}
                    recordSubclinical={recordSubclinical}
                    triggerReFetchRecordSubclinicalList={
                      triggerReFetchRecordSubclinicalList
                    }
                  />
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else if (user.patientId === appointment.patientId) {
      return (
        <>
          <MenuItem disableRipple dense onClick={handleOpen}>
            <MonitorHeartIcon sx={{ mr: 2 }} />
            Cận lâm sàng chỉ định
          </MenuItem>
          <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
            <DialogTitle>
              <Typography variant="h5" component="p">
                Cận lâm sàng chỉ định
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={600}>
                      Tên cận lâm sàng
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={600}>
                      Phí thực hiện
                    </Typography>
                  </Grid>
                </Grid>
                {recordSubclinicalList.map((recordSubclinical, index) => (
                  <SubclinicalItemForPatient
                    key={index}
                    recordSubclinical={recordSubclinical}
                  />
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  } else if (appointment.status === "done") {
    return (
      <>
        <MenuItem disableRipple dense onClick={handleOpen}>
          <MonitorHeartIcon sx={{ mr: 2 }} />
          Cận lâm sàng chỉ định
        </MenuItem>
        <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
          <DialogTitle>
            <Typography variant="h5" component="p">
              Cận lâm sàng chỉ định
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={1}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={600}>
                    Tên cận lâm sàng
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={600}>
                    Phí thực hiện
                  </Typography>
                </Grid>
              </Grid>
              {recordSubclinicalList.map((recordSubclinical, index) => (
                <SubclinicalItemForPatient
                  key={index}
                  recordSubclinical={recordSubclinical}
                />
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ViewAndEditSubclinical;
