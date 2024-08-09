import * as React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

type RadioCardsRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
// type RadioCardsRootOwnProps = GetPropDefTypes<typeof radioCardsRootPropDefs>;
type RadioCardsRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;
// type RadioCardsRootProps = typeof RadioGroupPrimitive.Root;

const RadioCardsRoot = React.forwardRef<
  RadioCardsRootElement,
  RadioCardsRootProps
>((props, ref) => {
  return (
    <RadioGroupPrimitive.Root
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
>;
// type RadioCardsItemProps = typeof RadioGroupPrimitive.Item;

const RadioCardsItem = React.forwardRef<
  RadioCardsItemElement,
  RadioCardsItemProps
>(({ ...props }, ref) => (
  <RadioGroupPrimitive.Item
    // value={value}
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
