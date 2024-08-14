"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   NumberField,
//   NumberFieldDecrement,
//   NumberFieldIncrement,
//   NumberFieldInput,
// } from "@/components/ui/my-number-input_git";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/my-number-input";
import { useForm } from "react-hook-form";
// import { NumberField } from "@/components/ui/my-number-input-aria";

export default function Page() {
  const form = useForm();

  /* return (
    <NumberField
      label="Price"
      defaultValue={6}
      formatOptions={{
        style: "currency",
        currency: "USD",
      }}
    />
  ); */
  return (
    <NumberField
      defaultValue={8}
      // formatOptions={{
      //   style: "currency",
      //   currency: "USD",
      // }}

      // name="number"
      // value={1}
      // onChange={console.log}
      // onBlur={() => {}}
    >
      <NumberFieldDecrement />
      <NumberFieldInput className="text-blue-500" />
      <NumberFieldIncrement />
    </NumberField>
  );

  /* return (
    <FormField
      control={form.control}
      name="exampleNumberField"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Example number Field</FormLabel>
          <FormControl>
            <NumberField {...field}>
              <NumberFieldInput />
              <NumberFieldDecrement />
              <NumberFieldIncrement />
            </NumberField>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ); */
}
