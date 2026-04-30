import React, { useEffect, useState } from "react";

type DateTimeDisplayProps = {
  locale?: string;
  showSeconds?: boolean;
  weekDayFormat?: "short" | "long";
  monthFormat?: "short" | "long";
};

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  locale = "en-US",
  showSeconds = true,
  weekDayFormat = "short",
  monthFormat = "short",
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, showSeconds ? 1000 : 60000);

    return () => clearInterval(interval);
  }, [showSeconds]);

  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: weekDayFormat,
    year: "numeric",
    month: monthFormat,
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
  };

  return (
    <div className="text-sm text-gray-500 dark:text-gray-300">
      {currentTime.toLocaleString(locale, formatOptions)}
    </div>
  );
};

export default DateTimeDisplay;