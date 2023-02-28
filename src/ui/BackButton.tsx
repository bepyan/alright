import { ChevronLeft } from 'lucide-react';

import { cn } from '~/lib/utils';

import Button from './Button';

export default function BackButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button className={cn('-ml-1', className)} size='min' variant='ghost'>
      <ChevronLeft className='h-6 w-6' onClick={onClick} />
    </Button>
  );
}
