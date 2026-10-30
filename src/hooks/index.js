/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { format, differenceInDays, parseISO } from 'date-fns';
import { collection, query, where, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let q = query(
      collection(db, 'tasks'),
      where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
    );

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      q = query(q, where('projectId', '==', selectedProject));
    } else if (selectedProject === 'TODAY') {
      q = query(q, where('date', '==', format(new Date(), 'dd/MM/yyyy')));
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      q = query(q, where('date', '==', ''));
    }

    const unsubscribe = onSnapshot(q, snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(task => {
              if (!task.date || task.archived === true) return false;
              try {
                // Parse the date in DD-MM-YYYY format
                const [day, month, year] = task.date.split('-');
                const taskDate = new Date(year, month - 1, day);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return differenceInDays(taskDate, today) <= 7;
              } catch (e) {
                return false;
              }
            })
          : newTasks.filter(task => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'),
      orderBy('projectId')
    );

    getDocs(q).then(snapshot => {
      const allProjects = snapshot.docs.map(project => ({
        ...project.data(),
        docId: project.id,
      }));

      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    });
  }, [projects]);

  return { projects, setProjects };
};
