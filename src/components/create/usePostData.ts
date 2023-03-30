import { useMutation } from '@tanstack/react-query';

import baxios from '~/lib/baxios';

import { useCreate } from './state';

export default function usePostData() {
  const company = useCreate((s) => s.company);
  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);

  return useMutation(() => baxios.post('/parking-lot', { company, selectedCarParkList }));
}
