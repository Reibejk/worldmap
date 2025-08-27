import React from 'react';

const VisitedList = ({ pins, isOpen, onClose, onPinSelect }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>My Trips</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <ul className="sidebar-list">
          {pins.length > 0 ? (
            pins.map(pin => (
              <li key={pin.id} onClick={() => onPinSelect(pin)}>
                {pin.title}
              </li>
            ))
          ) : (
            <li style={{ cursor: 'default' }}>No trips added yet.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default VisitedList;