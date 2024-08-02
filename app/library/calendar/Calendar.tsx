import dayjs, { type Dayjs } from 'dayjs';

export interface CalendarProps {
  value?: Date;
  onChange?: (value: Date) => void;
}

export default function Calendar({
  value = new Date(),
  onChange,
}: CalendarProps) {
  return (
    <div className='w-full'>
      <MonthCalendar value={value} onChange={onChange} />
    </div>
  );
}

function calculateDate(currentDate: Dayjs) {
  const dayNumber = currentDate.daysInMonth();
  const firstDate = currentDate.startOf('month');
  const week = firstDate.day();
  // 保存当月的日期/前一个月/后一个月的日期。6行是防止不够用；如果第一天是周日，且有31天，那么5行就不够用了
  let dateArray = new Array<{ date: Dayjs; currentMonth: boolean }>(7 * 6);
  /*
    前一月的日期。
    week: 0 | 1 | 2 | 3 | 4 | 5 | 6。0是周日，1是周一，6是周六
    如果第一天是周日，前面就没有上个月的日期；如果第一天是周一，前面就有一个上月的日期（最后一天）；如果第一天是周6，前面就有6个上月的日期。
  */
  for (let i = 0; i < week; i++) {
    dateArray[i] = {
      date: firstDate.subtract(week - i, 'day'),
      currentMonth: false,
    };
  }
  /*
    当月的日期 和 下月的日期
  */
  for (let i = week; i < dateArray.length; i++) {
    const date = firstDate.add(i - week, 'day');
    dateArray[i] = {
      date,
      currentMonth: date.month() === currentDate.month(),
    };
  }

  return dateArray;
}

function MonthCalendar({ value, onChange }: MonthCalendarProps) {
  const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const currentDate = dayjs(value);

  const dateArray = calculateDate(currentDate);
  // debugger;

  return (
    <div className=''>
      {/* week title list */}
      <div className='w-full box-border border-solid border-b border-[#ccc] grid grid-cols-7 grid-rows-1 '>
        {/* <div className='w-full box-border border-solid border-b border-[#ccc] flex '> */}
        {weekList.map((week) => (
          <div className='flex-1 px-[16px] py-[20px] text-left' key={week}>
            {week}
          </div>
        ))}
      </div>
      {/* date list */}
      <div className='w-full box-border grid grid-cols-7 grid-rows-5'>
        {dateArray.map((item) => (
          <div
            className={`px-[16px] py-[20px] text-left border border-solid border-[#eee] ${
              item.currentMonth ? 'text-black' : 'text-[#ccc]'
            }`}
            key={item.date.toString()}
          >
            {item.date.date()}
          </div>
        ))}
      </div>
    </div>
  );
}
export interface MonthCalendarProps extends CalendarProps {}
