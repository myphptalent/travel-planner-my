import { useEffect, useState } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  isOpen,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      // delay unmount for animation
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 mt-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        isOpen ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"
      }`}
    >
      <div
        className={`bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg w-80 p-6 transform transition-all duration-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="text-sm  mb-5 text-gray-800 dark:text-gray-200">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-gray-800 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 transition dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;