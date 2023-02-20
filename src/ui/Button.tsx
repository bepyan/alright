import { cn } from '~/lib/utils';

export default function Button({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: 'default' | 'error';
}) {
  return <button className={cn('rounded-lg  px-3 py-1 text-sm font-medium')} {...props} />;
}
