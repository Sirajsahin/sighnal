import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <label
        htmlFor="customDatePicker"
        className="text-sm font-semibold text-gray-700"
      >
        Start Date
      </label>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm transition-all duration-200 ease-in-out"
        id="customDatePicker"
      />
      <small className="text-xs text-gray-500">
        Please select a valid start date.
      </small>
    </div>
  );
};

export default CustomDatePicker;
