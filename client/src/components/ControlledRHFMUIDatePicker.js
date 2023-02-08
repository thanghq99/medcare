import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ControlledRHFMUIDatePicker({
  control,
  name,
  label,
  rules,
  controlProps,
  datePickerProps,
  textInputProps,
}) {
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...controlProps}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={label}
            {...datePickerProps}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  fullWidth
                  onKeyDown={onKeyDown}
                  {...textInputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </>
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default ControlledRHFMUIDatePicker;
