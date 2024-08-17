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
        label="默认样式/outside"
        btnPosition="outside"
        // formatOptions={{
        //   style: "currency",
        //   currency: "USD",
        // }}

        // name="number"
        // value={1}
        // onChange={console.log}
        // onBlur={() => {}}
      >
        <NumberFieldDecrement>
          <ChevronDownIcon className="h-4 w-4" />
        </NumberFieldDecrement>
        <NumberFieldInput ref={ref} />
        <NumberFieldIncrement>
          <ChevronUpIcon className="h-4 w-4" />
        </NumberFieldIncrement>
      </NumberField>

      <NumberField
        defaultValue={8}
        label="自定义每个组件的样式"
        className="mb-8 h-[80px]"
        btnPosition="outside"
      >
        <NumberFieldDecrement className="border border-input bg-green-500 hover:bg-accent hover:text-accent-foreground">
          <ChevronDownIcon className="h-4 w-4" />
        </NumberFieldDecrement>
        <NumberFieldInput className="w-[100px] text-blue-500" />
        <NumberFieldIncrement className="bg-blue-500">
          <ChevronUpIcon className="h-4 w-4" />
        </NumberFieldIncrement>
      </NumberField>

      <NumberField
        defaultValue={18}
        label="btnPosition: inside"
        maxValue={10}
        minValue={0}
      >
        <NumberFieldIncrement ref={buttonRef}>
          <ChevronUpIcon className="h-4 w-4" />
        </NumberFieldIncrement>
        {/* <NumberFieldIncrement className="absolute right-0 top-0 rounded-b-none p-[2.5px] hover:opacity-60" /> */}
        <NumberFieldInput />
        <NumberFieldDecrement>
          <ChevronDownIcon className="h-4 w-4" />
        </NumberFieldDecrement>
      </NumberField>

      <NumberField
        defaultValue={8}
        label="bug:设置input宽度小于容器，容器高度大于input，btn定位错误。貌似解决不了！"
        className="h-[80px]"
      >
        <NumberFieldDecrement className="border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          <ChevronDownIcon className="h-4 w-4" />
        </NumberFieldDecrement>
        <NumberFieldInput className="w-[100px] text-blue-500" />
        <NumberFieldIncrement className="bg-blue-500">
          <ChevronUpIcon className="h-4 w-4" />
        </NumberFieldIncrement>
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
