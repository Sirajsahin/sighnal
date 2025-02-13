import { useRef } from "react";

const CustomTimePicker = ({ title, time, setTime }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Format the time properly (HH:mm)
  const formatTime = (value: string | null) => {
    if (!value) return "";
    const [hours, minutes] = value.split(":");
    if (!hours || !minutes) return "";
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  // Handle clicking anywhere inside the time picker
  const handlePickerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Opens the native time picker
    }
  };

  return (
    <div className="w-full mx-auto mt-1">
      <label
        htmlFor="CustomTimePicker"
        className="block mb-2 text-xs font-medium text-black"
      >
        {title}
      </label>

      {/* Make the entire div clickable */}
      <div className="relative cursor-pointer" onClick={handlePickerClick}>
        <input
          ref={inputRef}
          type="time"
          id="CustomTimePicker"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3 cursor-pointer"
          min="01:00"
          max="23:00"
          value={time || ""}
          onChange={(e) => setTime(formatTime(e.target.value))}
          required
        />

        {/* Clock Icon */}
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker;
