import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useCreate } from './state';

export default function usePostData() {
  const company = useCreate((s) => s.company);
  const selectedCarParkList = useCreate((s) => s.selectedCarParkList);

  return useMutation(() => axios.post('/api/parking-lot', { company, selectedCarParkList }));
}
