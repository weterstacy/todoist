import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { Projects } from '../Projects';
import { useSelectedProjectValue } from '../../context';
import { AddProject } from '../AddProject';

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  const handleNavigation = (key, projectId) => {
    setActive(key);
    setSelectedProject(projectId);
  };

  return (
    <aside className="sidebar" data-testid="sidebar" role="navigation" aria-label="Project navigation">
      <nav>
        <ul className="sidebar__generic" role="menu" aria-label="Quick access">
          <li
            data-testid="inbox"
            className={active === 'inbox' ? 'active' : undefined}
            role="none"
          >
            <div
              data-testid="inbox-action"
              aria-label="Show inbox tasks"
              aria-current={active === 'inbox' ? 'page' : undefined}
              tabIndex={0}
              role="menuitem"
              onClick={() => handleNavigation('inbox', 'INBOX')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigation('inbox', 'INBOX');
                }
              }}
            >
              <span aria-hidden="true">
                <FaInbox />
              </span>
              <span>Inbox</span>
            </div>
          </li>
          <li
            data-testid="today"
            className={active === 'today' ? 'active' : undefined}
            role="none"
          >
            <div
              data-testid="today-action"
              aria-label="Show today's tasks"
              aria-current={active === 'today' ? 'page' : undefined}
              tabIndex={0}
              role="menuitem"
              onClick={() => handleNavigation('today', 'TODAY')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigation('today', 'TODAY');
                }
              }}
            >
              <span aria-hidden="true">
                <FaRegCalendar />
              </span>
              <span>Today</span>
            </div>
          </li>
          <li
            data-testid="next_7"
            className={active === 'next_7' ? 'active' : undefined}
            role="none"
          >
            <div
              data-testid="next_7-action"
              aria-label="Show tasks for the next 7 days"
              aria-current={active === 'next_7' ? 'page' : undefined}
              tabIndex={0}
              role="menuitem"
              onClick={() => handleNavigation('next_7', 'NEXT_7')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigation('next_7', 'NEXT_7');
                }
              }}
            >
              <span aria-hidden="true">
                <FaRegCalendarAlt />
              </span>
              <span>Next 7 days</span>
            </div>
          </li>
        </ul>
        <div
          className="sidebar__middle"
          aria-label={showProjects ? 'Hide projects' : 'Show projects'}
          aria-expanded={showProjects}
          onClick={() => setShowProjects(!showProjects)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowProjects(!showProjects);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span aria-hidden="true">
            <FaChevronDown
              className={!showProjects ? 'hidden-projects' : undefined}
            />
          </span>
          <h2>Projects</h2>
        </div>

        <ul className="sidebar__projects" role="menu" aria-label="User projects">
          {showProjects && <Projects />}
        </ul>

        {showProjects && <AddProject />}
      </nav>
    </aside>
  );
};
