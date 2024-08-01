'use client';

import { useState } from 'react';
import './index.css';

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

  return (
    <div>
      <Calendar
        value={new Date(2024, 7, 1)}
        onChange={(date) => {
          alert(date.toLocaleString());
        }}
      />
      <Calendar value={new Date('2023-8-1')} />
    </div>
  );
}

const getDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getWeekOfFirstDay = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

function Calendar({ value = new Date(), onChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value);

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  function handlePrevMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }
  function handleNextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }

  const renderDays = () => {
    const days = [];
    // 计算当前月有多少天
    const daysCount = getDaysOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    // 再计算当前月的第一天是星期几
    const weekOfFirstDay = getWeekOfFirstDay(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    // 渲染 weekOfFirstDay 个 empty 的块。星期一，前面一个empty块；星期六，前面6个empty块。
    for (let i = 0; i < weekOfFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className='empty'></div>);
    }
    // 再渲染 daysCount 个 day 的块
    for (let i = 1; i <= daysCount; i++) {
      const handleClick = onChange?.bind(
        null,
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      );

      if (i === currentDate.getDate()) {
        days.push(
          <div key={i} className='day selected' onClick={handleClick}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className='day' onClick={handleClick}>
            {i}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {currentDate.getFullYear()} 年 {monthNames[currentDate.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className='days'>
        <div className='day'>日</div>
        <div className='day'>一</div>
        <div className='day'>二</div>
        <div className='day'>三</div>
        <div className='day'>四</div>
        <div className='day'>五</div>
        <div className='day'>六</div>
        {renderDays()}
      </div>
    </div>
  );
}
