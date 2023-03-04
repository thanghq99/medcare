import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "../../api/axios";
import PageHeader from "../../components/PageHeader";
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";

import WeekSelector from "./WeekSelector";
import WorkScheduleList from "./WorkScheduleList";
import CreateShiftAssignment from "./CreateShiftAssignment";

import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";

function WorkSchedule() {
  const { user } = useAuth();
  const [trigger, setTrigger] = React.useState(false); //togger true false
  const [shiftAssignmentList, setShiftAssignmentList] = React.useState([]);
  const [doctorList, setDoctorList] = React.useState([]);
  const [shiftList, setShiftList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const isStaffAndNotAdmin = () => {
    return user.isStaff === true && user.isAdmin === false;
  };

  const isStaffAndAdmin = () => {
    return user.isStaff === true && user.isAdmin === true;
  };

  const getAllDatesInCurrentWeek = () => {
    const today = dayjs();
    const dateList = [];
    const start = today.startOf("week");
    for (let i = 0; i <= 6; i++) {
      dateList.push(start.add(i, "day").format("YYYY-MM-DD"));
    }
    return dateList;
  };

  const { handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      staffId: isStaffAndNotAdmin() ? user.id : "",
      shiftId: "",
      dateList: getAllDatesInCurrentWeek(),
    },
  });

  React.useEffect(() => {
    setLoading(true);
    const getData = async () => {
      console.log({
        staffId: getValues("staffId") === "" ? null : getValues("staffId"),
        shiftId: getValues("shiftId") === "" ? null : getValues("shiftId"),
        dateList: getValues("dateList"),
      });
      try {
        const shiftAssignments = await axios.post(
          "/shift-assignment/get-shift-assignment",
          // getValues()
          {
            staffId: getValues("staffId") === "" ? null : getValues("staffId"),
            shiftId: getValues("shiftId") === "" ? null : getValues("shiftId"),
            dateList: getValues("dateList"),
          }
        );

        const shifts = await axios.get("shift");
        setShiftAssignmentList(shiftAssignments.data.data);
        console.log(shiftAssignments.data.data);
        setShiftList(shifts.data.data);
        if (isStaffAndNotAdmin()) {
          const doctor = await axios.get(`staff/${user.id}`);
          const fakeDoctorList = [];
          fakeDoctorList.push(doctor.data.data);
          setDoctorList(fakeDoctorList);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("fetched!");
    getData();
  }, [trigger]);

  const triggerReFetch = () => {
    setTrigger(!trigger);
  };

  const onSubmit = (data) => {
    triggerReFetch();
    console.log(data);
  };

  const setDateList = (dateList) => {
    setValue("dateList", dateList);
  };

  if (loading) return <p>loading</p>;
  else
    return (
      <>
        <PageHeader
          title="Lịch làm việc"
          action={
            isStaffAndAdmin() ? (
              <CreateShiftAssignment triggerReFetch={triggerReFetch} />
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
              <Grid item xs={12} sm={6} lg={3}>
                <Controller
                  name="staffId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Bác sĩ"
                      disabled={isStaffAndNotAdmin()}
                    >
                      <MenuItem value="">Tất cả</MenuItem>
                      {doctorList.map((d) => {
                        console.log(d.id);
                        return (
                          <MenuItem key={d.id} value={d.id}>
                            {`${d.account.firstName} ${d.account.lastName}`}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Controller
                  name="shiftId"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Ca làm việc">
                      <MenuItem value="">Tất cả</MenuItem>
                      {shiftList.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                          {s.startTime} - {s.endTime}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg>
                <WeekSelector
                  setDateList={setDateList}
                  initDate={getValues("dateList")[0]}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg="auto">
                <Button type="submit" variant="text">
                  Tìm kiếm
                </Button>
              </Grid>
            </Grid>
          </form>
          <WorkScheduleList
            triggerReFetch={triggerReFetch}
            shiftAssignmentList={shiftAssignmentList}
            doctorList={doctorList}
            dateList={getValues("dateList")}
          />
        </Paper>
      </>
    );
}

export default WorkSchedule;
