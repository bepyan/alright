import { cn } from '~/lib/utils';

export interface StepNavProps {
  currentStep: number;
  maxStep?: number;
}

export default function StepNav({ currentStep, maxStep = 3 }: StepNavProps) {
  return (
    <div className='flex select-none items-center'>
      {[...Array(maxStep)]
        .map((_, i) => i + 1)
        .map((step) => (
          <div key={step} className='flex items-center'>
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full font-bold',
                step < currentStep && 'border-2 border-al-blue text-al-blue',
                step === currentStep && 'bg-al-blue text-white',
                step > currentStep && 'bg-al-gray text-al-disabled',
              )}
            >
              {step}
            </div>
            {step < maxStep && (
              <div className={cn('h-0.5 w-2', step < currentStep ? 'bg-al-blue' : 'bg-al-gray')} />
            )}
          </div>
        ))}
    </div>
  );
}
