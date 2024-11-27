import { on } from 'events';
import React, { useState } from 'react'

interface CalendarProps {
  onDateStartSelect: (startDate: Date) => void;
  onDateEndSelect: (endDate: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateStartSelect, onDateEndSelect }) => {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleDayClick = (date: Date) => {
    console.log(" ingresa click fecha calendar");
    let fechaInicial = startDate?.toLocaleDateString();
    let fechaClick = date.toLocaleDateString();
    if(fechaInicial == fechaClick) {
      setStartDate(null);
      setEndDate(null);
      onDateStartSelect(date);
      onDateEndSelect(date);
    }else if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate && date > startDate) {
      setEndDate(date);
      onDateStartSelect(startDate);
      onDateEndSelect(date);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 12);
    const isSelected = (startDate && date.toDateString() === startDate.toDateString()) ||
      (endDate && date.toDateString() === endDate.toDateString())
    const inRange = isInRange(date);
    const isPast = newDate < currentDate;

    days.push(
      <button
        key={day}
        onClick={() => handleDayClick(date)}
        className={`calendar-day ${isSelected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
        disabled={isPast}
      >
        {day}
      </button>
    )
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          onClick={handlePrevMonth}
          className="calendar-nav-button"
        >
          &lt;
        </button>
        <span>{monthNames[currentMonth]} {currentYear}</span>
        <button
          onClick={handleNextMonth}
          className="calendar-nav-button"
        >
          &gt;
        </button>
      </div>
      <div className="calendar-weekdays">
        <div>Lu</div>
        <div>Ma</div>
        <div>Mi</div>
        <div>Ju</div>
        <div>Vi</div>
        <div>Sa</div>
        <div>Do</div>
      </div>
      <div className="calendar-grid">{days}</div>
    </div>
  )
}