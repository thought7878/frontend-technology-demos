import { forwardRef, useImperativeHandle, useState } from 'react';
/**
 * 以下是日历组件
 */
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
export interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const Calendar = forwardRef<CalendarRef, CalendarProps>(
  ({ value = new Date(), onChange }, ref) => {
    // function Calendar({ value = new Date(), onChange }: CalendarProps) {
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

    useImperativeHandle(ref, () => {
      return {
        getDate() {
          return currentDate;
        },
        setDate(date: Date) {
          setCurrentDate(date);
        },
      };
    });

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
);

Calendar.displayName = 'Calendar';

export default Calendar;
