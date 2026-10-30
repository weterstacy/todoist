import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { doc, deleteDoc } from 'firebase/firestore';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { db } from '../firebase';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    const projectRef = doc(db, 'projects', docId);
    deleteDoc(projectRef)
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
        // Announce project deletion
        const announcement = document.getElementById('project-announcement');
        if (announcement) {
          announcement.textContent = `Project "${project.name}" deleted`;
        }
      })
      .catch((err) => {
        console.error('Error deleting project:', err);
      });
  };

  return (
    <>
      <span className="sidebar__dot" aria-hidden="true">
        •
      </span>
      <span className="sidebar__project-name">{project.name}</span>
      <button
        type="button"
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        aria-label={`Delete project ${project.name}`}
        aria-expanded={showConfirm}
      >
        <FaTrashAlt aria-hidden="true" />
        {showConfirm && (
          <div
            className="project-delete-modal"
            role="dialog"
            aria-labelledby="delete-confirm-heading"
            aria-modal="true"
          >
            <div className="project-delete-modal__inner">
              <p id="delete-confirm-heading">
                Are you sure you want to delete this project?
              </p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
                aria-label={`Confirm delete ${project.name}`}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label="Cancel deletion"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </button>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
