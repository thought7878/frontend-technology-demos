"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/my-number-input";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm();

  return (
    <NumberField
      name="number"
      value={1}
      onChange={console.log}
      onBlur={() => {}}
    >
      <NumberFieldDecrement />
      <NumberFieldInput />
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
