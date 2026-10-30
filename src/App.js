import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          {/* Skip navigation link for keyboard users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* ARIA live region for announcements */}
          <div
            id="task-announcement"
            className="visually-hidden"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          />
          <div
            id="project-announcement"
            className="visually-hidden"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          />
          <div
            id="date-announcement"
            className="visually-hidden"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          />

          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
