import { useRouter } from 'next/navigation';

import BackButton from '~/ui/BackButton';
import Button from '~/ui/Button';

import { useCreate } from './state';

export default function HeaderNavContent() {
  const router = useRouter();

  const MAX_STEP = 3;
  const step = useCreate((s) => s.step);
  const canMoveToNext = useCreate((s) => s.computed.canMoveToNext);

  const selectCompany = useCreate((s) => s.selectCompany);
  const moveStep = useCreate((s) => s.moveStep);

  const prevStep = () => {
    if (step === 1) {
      router.back();
      return;
    } else if (step === 2) {
      selectCompany(undefined);
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
      <BackButton onClick={prevStep} />
      {step < MAX_STEP && (
        <Button variant='primeGhost' size='min' disabled={!canMoveToNext} onClick={nextStep}>
          다음
        </Button>
      )}
    </>
  );
}
