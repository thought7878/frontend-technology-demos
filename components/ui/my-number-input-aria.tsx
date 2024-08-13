import { AriaButtonOptions, useLocale, useNumberField } from "react-aria";
import { NumberFieldStateOptions, useNumberFieldState } from "react-stately";

// Reuse the Button from your component library. See below for details.
import React, { ElementType } from "react";
// import { Button } from "./button";
import Button from "@/components/ui/button-aria";

type NumberFieldProps = Partial<NumberFieldStateOptions>;

export function NumberField(props: NumberFieldProps) {
  let { locale } = useLocale();
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = React.useRef(null);
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <Button {...decrementButtonProps}>-</Button>
        <input {...inputProps} ref={inputRef} />
        <Button {...incrementButtonProps}>+</Button>
      </div>
    </div>
  );
}
