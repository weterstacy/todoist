import React, { useEffect, useRef } from 'react';
import { format, addDays } from 'date-fns';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => {
  const overlayRef = useRef(null);

  // Focus first option when overlay opens
  useEffect(() => {
    if (showTaskDate && overlayRef.current) {
      const firstButton = overlayRef.current.querySelector('[role="menuitem"]');
      if (firstButton) {
        firstButton.focus();
      }
    }
  }, [showTaskDate]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showTaskDate) {
        setShowTaskDate(false);
      }
    };

    if (showTaskDate) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [showTaskDate, setShowTaskDate]);

  const handleDateSelect = (date, label) => {
    setShowTaskDate(false);
    setTaskDate(date);
    // Announce date selection
    const announcement = document.getElementById('date-announcement');
    if (announcement) {
      announcement.textContent = `Date set to ${label}`;
    }
  };

  return (
    showTaskDate && (
      <div 
        className="task-date" 
        data-testid="task-date-overlay"
        ref={overlayRef}
        role="dialog"
        aria-label="Select task date"
      >
        <ul className="task-date__list" role="menu">
          <li role="none">
            <div
              onClick={() => handleDateSelect(format(new Date(), 'dd/MM/yyyy'), 'today')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDateSelect(format(new Date(), 'dd/MM/yyyy'), 'today');
                }
              }}
              data-testid="task-date-today"
              tabIndex={0}
              aria-label="Select today as the task date"
              role="menuitem"
            >
              <span aria-hidden="true">
                <FaSpaceShuttle />
              </span>
              <span>Today</span>
            </div>
          </li>
          <li role="none">
            <div
              onClick={() => handleDateSelect(format(addDays(new Date(), 1), 'dd/MM/yyyy'), 'tomorrow')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDateSelect(format(addDays(new Date(), 1), 'dd/MM/yyyy'), 'tomorrow');
                }
              }}
              data-testid="task-date-tomorrow"
              role="menuitem"
              tabIndex={0}
              aria-label="Select tomorrow as the task date"
            >
              <span aria-hidden="true">
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </div>
          </li>
          <li role="none">
            <div
              onClick={() => handleDateSelect(format(addDays(new Date(), 7), 'dd/MM/yyyy'), 'next week')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDateSelect(format(addDays(new Date(), 7), 'dd/MM/yyyy'), 'next week');
                }
              }}
              data-testid="task-date-next-week"
              aria-label="Select next week as the task date"
              tabIndex={0}
              role="menuitem"
            >
              <span aria-hidden="true">
                <FaRegPaperPlane />
              </span>
              <span>Next week</span>
            </div>
          </li>
        </ul>
      </div>
    )
  );
};

TaskDate.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired,
};
