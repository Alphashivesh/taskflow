import React, { useState } from 'react';
import { useTasks, getFilteredTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { Task } from '../types';
import { ListFilter } from 'lucide-react';

const TaskList: React.FC = () => {
  const { state } = useTasks();
  const { tasks, filters } = state;
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const filteredTasks = getFilteredTasks(tasks, filters);
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };
  
  const closeTaskForm = () => {
    setEditingTask(undefined);
  };
  
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  
  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-10">
        <ListFilter className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {tasks.length === 0 
            ? "Get started by creating a new task" 
            : "Try adjusting your filters to see more tasks"}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* To Do Tasks */}
      {todoTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
            To Do ({todoTasks.length})
          </h2>
          <div>
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </div>
        </div>
      )}
      
      {/* In Progress Tasks */}
      {inProgressTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            In Progress ({inProgressTasks.length})
          </h2>
          <div>
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </div>
        </div>
      )}
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            Completed ({completedTasks.length})
          </h2>
          <div>
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </div>
        </div>
      )}
      
      {editingTask && (
        <TaskForm task={editingTask} onClose={closeTaskForm} />
      )}
    </div>
  );
};

export default TaskList;