import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${projectName}: Todoist`;
    return () => {
      document.title = previousTitle;
    };
  }, [projectName]);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      {tasks.length === 0 ? (
        <div className="tasks__empty" role="status" aria-live="polite">
          <p>No tasks yet. Add one to get started!</p>
        </div>
      ) : (
        <ul className="tasks__list" aria-label={`Tasks in ${projectName}`}>
          {tasks.map((task) => (
            <li key={`${task.id}`}>
              <Checkbox id={task.id} taskDesc={task.task} />
              <span className="task-text">{task.task}</span>
            </li>
          ))}
        </ul>
      )}

      <AddTask />
    </div>
  );
};
