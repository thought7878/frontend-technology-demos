"use client";

import * as React from "react";
import { useLocale } from "react-aria";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {
  type NumberFieldState,
  useNumberFieldState,
  NumberFieldStateOptions,
} from "react-stately";
import { Input, InputProps } from "@/components/ui/input";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

type NumberFieldContextValue = NumberFieldState;

const NumberFieldContext = React.createContext<NumberFieldContextValue>(
  {} as NumberFieldContextValue,
);

const useNumberField = () => {
  const numberFieldContext = React.useContext(NumberFieldContext);

  if (!numberFieldContext) {
    throw new Error("useNumberField should be used within <NumberField>");
  }

  return numberFieldContext;
};

type NumberFieldProps = Partial<NumberFieldStateOptions> &
  ControllerRenderProps;
const NumberField = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<NumberFieldProps>
>(({ children, ...props }, ref) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });

  return (
    <NumberFieldContext.Provider value={state}>
      <div ref={ref} className={cn("flex gap-1 rounded-md")}>
        {children}
      </div>
    </NumberFieldContext.Provider>
  );
});
NumberField.displayName = "NumberField";

const NumberFieldIncrement = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const state = useNumberField();

    return (
      <Button
        variant={"outline"}
        size={"icon"}
        type="button"
        className={cn("aspect-square", className)}
        onClick={() => {
          state.increment();
          console.log("increment");
        }}
        ref={ref}
        {...props}
      >
        <ChevronUpIcon />
      </Button>
    );
  },
);
NumberFieldIncrement.displayName = "NumberFieldIncrement";

const NumberFieldDecrement = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const state = useNumberField();

    return (
      <Button
        variant={"outline"}
        size={"icon"}
        type="button"
        className={cn("aspect-square", className)}
        onClick={() => {
          state.decrement();
          console.log("decrement");
        }}
        ref={ref}
        {...props}
      >
        <ChevronDownIcon />
      </Button>
    );
  },
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

const NumberFieldInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const state = useNumberField();

    return (
      <Input
        ref={ref}
        type="number"
        className={cn(
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className,
        )}
        value={parseInt(state.inputValue)}
        onChange={(e) => state.setInputValue(e.target.value)}
        {...props}
      />
    );
  },
);
NumberFieldInput.displayName = "NumberFieldInput";

export {
  NumberField,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
};
