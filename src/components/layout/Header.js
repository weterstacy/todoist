import React, { useState, useEffect } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  // Keyboard shortcut: Q for quick add task
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not in an input/textarea and not already showing
      if (
        e.key === 'q' &&
        !showQuickAddTask &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        setShowQuickAddTask(true);
        setShouldShowMain(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showQuickAddTask]);

  return (
    <header className="header" data-testid="header" role="banner">
      <nav aria-label="Main navigation">
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task (keyboard shortcut: Q)"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={darkMode}
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
