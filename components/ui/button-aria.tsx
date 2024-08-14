import React from "react";
import { ElementType } from "react";
import { type AriaButtonOptions, useButton } from "react-aria";

export type ButtonProps = AriaButtonOptions<ElementType> & {
  children?: React.ReactNode;
  className?: string;
};
export default function Button(props: ButtonProps) {
  let ref = React.useRef(null);
  let { buttonProps } = useButton(props, ref);
  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
