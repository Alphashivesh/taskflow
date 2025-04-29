import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './components/Dashboard';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ThemeToggle from './components/ThemeToggle';
import { PlusCircle, CheckSquare } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Task Flow</h1>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={openForm}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  New Task
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Dashboard />
          <TaskFilters />
          <TaskList />
          
          {isFormOpen && <TaskForm onClose={closeForm} />}
        </main>
        
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              TaskFlow © {new Date().getFullYear()} | Organize your tasks efficiently
            </p>
          </div>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;