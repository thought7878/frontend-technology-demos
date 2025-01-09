"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import MyDatePicker from "@/app/shadcn/components/calendar/react-day-picker";

export default function CalendarDemo() {
  return <MyDatePicker />;
}

/* export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode='single'
      selected={date}
      // onSelect={setDate}
      className='rounded-md border'
    />
  );
} */
