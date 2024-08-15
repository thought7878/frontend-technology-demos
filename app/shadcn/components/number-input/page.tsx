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
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
// import { NumberField } from "@/components/ui/my-number-input-aria";

export default function Page() {
  const form = useForm();

  let ref = useRef<HTMLInputElement>(null);
  let buttonRef = useRef<HTMLButtonElement>(null);

  // console.log("function input ref", ref);
  console.log("function buttonRef", buttonRef);

  useEffect(() => {
    // ref.current?.focus();
    // console.log("useEffect input ref", ref);
    console.log("useEffect buttonRef", buttonRef);
    console.log(buttonRef.current?.className);
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
        <NumberFieldInput className="w-[100px] text-blue-500" />
        <NumberFieldIncrement className="bg-blue-500" />
      </NumberField>

      <NumberField defaultValue={8} label="自定义button布局" className="">
        <NumberFieldIncrement
          ref={buttonRef}
          className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-b-none p-0 hover:opacity-60 focus-visible:outline-none"
        >
          <ChevronUpIcon className="h-4 w-4" />
        </NumberFieldIncrement>
        {/* <NumberFieldIncrement className="absolute right-0 top-0 rounded-b-none p-[2.5px] hover:opacity-60" /> */}
        <NumberFieldInput className="" />

        <NumberFieldDecrement className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-t-none p-0 hover:opacity-60 focus-visible:outline-none">
          <ChevronDownIcon className="h-4 w-4" />
        </NumberFieldDecrement>
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
