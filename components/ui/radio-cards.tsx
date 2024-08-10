import * as React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioCardsVariants = cva(
  'border border-border aria-checked:outline aria-checked:outline-2 aria-checked:outline-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        surface: 'enabled:hover:border-black/25 transition-all',
        classic: 'shadow-sm transition-all enabled:hover:shadow-md',
      },
      size: {
        sm: 'text-sm tracking-normal px-3 py-2 rounded-md',
        md: 'text-sm tracking-normal px-4 py-3 rounded-md',
        lg: 'text-base tracking-normal px-6 py-5 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'surface',
      size: 'sm',
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
