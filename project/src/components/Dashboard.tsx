import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle, Clock, AlertTriangle, BarChart2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state } = useTasks();
  const { tasks } = state;
  
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const todo = tasks.filter(task => task.status === 'todo').length;
    
    const overdue = tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      task.status !== 'completed'
    ).length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const byCategory = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      completed,
      inProgress,
      todo,
      overdue,
      completionRate,
      byCategory,
      byPriority,
    };
  }, [tasks]);
  
  if (tasks.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <BarChart2 className="mr-2 h-5 w-5 text-indigo-500" />
        Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 mr-3">
              <BarChart2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mr-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900 mr-3">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900 mr-3">
              <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tasks by Category</h3>
          <div className="space-y-2">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="flex items-center">
                <span className="text-xs capitalize text-gray-600 dark:text-gray-400 min-w-20">{category}</span>
                <div className="flex-1 mx-2">
                  <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${Math.round((count / stats.total) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tasks by Priority</h3>
          <div className="space-y-2">
            {Object.entries(stats.byPriority).map(([priority, count]) => {
              const colorClass = 
                priority === 'high' ? 'bg-rose-500' : 
                priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500';
                
              return (
                <div key={priority} className="flex items-center">
                  <span className="text-xs capitalize text-gray-600 dark:text-gray-400 min-w-20">{priority}</span>
                  <div className="flex-1 mx-2">
                    <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`${colorClass} h-2 rounded-full`} 
                        style={{ width: `${Math.round((count / stats.total) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;