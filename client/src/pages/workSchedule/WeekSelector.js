import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DatePicker } from "@mui/x-date-pickers";

dayjs.extend(isBetweenPlugin);
dayjs.extend(isSameOrBefore);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export default function CustomDay({ setDateList, initDate }) {
  const [value, setValue] = React.useState(
    initDate ? dayjs(initDate) : dayjs()
  );

  React.useEffect(() => {
    getAllDatesInChosenWeek(value);
    console.log("here");
  }, []);

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = value.startOf("week");
    const end = value.endOf("week");

    const dayIsBetween = date.isBetween(start, end, null, "[]");
    const isFirstDay = date.isSame(start, "day");
    const isLastDay = date.isSame(end, "day");

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const getAllDatesInChosenWeek = (date) => {
    const dateList = [];
    const start = date.startOf("week");
    for (let i = 0; i <= 6; i++) {
      dateList.push(start.add(i, "day").format("YYYY-MM-DD"));
    }
    setDateList(dateList);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        // displayStaticWrapperAs="desktop"
        label="Khoảng thời gian (theo từng tuần)"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          getAllDatesInChosenWeek(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField fullWidth {...params} />}
        inputFormat={`${value.startOf("week").format("YYYY-MM-DD")} đến ${value
          .endOf("week")
          .format("YYYY-MM-DD")}`}
      />
    </LocalizationProvider>
  );
}
