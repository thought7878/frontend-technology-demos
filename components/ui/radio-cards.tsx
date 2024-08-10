import * as React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioCardsVariants = cva('border', {
  variants: {
    variant: {
      surface:
        'border-black/15 hover:border-black/25 hover:shadow-2xl transition-all',
      // 'border-black/15 hover:border-black/30 before:bg-black/85 after:shadow-2xl',
      classic: '',
      // default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      // destructive:
      //   'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      // outline:
      //   'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      // secondary:
      //   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      // ghost: 'hover:bg-accent hover:text-accent-foreground',
      // link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'text-sm tracking-normal px-3 py-[10px] rounded-md',
      // sm: 'h-9 rounded-md px-3',
      md: 'text-sm tracking-normal px-4 py-[18px] rounded-md',
      lg: 'text-base tracking-normal px-6 py-5 rounded-lg',
      // icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'surface',
    size: 'md',
  },
});

type RadioCardsRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
// type RadioCardsRootOwnProps = GetPropDefTypes<typeof radioCardsRootPropDefs>;
type RadioCardsRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

const RadioCardsRoot = React.forwardRef<
  RadioCardsRootElement,
  RadioCardsRootProps
>(({ ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      // className={cn(radioCardsVariants({ variant, size, className }))}
      {...props}
      ref={ref}
      // className={}
    />
  );
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
    // value={value}
    className={cn(radioCardsVariants({ variant, size, className }))}
    ref={ref}
    {...props}
    // asChild={false}
    // className={classNames(
    //   'rt-reset',
    //   'rt-BaseCard',
    //   'rt-RadioCardsItem',
    //   className
    // )}
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
