"use client";

import { Input, InputProps } from "@/components/ui/input";
import * as React from "react";
import {
  AriaNumberFieldProps,
  type NumberFieldAria,
  useLocale,
  useNumberField,
} from "react-aria";
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
      inside: "",
      outside: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "inside",
    size: "default",
  },
});

type NumberFieldContextValue = { numberFieldProps: NumberFieldAria } & {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  btnPosition?: "inside" | "outside";
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
  Partial<AriaNumberFieldProps> & {
    className?: string;
    btnPosition?: "inside" | "outside";
  } & Partial<Pick<NumberFieldStateOptions, "locale">>
>;
// & ControllerRenderProps;
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  (
    {
      children,
      className,
      btnPosition = "inside",
      locale: customLocale,
      ...props
    },
    ref,
  ) => {
    const hookLocale = useLocale().locale;
    const locale = customLocale || hookLocale;

    const state = useNumberFieldState({ ...props, locale });

    // TODO: inputRef是否可以有更好的处理方式
    let inputRef = React.useRef<HTMLInputElement>(null);
    let numberFieldProps = useNumberField(props, state, inputRef);

    return (
      <NumberFieldContext.Provider
        value={{ numberFieldProps, inputRef, btnPosition }}
      >
        <label {...numberFieldProps.labelProps}>{props.label}</label>
        <div
          ref={ref}
          {...numberFieldProps.groupProps}
          className={cn(
            "relative flex items-center gap-1 rounded-md",
            className,
          )}
          // TODO: 需要处理
          // aria-label="number field"
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
  const { numberFieldProps, btnPosition } = useNumberFieldContext();

  return (
    <Button
      // TODO: 是否有更优雅的方式
      {...{ ...numberFieldProps.incrementButtonProps, ...props }}
      className={cn(
        "z-10 rounded-md bg-primary text-primary-foreground transition-all enabled:hover:bg-primary/60 disabled:cursor-not-allowed disabled:opacity-50",
        btnPosition === "outside"
          ? "px-3 py-2"
          : "absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-b-none p-0 focus-visible:outline-none",
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
  const { numberFieldProps, btnPosition } = useNumberFieldContext();

  return (
    <Button
      // TODO: 是否有更优雅的方式
      {...{ ...numberFieldProps.decrementButtonProps, ...props }}
      className={cn(
        "z-10 rounded-md bg-primary text-primary-foreground transition-all enabled:hover:bg-primary/60 disabled:cursor-not-allowed disabled:opacity-50",
        btnPosition === "outside"
          ? "px-3 py-2"
          : "absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-t-none p-0 focus-visible:outline-none",
        className,
      )}
      // TODO: 类型没搞清楚
      ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
    ></Button>
  );
});
NumberFieldDecrement.displayName = "NumberFieldDecrement";

type NumberFieldInputProps = Omit<InputProps, "onChange">;
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
