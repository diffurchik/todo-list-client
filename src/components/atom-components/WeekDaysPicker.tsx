import React, { useState } from 'react';

const WeekDaysPicker: React.FC = () => {
  const days = [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' },
    { label: 'Sat', value: 'sat' },
    { label: 'Sun', value: 'sun' },
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div id = 'week-days-picker' style={{ display: 'flex', gap: '0.2rem' }}>
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => toggleDay(day.value)}
          style={{
            border: '1px solid #ccc',
            background: selectedDays.includes(day.value) ? '#d7bde2' : 'white',
            outline: 'none',
            borderColor: (day.value === 'Sun' || day.value === 'Sat') ? '#d35400' : '#ccc',
            borderRadius: '50%',
            width: 20,
            height: 30,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12
          }}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};

export default WeekDaysPicker;
