'use client';

import { useEffect, useRef } from 'react';
import './index.css';
import Calendar, {
  type CalendarRef,
} from '@/app/library/calendar/MiniCalendar';

export default function Page() {
  // const date = new Date(2024, 7, 1);
  // console.log(date);
  // console.log(date.toLocaleDateString());

  // // 当 date 传 0 的时候，取到的是上个月的最后一天；-1 就是上个月的倒数第二天；-2 就是倒数第三天这样
  // const d1 = new Date(2024, 8, 0);
  // console.log(d1.toLocaleString());
  // console.log(d1.toLocaleDateString());
  // console.log(d1.getDate());

  // // getFullYear / getMonth / getDay
  // console.log('getFullYear', d1.getFullYear());
  // console.log('getMonth', d1.getMonth());
  // console.log('getDay', d1.getDay());

  const calendarRef = useRef<CalendarRef>(null);
  console.log('before render', calendarRef.current?.getDate().toLocaleString());
  useEffect(() => {
    console.log(
      'useEffect calendarRef',
      calendarRef.current?.getDate().toLocaleString()
    );
    calendarRef.current?.setDate(new Date('2023-8-1'));
    // calendarRef.current?.getDate().toLocaleString();
  }, []);

  return (
    <div>
      <Calendar
        ref={calendarRef}
        value={new Date(2024, 7, 1)}
        onChange={(date) => {
          alert(date.toLocaleString());
        }}
      />
      <Calendar value={new Date('2023-8-1')} />
    </div>
  );
}
