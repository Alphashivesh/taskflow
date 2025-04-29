import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, TaskFilter, TaskStatus, Priority, Category } from '../types';

interface TasksState {
  tasks: Task[];
  filters: TaskFilter;
  theme: 'light' | 'dark';
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<TaskFilter> }
  | { type: 'REORDER_TASKS'; payload: Task[] }
  | { type: 'TOGGLE_THEME' };

const initialState: TasksState = {
  tasks: [],
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
    searchText: '',
  },
  theme: 'light',
};

function tasksReducer(state: TasksState, action: TaskAction): TasksState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    default:
      return state;
  }
}

export const TaskContext = createContext<{
  state: TasksState;
  dispatch: React.Dispatch<TaskAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState, () => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTheme = localStorage.getItem('theme');
    
    return {
      ...initialState,
      tasks: savedTasks ? JSON.parse(savedTasks) : [],
      theme: (savedTheme as 'light' | 'dark') || 'light',
    };
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

export const getFilteredTasks = (tasks: Task[], filters: TaskFilter): Task[] => {
  return tasks.filter((task) => {
    // Filter by status
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }

    // Filter by priority
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }

    // Filter by category
    if (filters.category !== 'all' && task.category !== filters.category) {
      return false;
    }

    // Filter by search text
    if (
      filters.searchText &&
      !task.title.toLowerCase().includes(filters.searchText.toLowerCase()) &&
      !task.description.toLowerCase().includes(filters.searchText.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};