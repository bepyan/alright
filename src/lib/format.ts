import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const formatDayRangeValue = (startTime: string, endTime: string) => {
  return [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')] as [Dayjs, Dayjs];
};

export const formatTime = (time: string) => {
  return dayjs(time).format('HH:mm');
};
