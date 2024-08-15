"use client";

import { Input, InputProps } from "@/components/ui/input";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
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

    // TODO: inputRef 需要处理
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

const NumberFieldIncrement = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { numberFieldProps } = useNumberFieldContext();

    return (
      <Button
        {...numberFieldProps.incrementButtonProps}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "rounded-md px-3 py-2",
          className,
        )}
      >
        <ChevronUpIcon />
      </Button>
    );
  },
);
NumberFieldIncrement.displayName = "NumberFieldIncrement";

const NumberFieldDecrement = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { numberFieldProps } = useNumberFieldContext();

    return (
      <Button
        {...numberFieldProps.decrementButtonProps}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "rounded-md px-3 py-2",
          className,
        )}
      >
        <ChevronDownIcon />
      </Button>
    );
  },
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

const NumberFieldInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { numberFieldProps, inputRef } = useNumberFieldContext();

    React.useEffect(() => {
      if (ref && "current" in ref && inputRef?.current) {
        ref.current = inputRef?.current;
      }
    }, [inputRef]);

    return (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="number"
        className={`${className} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        {...numberFieldProps.inputProps}
      />
    );
  },
);
NumberFieldInput.displayName = "NumberFieldInput";

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
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
