import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { Button, TextField, Grid, Paper, Autocomplete } from "@mui/material";

import axios from "../../api/axios";
import PageHeader from "../../components/PageHeader";
import AppointmentList from "./AppointmentList";
import AppointmentCreateForm from "./AppointmentCreateForm";
import useAuth from "../../hooks/useAuth";

function AppointmentSchedule() {
  const { user } = useAuth();
  const [doctorList, setDoctorList] = React.useState([]);
  const [patientList, setPatientList] = React.useState([]);
  const [specialtyList, setSpecialtyList] = React.useState([]);
  const [appointmentList, setAppointmentList] = React.useState([]);
  const [appointmentCount, setAppointmentCount] = React.useState(0);

  const [searchStaff, setSearchStaff] = React.useState(null);
  const [searchPatient, setSearchPatient] = React.useState(null);
  const [searchSpecialty, setSearchSpecialty] = React.useState(null);
  const [inputSearchStaff, setInputSearchStaff] = React.useState("");
  const [inputSearchPatient, setInputSearchPatient] = React.useState("");
  const [inputSearchSpecialty, setInputSearchSpecialty] = React.useState("");

  const [trigger, setTrigger] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const getDefaultStaffId = () => {
    if (user.isStaff === true && user.isAdmin === false) return user.staffId;
    else return null;
  };

  const getDefaultPatientId = () => {
    if (user.isStaff === false) return user.patientId;
    else return null;
  };

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchDate: dayjs().format("YYYY-MM-DD"),
      searchStaff: getDefaultStaffId(),
      searchPatient: getDefaultPatientId(),
      searchSpecialty: null,
      orderBy: "", // useless
      order: "DESC", //useless
      page: 1,
      pageSize: 5,
    },
  });

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const specialties = await axios.get("specialty");

        //if admin, get all - isStaff true, isAdmin true
        //if staff, get only staff's - isStaff true, isAdmin false
        //if patien, get only patient's - isStaff false (isAdmin auto false if isStaff false)
        if (user.isStaff === true && user.isAdmin === false) {
          let doctor = await axios.get(`staff/${user.staffId}`, {
            searchValue: "",
            disableFilter: false,
            orderBy: "", // useless
            order: "DESC", //useless
            page: 1,
            pageSize: 5,
          });
          let newDoctorList = [];
          newDoctorList.push(doctor.data.data);
          setDoctorList(newDoctorList);
        } else {
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
          setDoctorList(doctors.data.data.rows);
        }
        if (user.isStaff === false) {
          let patient = await axios.get(`patient/${user.patientId}`, {
            searchValue: "",
            disableFilter: false,
            orderBy: "", // useless
            order: "DESC", //useless
            page: 1,
            pageSize: 5,
          });
          let newPatientList = [];
          newPatientList.push(patient.data.data);
          setDoctorList(newPatientList);
        } else {
          let patients = await axios.post("patient/get-patients", {
            searchValue: "",
            disableFilter: false,
            orderBy: "", // useless
            order: "DESC", //useless
            page: 1,
            pageSize: 5,
          });
          setPatientList(patients.data.data.rows);
        }

        const appointments = await axios.post("record/get-records", {
          searchDate: getValues("searchDate"),
          searchSpecialty:
            getValues("searchSpecialty") === null
              ? null
              : getValues("searchSpecialty"),
          searchPatient:
            getValues("searchPatient") === null
              ? null
              : getValues("searchPatient"),
          searchStaff:
            getValues("searchStaff") === null ? null : getValues("searchStaff"),
          orderBy: "", // useless
          order: "DESC", //useless
          page: getValues("page"),
          pageSize: getValues("pageSize"),
        });
        setSpecialtyList(specialties.data.data);
        setAppointmentList(appointments.data.data.rows);
        setAppointmentCount(appointments.data.data.count);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [trigger]);

  const onSubmit = (data) => {
    triggerReFetch();
    console.log(data);
  };

  const triggerReFetch = () => {
    setTrigger(!trigger);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  if (loading) return <p>loading</p>;
  else
    return (
      <>
        <button onClick={() => console.log(getValues())}>get value</button>
        <button onClick={() => console.log(errors)}>get error</button>
        <PageHeader
          title="Lịch hẹn"
          action={
            user.isStaff === false ? (
              <AppointmentCreateForm triggerReFetch={triggerReFetch} />
            ) : null
          }
        />
        <Paper elevation={5} sx={{ bgcolor: "grey.100" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ my: 2, px: 2 }}
            >
              <Grid item xs={12} sm={6} lg={2.5}>
                {user.isStaff === true && user.isAdmin === false ? (
                  <TextField
                    disabled
                    defaultValue={`${doctorList[0].specialty.name}`}
                  />
                ) : (
                  <Autocomplete
                    value={searchSpecialty}
                    onChange={(event, newValue) => {
                      setSearchSpecialty(newValue);
                      setValue(
                        "searchSpecialty",
                        newValue === null ? null : newValue.id
                      );
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    inputValue={inputSearchSpecialty}
                    onInputChange={(event, newInputValue) => {
                      setInputSearchSpecialty(newInputValue);
                    }}
                    options={specialtyList}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} label="Chuyên khoa" />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                {user.isStaff === true && user.isAdmin === false ? (
                  <TextField
                    disabled
                    defaultValue={`${doctorList[0].account.firstName} ${doctorList[0].account.lastName}`}
                  />
                ) : (
                  <Autocomplete
                    value={searchStaff}
                    onChange={(event, newValue) => {
                      setSearchStaff(newValue);
                      setValue(
                        "searchStaff",
                        newValue === null ? null : newValue.id
                      );
                    }}
                    getOptionLabel={(option) =>
                      `${option.account.firstName} ${option.account.lastName}`
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    inputValue={inputSearchStaff}
                    onInputChange={(event, newInputValue) => {
                      setInputSearchStaff(newInputValue);
                    }}
                    options={doctorList}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} label="Bác sĩ" />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                {user.isStaff === false ? (
                  <TextField
                    disabled
                    defaultValue={`${patientList[0].account.firstName} ${patientList[0].account.lastName}`}
                  />
                ) : (
                  <Autocomplete
                    value={searchPatient}
                    onChange={(event, newValue) => {
                      setSearchPatient(newValue);
                      setValue(
                        "searchPatient",
                        newValue === null ? null : newValue.id
                      );
                    }}
                    getOptionLabel={(option) =>
                      `${option.account.firstName} ${option.account.lastName}`
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    inputValue={inputSearchPatient}
                    onInputChange={(event, newInputValue) => {
                      setInputSearchPatient(newInputValue);
                    }}
                    options={patientList}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} label="Bệnh nhân" />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} lg>
                <Controller
                  name="searchDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        label="Ngày"
                        openTo="year"
                        views={["year", "month", "day"]}
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
                              helperText={fieldState.error?.message}
                            />
                          </>
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg="auto">
                <Button type="submit" variant="text">
                  Tìm kiếm
                </Button>
              </Grid>
            </Grid>
          </form>
          <AppointmentList
            triggerRefetch={triggerReFetch}
            appointmentList={appointmentList}
            appointmentCount={appointmentCount}
            page={getValues("page")}
            pageSize={getValues("pageSize")}
            setValue={setValue}
          />
        </Paper>
      </>
    );
}

export default AppointmentSchedule;
