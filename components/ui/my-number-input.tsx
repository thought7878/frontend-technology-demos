"use client";

import { Input, InputProps } from "@/components/ui/input";
import * as React from "react";
import { type NumberFieldAria, useLocale, useNumberField } from "react-aria";
import {
  type NumberFieldState,
  NumberFieldStateOptions,
  useNumberFieldState,
} from "react-stately";
// import { Button, ButtonProps } from "@/components/ui/button";
import Button, { ButtonProps } from "@/components/ui/button-aria";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ControllerRenderProps } from "react-hook-form";

const buttonVariants = cva("", {
  variants: {
    variant: {
      inside: "bg-primary text-primary-foreground hover:bg-primary/90",
      outside:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "inside",
    size: "default",
  },
});

type NumberFieldContextValue = { numberFieldProps: NumberFieldAria } & {
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

const NumberFieldContext = React.createContext<NumberFieldContextValue>(
  {} as NumberFieldContextValue,
);

const useNumberFieldContext = () => {
  const numberFieldContext = React.useContext(NumberFieldContext);
  if (!numberFieldContext) {
    throw new Error(
      "useNumberFieldContext should be used within <NumberField>",
    );
  }
  return numberFieldContext;
};

type NumberFieldProps = React.PropsWithChildren<
  Partial<NumberFieldStateOptions> & { className?: string }
>;
// & ControllerRenderProps;
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ children, className, ...props }, ref) => {
    const { locale } = useLocale();
    const state = useNumberFieldState({ ...props, locale });

    // TODO: inputRef是否可以有更好的处理方式
    let inputRef = React.useRef<HTMLInputElement>(null);
    let numberFieldProps = useNumberField(props, state, inputRef);

    return (
      <NumberFieldContext.Provider value={{ numberFieldProps, inputRef }}>
        <label {...numberFieldProps.labelProps}>{props.label}</label>
        <div
          ref={ref}
          {...numberFieldProps.groupProps}
          className={cn(
            "relative flex items-center gap-1 rounded-md",
            className,
          )}
          // TODO: 需要处理
          aria-label="number field"
        >
          {children}
        </div>
      </NumberFieldContext.Provider>
    );
  },
);
NumberField.displayName = "NumberField";

type NumberFieldIncrementProps = ButtonProps;
const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldIncrementProps
>(({ className, ...props }, ref) => {
  const { numberFieldProps } = useNumberFieldContext();

  return (
    <Button
      // TODO: 是否有更优雅的方式
      {...{ ...numberFieldProps.incrementButtonProps, ...props }}
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "rounded-md px-3 py-2",
        className,
      )}
      // TODO: 类型没搞清楚
      // ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
      ref={ref}
      // ref={ref satisfies React.MutableRefObject<HTMLButtonElement | null>}
    ></Button>
  );
});
NumberFieldIncrement.displayName = "NumberFieldIncrement";

type NumberFieldDecrementProps = ButtonProps;
const NumberFieldDecrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldDecrementProps
>(({ className, ...props }, ref) => {
  const { numberFieldProps } = useNumberFieldContext();

  return (
    <Button
      // TODO: 是否有更优雅的方式
      {...{ ...numberFieldProps.decrementButtonProps, ...props }}
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "rounded-md px-3 py-2",
        className,
      )}
      // TODO: 类型没搞清楚
      ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
    ></Button>
  );
});
NumberFieldDecrement.displayName = "NumberFieldDecrement";

type NumberFieldInputProps = InputProps;
const NumberFieldInput = React.forwardRef<
  HTMLInputElement,
  NumberFieldInputProps
>(({ className, ...props }, ref) => {
  const { numberFieldProps, inputRef } = useNumberFieldContext();

  // TODO: inputRef和ref是否有更好的处理方式
  React.useEffect(() => {
    if (ref && "current" in ref && inputRef?.current) {
      ref.current = inputRef?.current;
    }
  }, [inputRef]);

  return (
    <Input
      // TODO: 类型没搞清楚
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="number"
      // TODO: 后面的类是否有必要
      className={`${className} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      // TODO: 是否有更优雅的方式
      {...{ ...numberFieldProps.inputProps, ...props }}
    />
  );
});
NumberFieldInput.displayName = "NumberFieldInput";

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
};

export type {
  NumberFieldDecrementProps,
  NumberFieldIncrementProps,
  NumberFieldInputProps,
  NumberFieldProps,
};
