import { useState } from "react";
import MonthCard from "./MonthCard";

const CalendarContainer = ({ holidays, viewType }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const handlePrevious = () => {
    if (viewType === "monthly") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1));
    }
  };

  const handleNext = () => {
    if (viewType === "monthly") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 1));
    }
  };

  const getMonthsToDisplay = () => {
    if (viewType === "monthly") return [currentDate];
    // Quarterly: show 3 months (2 top, 1 bottom)
    const firstMonthOfQuarter = currentDate.getMonth() - (currentDate.getMonth() % 3);
    const year = currentDate.getFullYear();
    return [
      new Date(year, firstMonthOfQuarter, 1),
      new Date(year, firstMonthOfQuarter + 1, 1),
      new Date(year, firstMonthOfQuarter + 2, 1)
    ];
  };

  const months = getMonthsToDisplay();

  return (
    <div className={`calendar-container ${viewType}`}>
      <div className="calendar-nav">
        <button onClick={handlePrevious}>← Previous</button>
        <button onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</button>
        <button onClick={handleNext}>Next →</button>
      </div>

      <div className={viewType === "quarterly" ? "quarter-grid" : "month-grid"}>
        {months.map((monthDate, idx) => (
          <MonthCard key={idx} monthDate={monthDate} holidays={holidays} />
        ))}
      </div>
    </div>
  );
};

export default CalendarContainer;
