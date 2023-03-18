export const renderMinute = (minute: number) => {
  let result = '';

  const h = Math.floor(minute / 60);
  if (h > 0) {
    result += `${h}시간`;
  }

  const m = Math.floor(minute % 60);
  if (m > 0) {
    result += ` ${m}분`;
  }

  return result;
};
