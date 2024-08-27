"use client";

import { Input, InputProps } from "@/components/ui/input";
import * as React from "react";
import {
  AriaButtonOptions,
  AriaNumberFieldProps,
  type NumberFieldAria,
  useButton,
  useLocale,
  useNumberField,
} from "react-aria";
import {
  type NumberFieldState,
  NumberFieldStateOptions,
  useNumberFieldState,
} from "react-stately";
// import { Button, ButtonProps } from "@/components/ui/button";
// import Button, { ButtonProps } from "@/components/ui/button-aria";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ControllerRenderProps } from "react-hook-form";
/* 
const numberFieldVariants = cva("", {
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
 */

interface NumberFieldContextValue {
  numberFieldProps: NumberFieldAria;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  btnPosition?: "inside" | "outside";
  labelPosition?: "left" | "top";
}

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
    name?: string;
    className?: string;
    btnPosition?: "inside" | "outside";
    labelPosition?: "left" | "top";
  } & Partial<Pick<NumberFieldStateOptions, "locale">>
>;
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  (
    {
      children,
      className,
      btnPosition = "inside",
      labelPosition = "left",
      locale: customLocale,
      ...props
    },
    ref,
  ) => {
    const hookLocale = useLocale().locale;
    const locale = customLocale || hookLocale;
    // TODO: If label is empty, numberFieldProps.labelProps is empty. Because of using NumberFieldLabel, so props.label need default value
    props.label = props.label || props.name || "label";

    const state = useNumberFieldState({ ...props, locale });

    // TODO: Incompatible with react-aria
    const inputRef = React.useRef<HTMLInputElement>(null);
    const numberFieldProps = useNumberField(props, state, inputRef);

    // TODO: 应该是bug，可以提交PR。react-aria，没有输入框的name属性
    numberFieldProps.inputProps.name = props.name;

    return (
      <NumberFieldContext.Provider
        value={{ numberFieldProps, inputRef, btnPosition, labelPosition }}
      >
        {/* TODO: 应该单独抽离 NumberFieldLabel 组件 */}
        {/* {label && (
          <label {...numberFieldProps.labelProps}>{label}</label>
        )} */}
        <div
          ref={ref}
          {...numberFieldProps.groupProps}
          className={cn(
            labelPosition === "left" ? "flex items-center gap-1" : "",
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

type NumberFieldGroupProps = React.HTMLAttributes<HTMLDivElement>;
const NumberFieldGroup = React.forwardRef<
  HTMLDivElement,
  NumberFieldGroupProps
>(({ className, children, ...props }, ref) => {
  const {
    numberFieldProps: { groupProps },
  } = useNumberFieldContext();
  return (
    <div
      ref={ref}
      className={cn("relative flex gap-1", className)}
      {...groupProps}
    >
      {children}
    </div>
  );
});
NumberFieldGroup.displayName = "NumberFieldGroup";

type NumberFieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
const NumberFieldLabel = React.forwardRef<
  HTMLLabelElement,
  NumberFieldLabelProps
>(({ className, children, ...props }, ref) => {
  const {
    numberFieldProps: { labelProps },
    labelPosition,
  } = useNumberFieldContext();

  return (
    <label
      ref={ref}
      // TODO: 是否需要props，包括其他组件的props
      {...labelProps}
      // {...props}
      className={cn(
        labelPosition === "left" ? "flex items-center justify-center" : "",
        className,
      )}
    >
      {children}
    </label>
  );
});
NumberFieldLabel.displayName = "NumberFieldLabel";

type NumberFieldIncrementProps = ButtonProps;
const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldIncrementProps
>(({ className, ...props }, ref) => {
  const {
    numberFieldProps: { incrementButtonProps },
    btnPosition,
  } = useNumberFieldContext();

  return (
    <Button
      // TODO: 是否有更优雅的方式
      {...{ ...incrementButtonProps, ...props }}
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
  const {
    numberFieldProps: { decrementButtonProps },
    btnPosition,
  } = useNumberFieldContext();

  return (
    <Button
      // TODO: 是否有更优雅的方式
      {...{ ...decrementButtonProps, ...props }}
      className={cn(
        "z-10 rounded-md bg-primary text-primary-foreground transition-all enabled:hover:bg-primary/60 disabled:cursor-not-allowed disabled:opacity-50",
        btnPosition === "outside"
          ? "px-3 py-2"
          : "absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-t-none p-0 focus-visible:outline-none",
        className,
      )}
      ref={ref}
    ></Button>
  );
});
NumberFieldDecrement.displayName = "NumberFieldDecrement";

type NumberFieldInputProps = InputProps;
// type NumberFieldInputProps = Omit<InputProps, "onChange">;
const NumberFieldInput = React.forwardRef<
  HTMLInputElement,
  NumberFieldInputProps
>(({ className, ...props }, ref) => {
  const {
    numberFieldProps: { inputProps },
    inputRef,
  } = useNumberFieldContext();

  // TODO: inputRef和ref是否有更好的处理方式
  React.useEffect(() => {
    if (ref && "current" in ref && inputRef?.current) {
      ref.current = inputRef?.current;
    }
  }, [inputRef, ref]);
  // console.log("numberFieldProps.inputProps:", numberFieldProps.inputProps);

  return (
    <input
      // TODO: 类型没搞清楚
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="number"
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // TODO: 后面的类是否有必要
        // `${className} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`
        className,
      )}
      // TODO: 是否有更优雅的方式
      {...{ ...inputProps, ...props }}
    />
  );
});
NumberFieldInput.displayName = "NumberFieldInput";

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldLabel,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
};

export type {
  NumberFieldProps,
  NumberFieldGroupProps,
  NumberFieldLabelProps,
  NumberFieldDecrementProps,
  NumberFieldIncrementProps,
  NumberFieldInputProps,
};

type ButtonProps = AriaButtonOptions<React.ElementType> & {
  children?: React.ReactNode;
  className?: string;
  // ref?: React.MutableRefObject<HTMLButtonElement | null>;
  ref?: React.RefObject<HTMLButtonElement | null>;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    let { buttonProps } = useButton(
      props,
      // TODO: 类型没搞清楚
      ref as React.RefObject<HTMLButtonElement | null>,
    );

    return (
      <button {...buttonProps} ref={ref} className={className}>
        {props.children}
      </button>
    );
  },
);

Button.displayName = "Button";
