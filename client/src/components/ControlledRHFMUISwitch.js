import { FormLabel, Switch } from "@mui/material";
import { Controller } from "react-hook-form";

function ControlledRHFMUISwitch({ name, label, control, rules }) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel id={`switch-${label}`}>{label}</FormLabel>
          <Switch
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
          />
        </>
      )}
    />
  );
}

export default ControlledRHFMUISwitch;
