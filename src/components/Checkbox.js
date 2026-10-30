import React from 'react';
import PropTypes from 'prop-types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    const taskRef = doc(db, 'tasks', id);
    updateDoc(taskRef, {
      archived: true,
    }).then(() => {
      // Announce task completion to screen readers
      const announcement = document.getElementById('task-announcement');
      if (announcement) {
        announcement.textContent = `Task "${taskDesc}" completed`;
      }
    });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          archiveTask();
        }
      }}
      aria-label={`Mark ${taskDesc} as done`}
      role="checkbox"
      aria-checked="false"
      tabIndex={0}
    >
      <span className="checkbox" aria-hidden="true" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
