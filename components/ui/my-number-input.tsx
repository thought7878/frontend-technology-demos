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
// import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import Button, { ButtonProps } from "@/components/ui/button-aria";

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
    let {
      labelProps,
      groupProps,
      inputProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(props, state, inputRef);

    return (
      <Button {...incrementButtonProps}>-</Button>
      // <Button
      //   variant={"outline"}
      //   size={"icon"}
      //   type="button"
      //   className={cn("aspect-square", className)}
      //   onClick={state.increment}
      //   ref={ref}
      //   {...props}
      // >
      //   <ChevronUpIcon />
      // </Button>
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
        onClick={state.decrement}
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
        value={state.inputValue}
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

/* 
// https://github.com/shadcn-ui/ui/pull/1818

"use client";
import * as React from "react";
import { useNumberFieldState } from "react-stately";
import {
  type AriaNumberFieldProps,
  useLocale,
  useNumberField,
  useButton,
  type AriaButtonOptions,
} from "react-aria";
import { ChevronUp, ChevronDown } from "lucide-react";

import { Input } from "./input";
import { Label } from "./label";
// import { cn } from "./utils/cn";
import { cn } from "@/lib/utils";

export const NumberInput = ({
  className,
  ...props
}: {
  className?: string;
} & AriaNumberFieldProps) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = React.useRef(null);
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  return (
    <div className={className}>
      <Label {...labelProps}>{props.label}</Label>
      <div className="grid h-10 grid-cols-[auto_2.3rem]" {...groupProps}>
        <Input
          {...inputProps}
          className={cn(
            inputProps.className,
            "row-span-2 h-full rounded-r-none border-r-0",
          )}
          ref={inputRef}
        />
        <AriaButton
          className="rounded-tr-md border px-2 hover:bg-border"
          {...incrementButtonProps}
        >
          <ChevronUp className="mx-auto" size="1em" />
        </AriaButton>
        <AriaButton
          className="rounded-br-md border-x border-b px-2 hover:bg-border"
          {...decrementButtonProps}
        >
          <ChevronDown className="mx-auto" size="1em" />
        </AriaButton>
      </div>
    </div>
  );
};

const AriaButton = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & AriaButtonOptions<"button">) => {
  const ref = React.useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      className={cn(buttonProps.className, className)}
      ref={ref}
    >
      {children}
    </button>
  );
};
 */
