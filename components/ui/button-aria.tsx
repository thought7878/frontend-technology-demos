import React from "react";
import { ElementType } from "react";
import { type AriaButtonOptions, useButton } from "react-aria";

export type ButtonProps = AriaButtonOptions<ElementType> & {
  children?: React.ReactNode;
  className?: string;
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
  // ref?: React.RefObject<HTMLButtonElement | null>;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    // let buttonRef = React.useRef(null);
    let { buttonProps } = useButton(
      props,
      ref as React.RefObject<HTMLButtonElement | null>,
    );

    // React.useEffect(() => {
    //   if (ref && "current" in ref) {
    //     ref.current = buttonRef.current;
    //   }
    // }, [buttonRef]);

    return (
      <button {...buttonProps} ref={ref} className={className}>
        {props.children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;

// export default function Button({ className, ref, ...props }: ButtonProps) {
//   let buttonRef = React.useRef(null);
//   let { buttonProps } = useButton(props, buttonRef);

//   React.useEffect(() => {
//     if (ref) {
//       ref.current = buttonRef.current;
//     }
//   }, [buttonRef]);

//   return (
//     <button {...buttonProps} ref={buttonRef} className={className}>
//       {props.children}
//     </button>
//   );
// }
