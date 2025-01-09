import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
// import "@/node_modules/react-day-picker/dist/style.css";

export default function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
      // hideWeekdays
    />
  );
}
