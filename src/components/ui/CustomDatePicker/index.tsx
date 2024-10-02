import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi"; // Calendar icon

const CustomDatePicker = ({ title }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <label
        htmlFor="customDatePicker"
        className="text-xs font-semibold text-gray-700"
      >
        {title}
      </label>
      <div className="relative">
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md   block w-full p-3 shadow-sm transition-shadow  "
          id="customDatePicker"
        />
        <FiCalendar
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none"
          size={20}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
