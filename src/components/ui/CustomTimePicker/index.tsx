const CustomTimePicker = ({ title, time, setTime }) => {
  // Ensure the time value is always in "HH:mm" format with zero-padded hours
  const formatTime = (value) => {
    const [hours, minutes] = value.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  return (
    <form className="w-full mx-auto mt-1">
      <label
        htmlFor="time"
        className="block mb-2 text-xs font-medium text-black"
      >
        {title}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
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
        <input
          type="time"
          id="time"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3"
          min="01:00"
          max="23:00"
          value={formatTime(time)} // Display in "HH:mm" format
          onChange={(e) => setTime(e.target.value)} // Update state with raw input value
          required
        />
      </div>
    </form>
  );
};

export default CustomTimePicker;
