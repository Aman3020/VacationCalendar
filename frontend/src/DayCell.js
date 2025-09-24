const DayCell = ({ day, month }) => {
  const isCurrentMonth = day.date.getMonth() === month;
  const isToday = day.date.toDateString() === new Date().toDateString();

  return (
    <div className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}>
      <div className="day-number">{day.date.getDate()}</div>
      {day.holidays.map((h, i) => (
        <div key={i} className="holiday">{h.name}</div>
      ))}
    </div>
  );
};

export default DayCell;
