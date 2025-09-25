import DayCell from "./DayCell";

const MonthCard = ({ monthDate, holidays }) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();


  const holidaysByDate = {};
  holidays.forEach(h => {
    const d = new Date(h.date.iso);
    if (d.getMonth() === month) {
      const key = d.getDate();
      if (!holidaysByDate[key]) holidaysByDate[key] = [];
      holidaysByDate[key].push(h);
    }
  });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const weeks = [];
  let current = new Date(startDate);

  while (current <= lastDay || weeks.length < 6) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(current);
      const key = day.getDate();
      week.push({
        date: day,
        holidays: holidaysByDate[key] || []
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <div className="month-card">
      <h3>{monthNames[month]} {year}</h3>
      <div className="calendar-row header">
        {dayNames.map(day => <div key={day} className="day-header">{day}</div>)}
      </div>
      {weeks.map((week, idx) => {
        const holidayCount = week.reduce((acc, d) => acc + d.holidays.length, 0);

        const rowClass = holidayCount === 1 ? 'week-one-holiday' : holidayCount > 1 ? 'week-multiple-holidays' : '';
        return (
          <div key={idx} className={`calendar-row ${rowClass}`}>
            {week.map((day, dayIdx) => (
              <DayCell key={dayIdx} day={day} month={month} />
            ))}
          </div>
        )
      })}
    </div>
  );
};

export default MonthCard;
