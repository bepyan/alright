import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/utils';

export const buttonVariants = cva(
  'active:opacity-90 transition-opacity inline-flex items-center justify-center rounded-lg text-lg font-bold select-none focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-al-blue text-white',
        subtle: 'bg-transparent text-al-blue border border-al-blue',
        destructive: 'bg-al-red text-white',
        outline: 'bg-transparent text-black border border-al-border',
        ghost: 'bg-transparent text-al-blue hover:bg-slate-100',
      },
      size: {
        default: 'h-14 py-2 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export default Button;
