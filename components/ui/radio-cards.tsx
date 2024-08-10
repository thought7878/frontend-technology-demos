import * as React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioCardsVariants = cva(
  'border disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        surface: 'border-black/15 enabled:hover:border-black/25 transition-all',
        // 'border-black/15 hover:border-black/30 before:bg-black/85 after:shadow-2xl',
        classic: 'shadow-md transition-all enabled:hover:shadow-lg',
      },
      size: {
        sm: 'text-sm tracking-normal px-3 py-[10px] rounded-md',
        md: 'text-sm tracking-normal px-4 py-[18px] rounded-md',
        lg: 'text-base tracking-normal px-6 py-5 rounded-lg',
      },
      // disabled: {
      //   _true: 'cursor-not-allowed',
      //   _false: '',
      // },
    },
    defaultVariants: {
      variant: 'surface',
      size: 'md',
      // disabled: '_false',
    },
  }
);

type RadioCardsRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioCardsRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

const RadioCardsRoot = React.forwardRef<
  RadioCardsRootElement,
  RadioCardsRootProps
>(({ ...props }, ref) => {
  return <RadioGroupPrimitive.Root {...props} ref={ref} />;
});
RadioCardsRoot.displayName = 'RadioCardsRoot';

type RadioCardsItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
type RadioCardsItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> &
  VariantProps<typeof radioCardsVariants>;

const RadioCardsItem = React.forwardRef<
  RadioCardsItemElement,
  RadioCardsItemProps
>(({ variant, size, className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    className={cn(radioCardsVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
));
RadioCardsItem.displayName = 'RadioCardsItem';

export { RadioCardsRoot, RadioCardsItem };
// export { RadioCardsRoot as Root, RadioCardsItem as Item };
export type { RadioCardsRootProps, RadioCardsItemProps };
// export type {
//   RadioCardsRootProps as RootProps,
//   RadioCardsItemProps as ItemProps,
// };
export type {
  RadioCardsRootProps as RootProps,
  RadioCardsItemProps as ItemProps,
};
