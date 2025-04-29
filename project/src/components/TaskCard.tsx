import React from 'react';
import { Task } from '../types';
import { useTasks } from '../context/TaskContext';
import { Edit, Trash, CheckCircle, Circle, Clock } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dates';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { dispatch } = useTasks();

  const priorityClasses = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    high: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  };

  const categoryClasses = {
    work: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    personal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    health: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    finance: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  const handleStatusToggle = () => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    const completedAt = newStatus === 'completed' ? new Date().toISOString() : null;
    
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, status: newStatus, completedAt },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div 
      className={`p-4 mb-3 rounded-lg shadow-sm border-l-4 
        ${task.status === 'completed' ? 'border-l-green-500 bg-gray-50 dark:bg-gray-800' : 
          isOverdue ? 'border-l-rose-500 bg-white dark:bg-gray-900' : 
            task.status === 'in-progress' ? 'border-l-amber-500 bg-white dark:bg-gray-900' : 
              'border-l-indigo-500 bg-white dark:bg-gray-900'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button 
            onClick={handleStatusToggle}
            className="mt-1 flex-shrink-0 focus:outline-none"
            aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div>
            <h3 
              className={`font-medium text-gray-900 dark:text-white ${
                task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}
            >
              {task.title}
            </h3>
            
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {task.description}
            </p>
            
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${priorityClasses[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              
              <span className={`text-xs px-2 py-1 rounded-full ${categoryClasses[task.category]}`}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>
              
              {task.dueDate && (
                <span 
                  className={`text-xs px-2 py-1 rounded-full flex items-center
                    ${isOverdue ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' : 
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(task.dueDate))}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(task)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4 text-gray-500" />
          </button>
          
          <button 
            onClick={handleDelete}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Delete task"
          >
            <Trash className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;