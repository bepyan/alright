import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const formatDayRangeValue = (startTime: string, endTime: string) => {
  return [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')] as [Dayjs, Dayjs];
};
