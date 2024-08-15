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
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
// import { NumberField } from "@/components/ui/my-number-input-aria";

export default function Page() {
  const form = useForm();

  let ref = useRef<HTMLInputElement>(null);

  console.log("function input ref", ref);

  useEffect(() => {
    console.log("useEffect input ref", ref);
    ref.current?.focus();
  }, [ref]);

  return (
    <NumberField
      defaultValue={8}
      label="Price"
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
      <NumberFieldInput ref={ref} className="w-[100px] text-blue-500" />
      <NumberFieldIncrement />
    </NumberField>
  );
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
