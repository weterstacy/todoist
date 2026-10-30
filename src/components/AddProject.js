import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const inputRef = useRef(null);

  // Focus input when form shows
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const addProject = () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    projectName &&
      addDoc(collection(db, 'projects'), {
        projectId,
        name: projectName,
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      })
        .then(() => {
          setProjects([...projects]);
          setProjectName('');
          setShow(false);
          setError('');
          // Announce project added
          const announcement = document.getElementById('project-announcement');
          if (announcement) {
            announcement.textContent = `Project "${projectName}" added successfully`;
          }
        })
        .catch((err) => {
          setError('Failed to add project. Please try again.');
          console.error('Error adding project:', err);
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject();
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div 
          className="add-project__input" 
          data-testid="add-project-inner"
          role="form"
          aria-labelledby="add-project-heading"
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="project-name-input" className="visually-hidden">
              Project name
            </label>
            <input
              id="project-name-input"
              ref={inputRef}
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                if (error) setError('');
              }}
              className="add-project__name"
              data-testid="project-name"
              type="text"
              placeholder="Name your project"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'project-error' : undefined}
            />
            {error && (
              <div id="project-error" className="add-project__error" role="alert">
                {error}
              </div>
            )}
            <button
              className="add-project__submit"
              type="submit"
              data-testid="add-project-submit"
            >
              Add Project
            </button>
          </form>
          <button
            type="button"
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => {
              setShow(false);
              setError('');
              setProjectName('');
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <span className="add-project__plus" aria-hidden="true">+</span>
      <button
        type="button"
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
      >
        Add Project
      </button>
    </div>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
