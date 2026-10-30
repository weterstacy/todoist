import React, { useState, useEffect, useRef } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { format, addDays } from 'date-fns';
import PropTypes from 'prop-types';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [error, setError] = useState('');

  const { selectedProject } = useSelectedProjectValue();
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if ((showMain || showQuickAddTask) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showMain, showQuickAddTask]);

  // Handle escape key to close overlays and modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showProjectOverlay) {
          setShowProjectOverlay(false);
        } else if (showTaskDate) {
          setShowTaskDate(false);
        } else if (showQuickAddTask) {
          setShowMain(false);
          setShowProjectOverlay(false);
          setShowQuickAddTask(false);
        } else if (showMain) {
          setShowMain(false);
          setShowProjectOverlay(false);
        }
      }
    };

    if (showMain || showQuickAddTask) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [
    showMain,
    showQuickAddTask,
    showProjectOverlay,
    showTaskDate,
    setShowQuickAddTask,
  ]);

  // Focus trap for quick add overlay
  useEffect(() => {
    if (!showQuickAddTask || !overlayRef.current) return undefined;

    const focusableElements = overlayRef.current.querySelectorAll(
      'button, input, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [showQuickAddTask]);

  const addTask = () => {
    if (!task.trim()) {
      setError('Task description is required');
      return Promise.resolve();
    }

    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = format(new Date(), 'dd/MM/yyyy');
    } else if (projectId === 'NEXT_7') {
      collatedDate = format(addDays(new Date(), 7), 'dd/MM/yyyy');
    }

    return (
      task &&
      projectId &&
      addDoc(collection(db, 'tasks'), {
        archived: false,
        projectId,
        task,
        date: collatedDate || taskDate,
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
          setError('');
          // Announce task added to screen readers
          const announcement = document.getElementById('task-announcement');
          if (announcement) {
            announcement.textContent = `Task "${task}" added successfully`;
          }
        })
        .catch((err) => {
          setError('Failed to add task. Please try again.');
          console.error('Error adding task:', err);
        })
    );
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (showQuickAddTask) {
      addTask().then(() => setShowQuickAddTask(false));
    } else {
      addTask();
    }
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
      ref={overlayRef}
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowMain(!showMain);
            }
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="add-task__plus" aria-hidden="true">
            +
          </span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div
          className="add-task__main"
          data-testid="add-task-main"
          role="dialog"
          aria-labelledby="add-task-heading"
          aria-modal={showQuickAddTask ? 'true' : 'false'}
        >
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 id="add-task-heading" className="header">
                  Quick Add Task
                </h2>
                <button
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                    setError('');
                  }}
                  type="button"
                >
                  X
                </button>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <form onSubmit={handleSubmit}>
            <label htmlFor="task-input" className="visually-hidden">
              Enter your task description
            </label>
            <input
              id="task-input"
              ref={inputRef}
              className="add-task__content"
              aria-label="Enter your task"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'task-error' : undefined}
              data-testid="add-task-content"
              type="text"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Buy groceries"
            />
            {error && (
              <div id="task-error" className="add-task__error" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="add-task__submit"
              data-testid="add-task"
            >
              Add Task
            </button>
          </form>
          {!showQuickAddTask && (
            <button
              type="button"
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
                setError('');
              }}
              aria-label="Cancel adding a task"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            aria-label={
              showProjectOverlay
                ? 'Hide project selector'
                : 'Show project selector'
            }
            aria-expanded={showProjectOverlay}
          >
            <FaRegListAlt aria-hidden="true" />
          </button>
          <button
            type="button"
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            aria-label={
              showTaskDate ? 'Hide date selector' : 'Show date selector'
            }
            aria-expanded={showTaskDate}
          >
            <FaRegCalendarAlt aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};
