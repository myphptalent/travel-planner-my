import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hideToast } from "../../redux/slices/uiSlice";

export default function Toast() {
  const dispatch = useAppDispatch();
  const { message, type, isVisible } = useAppSelector((state) => state.ui.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const bgColorMap: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const bgColor = bgColorMap[type] || "bg-blue-500";

  return (
    <div
      className={`fixed top-5 right-5 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top z-50 transition-all duration-300`}
    >
      <p className="font-medium">{message}</p>
    </div>
  );
}
