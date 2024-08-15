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
    ref.current?.focus();
    console.log("useEffect input ref", ref);
  }, [ref]);

  return (
    <div>
      <NumberField
        defaultValue={8}
        label="默认样式"
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
        <NumberFieldInput ref={ref} />
        <NumberFieldIncrement />
      </NumberField>

      <NumberField
        defaultValue={8}
        label="自定义每个组件的样式"
        className="mb-8 h-[80px]"
      >
        <NumberFieldDecrement className="border border-input bg-background hover:bg-accent hover:text-accent-foreground" />
        <NumberFieldInput ref={ref} className="w-[100px] text-blue-500" />
        <NumberFieldIncrement className="bg-blue-500" />
      </NumberField>

      <NumberField defaultValue={8} label="自定义button布局" className="">
        <NumberFieldDecrement className="absolute right-0 top-0 p-1" />
        <NumberFieldInput ref={ref} className="" />
        <NumberFieldIncrement className="absolute bottom-0 right-0 p-1" />
      </NumberField>
    </div>
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
