import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function ControlledRHFMUITextField({
  control,
  rules,
  name,
  label,
  placeholder,
  inputProps,
  textFieldProps,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          variant="outlined"
          placeholder={placeholder}
          inputProps={inputProps}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...textFieldProps}
        />
      )}
    />
  );
}

export default ControlledRHFMUITextField;
