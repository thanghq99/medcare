import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import {
  Autocomplete,
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
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

function MedicineItemForDoctor({
  recordMedicine,
  triggerReFetchRecordMedicineList,
}) {
  const [note, setNote] = useState(recordMedicine.note);

  const updateNote = async () => {
    try {
      const result = await axios.put(`/record-medicine/${recordMedicine.id}`, {
        note: note,
      });
      console.log("updated", result);
      triggerReFetchRecordMedicineList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMedicine = async () => {
    try {
      const result = await axios.delete(
        `/record-medicine/${recordMedicine.id}`
      );
      console.log("deleted", result);
      triggerReFetchRecordMedicineList();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={3}>
        <Typography variant="body1">{recordMedicine.medicine.name}</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Grid>
      <Grid item xs>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button onClick={updateNote}>Lưu</Button>
          <Button onClick={deleteMedicine}>Xóa</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

function MedicineItemForPatient({ recordMedicine }) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Typography variant="body1">{recordMedicine.medicine.name}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">{recordMedicine.note}</Typography>
      </Grid>
    </Grid>
  );
}

function ViewAndEditMedicine({ appointment, triggerReFetch }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [recordMedicineList, setRecordMedicineList] = useState([]);
  const [medicineList, setMedicineList] = useState([]);
  const [listRefetch, setListRefetch] = useState(false);

  const [note, setNote] = useState("");
  const [value, setValue] = React.useState(); //autocomplete value
  const [inputValue, setInputValue] = React.useState(""); //autocomplete input value

  useEffect(() => {
    const getRecordMedicines = async () => {
      const medicines = await axios.post(
        "record-medicine/get-record-medicines",
        {
          recordId: appointment.id,
        }
      );
      setRecordMedicineList(medicines.data.data);
    };
    getRecordMedicines();
  }, [listRefetch]);

  useEffect(() => {
    const getMedicines = async () => {
      const medicines = await axios.get("medicine");
      setMedicineList(medicines.data.data);
    };
    getMedicines();
  }, []);

  const triggerReFetchRecordMedicineList = () => {
    setListRefetch(!listRefetch);
  };

  const createRecordMedicine = async () => {
    try {
      const result = await axios.post("/record-medicine", {
        recordId: appointment.id,
        medicineId: value.id,
        note: note,
      });
      console.log(result);
      triggerReFetchRecordMedicineList();
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

  if (appointment.status === "done") {
    if (user.staffId === appointment.staffId) {
      return (
        <>
          <MenuItem disableRipple dense onClick={handleOpen}>
            <LocalPharmacyIcon sx={{ mr: 2 }} />
            Chỉ định thuốc
          </MenuItem>
          <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
            <DialogTitle>
              <Typography variant="h5" component="p">
                Chỉ định thuốc
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
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={medicineList}
                    getOptionLabel={(option) => `${option.name}`}
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
                      <TextField {...params} label="Thuốc" />
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    label="Ghi chú"
                  />
                </Grid>
                <Grid item xs>
                  <Button onClick={createRecordMedicine}>Thêm thuốc</Button>
                </Grid>
              </Grid>
              <Divider variant="middle" sx={{ my: 2 }} />
              <Stack spacing={1}>
                {recordMedicineList.map((recordMedicine, index) => (
                  <MedicineItemForDoctor
                    key={index}
                    recordMedicine={recordMedicine}
                    triggerReFetchRecordMedicineList={
                      triggerReFetchRecordMedicineList
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
    } else if (
      user.patientId === appointment.patientId ||
      user.isAdmin === true
    ) {
      return (
        <>
          <MenuItem disableRipple dense onClick={handleOpen}>
            <LocalPharmacyIcon sx={{ mr: 2 }} />
            Thuốc chỉ định
          </MenuItem>
          <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
            <DialogTitle>
              <Typography variant="h5" component="p">
                Thuốc chỉ định
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={600}>
                      Tên thuốc
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={600}>
                      Cách dùng
                    </Typography>
                  </Grid>
                </Grid>
                {recordMedicineList.map((recordMedicine, index) => (
                  <MedicineItemForPatient
                    key={index}
                    recordMedicine={recordMedicine}
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
  } else return;
}

export default ViewAndEditMedicine;
