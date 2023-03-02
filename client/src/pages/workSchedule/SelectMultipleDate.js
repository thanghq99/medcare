import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";

dayjs.extend(isBetweenPlugin);
dayjs.extend(isSameOrBefore);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export default function SelectMultipleDate({ setDateList }) {
  const [value, setValue] = React.useState(dayjs());
  const [values, setValues] = React.useState([]);

  const findDate = (dates, date) => {
    let formattedDate = date.format("YYYY-MM-DD");
    return dates.find((d) => d === formattedDate);
  };

  const handleDateArray = (date) => {
    const newDates = [...values];
    const selectDate = date.format("YYYY-MM-DD");

    const index = newDates.findIndex((d) => d === selectDate);
    console.log(index);
    if (index >= 0) {
      newDates.splice(index, 1);
      setValues(newDates);
      setDateList(newDates);
      console.log(newDates);
    } else {
      newDates.push(selectDate);
      setValues(newDates);
      setDateList(newDates);
      console.log(newDates);
    }
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!values) {
      return <PickersDay {...pickersDayProps} />;
    }

    const selected = findDate(values, date);

    return (
      <CustomPickersDay
        onClick={() => handleDateArray(date)}
        {...pickersDayProps}
        disableMargin
        selected={selected}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Chọn ngày làm việc"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={renderPickerDay}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
