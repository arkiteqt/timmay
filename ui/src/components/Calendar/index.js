import React, { useState } from "react";
import { Sidebar } from "../Sidebar";

// Helper function to get days of the month
const getDaysInMonth = (month, year) => {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Side Drawer Component
const SideDrawer = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className={`side-drawer open`}>
      <button onClick={onClose} className="close-btn">X</button>
      <h2>{event.title}</h2>
      <p>{event.start.toLocaleString()} - {event.end.toLocaleString()}</p>
      <p>{event.description}</p>
    </div>
  );
};

// Main Calendar Component
const CalendarComponent = ({events}) => {
  const [view, setView] = useState("month"); // month, week, or day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDrawer = () => {
    setSelectedEvent(null);
  };

  const renderDaysOfWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => <div key={day} className="calendar-header-day">{day}</div>);
  };

  const renderMonthView = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);

    const isEventInDay = (day, event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      return (
        day >= new Date(start.getFullYear(), start.getMonth(), start.getDate()) &&
        day <= new Date(end.getFullYear(), end.getMonth(), end.getDate())
      );
    };

    return (
      <div className="calendar-grid">
        {renderDaysOfWeek()}
        {daysInMonth.map((day, index) => (
          <div key={index} className="calendar-day">
            <div>{day.getDate()}</div>
            {events
              .filter((event) => isEventInDay(day, event))
              .map((event) => (
                <div
                  key={event.id}
                  className="calendar-event"
                  onClick={() => handleEventClick(event)}
                >
                  {day.toDateString() === new Date(event.start) ? (
                    <>
                      <strong>{event.title}</strong>
                      <div>{`${new Date(event.start).getHours()}:${new Date(event.start).getMinutes()} - ${new Date(event.end).getHours()}:${new Date(event.end).getMinutes()}`}</div>
                    </>
                  ) : (
                    <div>{event.title}</div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={() => handleViewChange("month")}>Month View</button>
        <button onClick={() => handleViewChange("week")}>Week View</button>
        <button onClick={() => handleViewChange("day")}>Day View</button>
        <button onClick={() => handleViewChange("list")}>List View</button>
      </div>
      <div>{renderMonthView()}</div>

      <Sidebar event={selectedEvent} onClose={handleCloseDrawer} />
    </div>
  );
};

export default CalendarComponent;
