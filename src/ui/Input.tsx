import * as React from 'react';

import { cn } from '~/lib/utils';

import { Icons } from './Icons';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex h-12 w-full items-center gap-3 rounded-md bg-al-gray-100 py-2 px-3',
        className,
      )}
    >
      <Icons.SearchIcon className='h-4 w-4 text-al-disabled' />
      <input
        className='bg-transparent placeholder:text-al-disabled focus:outline-none disabled:cursor-not-allowed'
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export default Input;

export function InputFrame({
  className,
  placeholder,
  ...props
}: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <div
      {...props}
      className={cn(
        'flex h-12 w-full cursor-pointer select-none items-center gap-3 rounded-md bg-al-gray-100 py-2 px-3',
        className,
      )}
    >
      <Icons.SearchIcon className='h-4 w-4 text-al-disabled' />
      <div className='bg-transparent text-al-disabled'>{placeholder}</div>
    </div>
  );
}
