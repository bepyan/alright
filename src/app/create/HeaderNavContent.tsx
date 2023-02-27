'use client';
import { useRouter } from 'next/navigation';

import { cn } from '~/lib/utils';
import { Icons } from '~/ui/Icons';

import { useCreate } from './state';

export default function HeaderNavContent() {
  const router = useRouter();

  const step = useCreate((s) => s.step);
  const canMoveToNext = useCreate((s) => s.computed.canMoveToNext);
  const MAX_STEP = 3;
  const moveStep = useCreate((s) => s.moveStep);

  const prevStep = () => {
    if (step === 1) {
      router.back();
      return;
    }

    moveStep(-1);
  };

  const nextStep = () => {
    if (!canMoveToNext) {
      return;
    }

    moveStep(+1);
  };

  return (
    <>
      <Icons.ChevronLeft className='-ml-1 h-6 w-6 active:opacity-click' onClick={prevStep} />
      {step < MAX_STEP && (
        <div
          className={cn(
            'select-none font-bold',
            canMoveToNext ? 'text-al-blue active:opacity-click' : 'text-al-disabled',
          )}
          onClick={nextStep}
        >
          다음
        </div>
      )}
    </>
  );
}
