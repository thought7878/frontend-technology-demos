"use client";

import ReactDatePicker from "react-datepicker";
// import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  // TODO: docs bug type of string
  ReactDatepicker: Date;
};

export default function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      // ReactDatepicker: new Date(),
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState,
          formState,
        }) => (
          <ReactDatePicker
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
            selected={value}
          />
        )}
      />

      <input type="submit" />
    </form>
  );
}
