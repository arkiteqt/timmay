import React from "react";

export const Sidebar = ({ event, onClose }) => {
    if (!event) return null; // Return nothing if no event is selected
  
    return (
      <div className={`side-drawer open`}>
        <button onClick={onClose} className="close-btn">X</button>
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p>{event.description}</p>
      </div>
    );
  };
  