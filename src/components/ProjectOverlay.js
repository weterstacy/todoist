import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useProjectsValue } from '../context';

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { projects } = useProjectsValue();
  const overlayRef = useRef(null);

  // Focus first project when overlay opens
  useEffect(() => {
    if (showProjectOverlay && overlayRef.current) {
      const firstButton = overlayRef.current.querySelector('[role="button"]');
      if (firstButton) {
        firstButton.focus();
      }
    }
  }, [showProjectOverlay]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showProjectOverlay) {
        setShowProjectOverlay(false);
      }
    };

    if (showProjectOverlay) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [showProjectOverlay, setShowProjectOverlay]);

  const handleProjectSelect = (project) => {
    setProject(project.projectId);
    setShowProjectOverlay(false);
    // Announce project selection
    const announcement = document.getElementById('project-announcement');
    if (announcement) {
      announcement.textContent = `Project ${project.name} selected`;
    }
  };

  return (
    projects &&
    showProjectOverlay && (
      <div
        className="project-overlay"
        data-testid="project-overlay"
        ref={overlayRef}
        role="dialog"
        aria-label="Select a project"
      >
        <ul className="project-overlay__list" role="menu">
          {projects.map((project) => (
            <li key={project.projectId} role="none">
              <div
                data-testid="project-overlay-action"
                onClick={() => handleProjectSelect(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectSelect(project);
                  }
                }}
                role="menuitem"
                tabIndex={0}
                aria-label={`Select ${project.name} project`}
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  setProject: PropTypes.func.isRequired,
  showProjectOverlay: PropTypes.bool.isRequired,
  setShowProjectOverlay: PropTypes.func.isRequired,
};
