import  { useState } from "react";

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (e) => {
        const date = e.target.valueAsDate;
        setSelectedDate(date);
    };

    return (
        <div>
            <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
            />
            <p>Selected Date: {selectedDate.toDateString()}</p>
        </div>
    );
};

export default DatePicker;