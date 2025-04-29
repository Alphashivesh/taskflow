import React from 'react';
import { TaskFilter, TaskStatus, Priority, Category } from '../types';
import { useTasks } from '../context/TaskContext';
import { Search, Filter, X } from 'lucide-react';

const TaskFilters: React.FC = () => {
  const { state, dispatch } = useTasks();
  const { filters } = state;
  
  const handleFilterChange = (key: keyof TaskFilter, value: string) => {
    dispatch({
      type: 'SET_FILTER',
      payload: { [key]: value },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTER',
      payload: { searchText: e.target.value },
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        status: 'all',
        priority: 'all',
        category: 'all',
        searchText: '',
      },
    });
  };

  const isFiltering = 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    filters.category !== 'all' || 
    filters.searchText !== '';

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.searchText}
          onChange={handleSearchChange}
          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      {isFiltering && (
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filters applied</span>
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
          >
            <X className="h-4 w-4 mr-1" />
            <span>Clear filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;