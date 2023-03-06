import { TimePicker, TimeRangePickerProps } from 'antd';

export default function RangePicker(props: TimeRangePickerProps) {
  return (
    <TimePicker.RangePicker
      format='HH:mm'
      minuteStep={10}
      showNow={false}
      {...props}
      locale={{
        lang: {
          locale: 'ko_KR',
          today: '오늘',
          now: '현재 시각',
          backToToday: '오늘로 돌아가기',
          ok: '확인',
          clear: '지우기',
          month: '월',
          year: '년',
          timeSelect: '시간 선택',
          dateSelect: '날짜 선택',
          monthSelect: '달 선택',
          yearSelect: '연 선택',
          decadeSelect: '연대 선택',
          yearFormat: 'YYYY년',
          dateFormat: 'YYYY-MM-DD',
          dayFormat: 'Do',
          dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
          monthBeforeYear: false,
          previousMonth: '이전 달 (PageUp)',
          nextMonth: '다음 달 (PageDown)',
          previousYear: '이전 해 (Control + left)',
          nextYear: '다음 해 (Control + right)',
          previousDecade: '이전 연대',
          nextDecade: '다음 연대',
          previousCentury: '이전 세기',
          nextCentury: '다음 세기',
          placeholder: '날짜 선택',
          rangePlaceholder: ['시작일', '종료일'],
        },
        timePickerLocale: {
          placeholder: '시간 선택',
          rangePlaceholder: ['시작 시간', '종료 시간'],
        },
      }}
    />
  );
}
