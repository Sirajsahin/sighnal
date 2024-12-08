import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="relative rounded-lg w-auto ">
        {/* Close Button */}

        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

const CustomDatePicker = ({ title }: { title: string }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="customDatePicker"
        className="text-sm font-semibold text-gray-700"
      >
        {title}
      </label>
      <div className="relative">
        {/* Open Modal Button */}
        <button
          onClick={openModal}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md w-full p-3 shadow-sm flex items-center justify-between"
        >
          {startDate ? startDate.toLocaleDateString("en-CA") : "Select a date"}
          <FiCalendar className="text-gray-500" size={20} />
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            setStartDate(date);
            closeModal(); // Close modal on date select
          }}
          inline
          dateFormat="yyyy-MM-dd"
        />
      </Modal>
    </div>
  );
};

export default CustomDatePicker;
