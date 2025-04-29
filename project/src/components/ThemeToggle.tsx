import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useTasks();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {state.theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-700" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;