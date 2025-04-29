export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'health' | 'finance' | 'other';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface TaskFilter {
  status: TaskStatus | 'all';
  priority: Priority | 'all';
  category: Category | 'all';
  searchText: string;
}