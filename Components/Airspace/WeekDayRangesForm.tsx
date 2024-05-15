import React, { useEffect } from "react";
import Toggle from "./Toggle";

interface WeekDayRange {
  fromTime: number;
  toTime: number;
  isAvailable: boolean;
  weekDayId: number;
}

interface WeekDayRangeItemProps {
  day: string;
  isDayAvailable: boolean;
  fromTime: number;
  toTime: number;
  handleToggle: () => void;
  handleFromTimeChange: (time: number) => void;
  handleToTimeChange: (time: number) => void;
}

const WeekDayRangeItem: React.FC<WeekDayRangeItemProps> = ({
  day,
  isDayAvailable,
  fromTime,
  toTime,
  handleToggle,
  handleFromTimeChange,
  handleToTimeChange,
}) => (
  <div className="flex-none md:flex items-center justify-between">
    <div className="flex items-center gap-[15px] pr-[32px]">
      <Toggle checked={isDayAvailable} setChecked={handleToggle} />
      <p>{day}</p>
    </div>
    <TimeSelect
      isDayAvailable={isDayAvailable}
      fromTime={fromTime}
      toTime={toTime}
      handleFromTimeChange={handleFromTimeChange}
      handleToTimeChange={handleToTimeChange}
    />
  </div>
);

interface TimeSelectProps {
  isDayAvailable: boolean;
  fromTime: number;
  toTime: number;
  handleFromTimeChange: (time: number) => void;
  handleToTimeChange: (time: number) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  isDayAvailable,
  fromTime,
  toTime,
  handleFromTimeChange,
  handleToTimeChange,
}) => {
  const options = Array.from({ length: 25 });

  return (
    <div className="flex items-center gap-[66px] mt-2">
      <select
        disabled={!isDayAvailable}
        value={fromTime}
        onChange={(e) => handleFromTimeChange(+e.target.value)}
        className="appearance-none rounded-lg px-[22px] py-[5px] text-[14px] font-normal text-[#87878D] focus:outline-none"
        style={{ border: "1px solid #87878D" }}
      >
        {options.map((_, index) => (
          <option key={`start-${index}`} value={index}>
            {index.toString().padStart(2, "0")}:00
          </option>
        ))}
      </select>
      <p>to</p>
      <select
        disabled={!isDayAvailable}
        value={toTime}
        onChange={(e) => handleToTimeChange(+e.target.value)}
        className="appearance-none rounded-lg px-[22px] py-[5px] text-[14px] font-normal text-[#87878D] focus:outline-none"
        style={{ border: "1px solid #87878D" }}
      >
        {options.map((_, index) => (
          <option key={`end-${index}`} value={index}>
            {index.toString().padStart(2, "0")}:00
          </option>
        ))}
      </select>
    </div>
  );
};

interface WeekDayRangesFormProps {
  weekDayRanges: WeekDayRange[];
  setWeekDayRanges: React.Dispatch<React.SetStateAction<WeekDayRange[]>>;
}

const WeekDayRangesForm: React.FC<WeekDayRangesFormProps> = ({ weekDayRanges, setWeekDayRanges }) => {
  const weekDays = [
    "SUNDAYS",
    "MONDAYS",
    "TUESDAYS",
    "WEDNESDAYS",
    "THURSDAYS",
    "FRIDAYS",
    "SATURDAYS",
  ];

  useEffect(() => {
    const defaultWeekDayRanges = weekDayRanges.map((day) => ({
      isAvailable: true,
      fromTime: 9,
      toTime: 21,
      weekDayId: day.weekDayId,
    }));
    setWeekDayRanges(defaultWeekDayRanges);
  }, []);

  const handleToggle = (day: number) => {
    const weekDayRangesCopy = [...weekDayRanges];
    weekDayRangesCopy[day].isAvailable = !weekDayRangesCopy[day].isAvailable;
    setWeekDayRanges(weekDayRangesCopy);
  };

  const handleFromTimeChange = (day: number, time: number) => {
    const weekDayRangesCopy = [...weekDayRanges];
    weekDayRangesCopy[day].fromTime = time;
    setWeekDayRanges(weekDayRangesCopy);
  };

  const handleToTimeChange = (day: number, time: number) => {
    const weekDayRangesCopy = [...weekDayRanges];
    weekDayRangesCopy[day].toTime = time;
    setWeekDayRanges(weekDayRangesCopy);
  };

  return (
    <>
      {weekDays.map((day, index) => (
        <WeekDayRangeItem
          key={index}
          day={day}
          isDayAvailable={weekDayRanges[index].isAvailable}
          fromTime={weekDayRanges[index].fromTime}
          toTime={weekDayRanges[index].toTime}
          handleToggle={() => handleToggle(index)}
          handleFromTimeChange={(time) => handleFromTimeChange(index, time)}
          handleToTimeChange={(time) => handleToTimeChange(index, time)}
        />
      ))}
    </>
  );
};

export default WeekDayRangesForm;
