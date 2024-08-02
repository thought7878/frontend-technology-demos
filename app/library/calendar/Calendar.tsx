import dayjs from 'dayjs';

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

function MonthCalendar({ value, onChange }: MonthCalendarProps) {
  const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  //
  const current = dayjs(value);
  const days = current.daysInMonth();
  const firstDate = current.startOf('month');
  const week = firstDate.day();

  // console.log(current.daysInMonth());

  // console.log(current.startOf('month').format('YYYY-MM-DD'));

  // console.log(current.endOf('month').format('YYYY-MM-DD'));

  return (
    <div className=''>
      {/* week list */}
      <div className='w-full box-border border-solid border-b border-[#ccc] flex '>
        {weekList.map((week) => (
          <div className='flex-1 px-[16px] py-[20px] text-left' key={week}>
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}
export interface MonthCalendarProps extends CalendarProps {}
